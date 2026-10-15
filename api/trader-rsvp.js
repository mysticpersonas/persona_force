// POST /api/trader-rsvp
//
// 1. Validate the RSVP again on the server (never trust the browser).
// 2. Silently drop honeypot hits.
// 3. Claim a seat atomically in Upstash Redis (Vercel KV). One Lua script does
//    "already registered? / seats left? / reserve" in a single step, so two
//    people hitting submit at the same moment can never both get seat 25.
// 4. Forward the contact to the GoHighLevel inbound webhook. If GHL fails, the
//    seat is released and the guest sees a retry message, never a fake success.
//
// Env: GHL_RSVP_WEBHOOK_URL, KV_REST_API_URL, KV_REST_API_TOKEN

import { BRING_OPTIONS, EVENT, SMS_CONSENT_TEXT } from '../src/pages/trader-event/eventConfig.js';
import { normalizeRsvp, validateRsvp } from '../src/pages/trader-event/validation.js';

const COUNT_KEY = EVENT.id; // "wealth-blueprint-2026-10-18"
const GUESTS_KEY = `${EVENT.id}:guests`; // hash: email -> confirmed | waitlist
const RATE_LIMIT = { max: 8, windowSeconds: 600 };

// Returns { status, duplicate }. KEYS[1] = counter, KEYS[2] = guest hash.
const CLAIM_SEAT = `
local prev = redis.call('HGET', KEYS[2], ARGV[2])
if prev then return {prev, 1} end
local taken = tonumber(redis.call('GET', KEYS[1]) or '0')
local status = 'waitlist'
if taken < tonumber(ARGV[1]) then
  redis.call('INCR', KEYS[1])
  status = 'confirmed'
end
redis.call('HSET', KEYS[2], ARGV[2], status)
return {status, 0}
`;

// Undo a claim made by this request (used when GHL is unreachable).
const RELEASE_SEAT = `
local prev = redis.call('HGET', KEYS[2], ARGV[1])
if not prev then return 0 end
redis.call('HDEL', KEYS[2], ARGV[1])
if prev == 'confirmed' then redis.call('DECR', KEYS[1]) end
return 1
`;

const RATE = `
local n = redis.call('INCR', KEYS[1])
if n == 1 then redis.call('EXPIRE', KEYS[1], ARGV[1]) end
return n
`;

async function redis(command) {
  const res = await fetch(process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(command),
    signal: AbortSignal.timeout(5000),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(`redis: ${json.error || res.status}`);
  return json.result;
}

const clip = (v, max = 120) => String(v ?? '').slice(0, max);

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  return (Array.isArray(fwd) ? fwd[0] : fwd || '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { GHL_RSVP_WEBHOOK_URL, KV_REST_API_URL, KV_REST_API_TOKEN } = process.env;
  if (!GHL_RSVP_WEBHOOK_URL || !KV_REST_API_URL || !KV_REST_API_TOKEN) {
    console.error('trader-rsvp: missing env vars');
    return res.status(503).json({ error: 'Registration is temporarily unavailable. Please try again shortly.' });
  }

  const body = typeof req.body === 'string' ? safeJson(req.body) : req.body || {};

  // Honeypot: real people never see this field. Answer like a success so bots
  // learn nothing, but do not store or forward anything.
  if (body.website) return res.status(200).json({ status: 'confirmed' });

  const data = normalizeRsvp(body);
  const errors = validateRsvp(data);
  if (Object.keys(errors).length) return res.status(422).json({ error: 'Please check the highlighted fields.', fields: errors });

  const ip = clientIp(req);
  try {
    const hits = await redis(['EVAL', RATE, '1', `${EVENT.id}:rl:${ip}`, String(RATE_LIMIT.windowSeconds)]);
    if (hits > RATE_LIMIT.max) return res.status(429).json({ error: 'Too many attempts. Please wait a few minutes and try again.' });
  } catch (err) {
    console.error('trader-rsvp: rate limit check failed', err);
    // Fail open on the limiter only; the seat claim below still has to succeed.
  }

  let claim;
  try {
    const [status, duplicate] = await redis(['EVAL', CLAIM_SEAT, '2', COUNT_KEY, GUESTS_KEY, String(EVENT.capacity), data.email]);
    claim = { status, duplicate: duplicate === 1 };
  } catch (err) {
    console.error('trader-rsvp: seat claim failed', err);
    return res.status(502).json({ error: 'We could not reserve your seat just now. Please try again.' });
  }

  const tags = [EVENT.tags.base, claim.status === 'confirmed' ? EVENT.tags.confirmed : EVENT.tags.waitlist];
  if (data.smsConsent) tags.push(EVENT.tags.sms);

  const utm = body.utm && typeof body.utm === 'object' ? body.utm : {};
  const payload = {
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: `+1${data.phone}`,
    tags,
    tags_csv: tags.join(','),
    rsvp_status: claim.status,
    event_id: EVENT.id,
    event_name: EVENT.title,
    event_date: EVENT.doorsOpen.slice(0, 10),
    appeal: data.appeal,
    appeal_other: data.appeal === 'Other' ? data.appealOther : '',
    bring_guest: data.bring,
    wants_share_link: data.bring === BRING_OPTIONS[0],
    sms_consent: data.smsConsent,
    // Consent evidence for SMS compliance: exact wording, time and source.
    sms_consent_text: data.smsConsent ? SMS_CONSENT_TEXT : '',
    sms_consent_at: data.smsConsent ? new Date().toISOString() : '',
    sms_consent_ip: data.smsConsent ? ip : '',
    utm_source: clip(utm.utm_source),
    utm_medium: clip(utm.utm_medium),
    utm_campaign: clip(utm.utm_campaign),
    page_url: clip(body.pageUrl, 300),
    submitted_at: new Date().toISOString(),
    resubmission: claim.duplicate,
  };

  try {
    const ghl = await fetch(GHL_RSVP_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!ghl.ok) throw new Error(`ghl ${ghl.status}`);
  } catch (err) {
    console.error('trader-rsvp: GHL forward failed', err);
    // Only release a seat this request created. A resubmission keeps the
    // original reservation.
    if (!claim.duplicate) {
      await redis(['EVAL', RELEASE_SEAT, '2', COUNT_KEY, GUESTS_KEY, data.email]).catch((e) => console.error('trader-rsvp: release failed', e));
    }
    return res.status(502).json({ error: 'We could not complete your registration. Please try again.' });
  }

  return res.status(200).json({ status: claim.status });
}

function safeJson(text) {
  try { return JSON.parse(text); } catch { return {}; }
}
