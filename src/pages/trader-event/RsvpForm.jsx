import { useEffect, useRef, useState } from 'react';
import { ChevronRight, ChevronDown, Lock, LoaderCircle, CircleAlert, CalendarPlus, Download, Copy, Share2, Check } from 'lucide-react';
import styles from './TraderEvent.module.css';
import { APPEAL_OPTIONS, BRING_OPTIONS, EVENT, SMS_CONSENT_TEXT } from './eventConfig';
import { FIELD_LABELS, formatPhone, normalizeRsvp, validateRsvp } from './validation';
import { googleCalendarUrl, downloadIcs } from './calendar';

const EMPTY = { firstName: '', lastName: '', phone: '', email: '', appeal: '', appealOther: '', bring: '', smsConsent: false, website: '' };
const ORDER = ['firstName', 'lastName', 'phone', 'email', 'appeal', 'appealOther', 'bring'];
const id = (name) => `te-${name}`;

function readUtm() {
  const p = new URLSearchParams(window.location.search);
  return { utm_source: p.get('utm_source') || '', utm_medium: p.get('utm_medium') || '', utm_campaign: p.get('utm_campaign') || '' };
}

export default function RsvpForm({ onDone }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [phase, setPhase] = useState('idle'); // idle | submitting | failed | confirmed | waitlist
  const [failMessage, setFailMessage] = useState('');
  const summaryRef = useRef(null);
  const resultRef = useRef(null);
  const utm = useRef(null);

  useEffect(() => { utm.current = readUtm(); }, []);

  useEffect(() => {
    if (phase === 'confirmed' || phase === 'waitlist') resultRef.current?.focus();
  }, [phase]);

  const set = (name, value) => {
    const next = { ...values, [name]: name === 'phone' ? formatPhone(value) : value };
    setValues(next);
    // Once a field has been visited, re-check it live so the error clears as
    // soon as it is fixed.
    if (touched[name] || showSummary) setErrors(validateRsvp(normalizeRsvp(next)));
  };

  const blur = (name) => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateRsvp(normalizeRsvp(values)));
  };

  const visibleError = (name) => (touched[name] || showSummary ? errors[name] : undefined);

  const focusField = (name) => document.getElementById(id(name))?.focus();

  async function submit(e) {
    e.preventDefault();
    if (phase === 'submitting') return;

    const data = normalizeRsvp(values);
    const found = validateRsvp(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setShowSummary(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    setPhase('submitting');
    setFailMessage('');
    try {
      const res = await fetch('/api/trader-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, website: values.website, utm: utm.current, pageUrl: window.location.href }),
      });
      const json = await res.json().catch(() => ({}));

      // Success is shown ONLY for a real 2xx with a known status.
      if (res.ok && (json.status === 'confirmed' || json.status === 'waitlist')) {
        setPhase(json.status);
        onDone?.();
        return;
      }
      if (res.status === 422 && json.fields) {
        setErrors(json.fields);
        setShowSummary(true);
        setPhase('idle');
        requestAnimationFrame(() => summaryRef.current?.focus());
        return;
      }
      throw new Error(json.error || 'Request failed');
    } catch (err) {
      setFailMessage(err?.message && err.message !== 'Failed to fetch' && err.message !== 'Request failed'
        ? err.message
        : 'We could not reach our registration system. Please check your connection and press Reserve My Seat again.');
      setPhase('failed');
    }
  }

  if (phase === 'confirmed' || phase === 'waitlist') {
    return <Result ref={resultRef} phase={phase} wantsShare={values.bring === BRING_OPTIONS[0]} firstName={normalizeRsvp(values).firstName} />;
  }

  const errorList = ORDER.filter((k) => errors[k]);
  const submitting = phase === 'submitting';

  return (
    <div className={styles.formCard}>
      <div className={styles.formHead}>
        <h2 className={styles.formTitle}>Reserve Your Complimentary Seat</h2>
      </div>
      <p className={styles.formIntro}>Tell us a little about yourself, and we'll send you the event details.</p>

      <form className={styles.form} onSubmit={submit} noValidate aria-describedby="te-required-note">
        <p id="te-required-note" className={styles.srOnly}>Fields marked with an asterisk are required.</p>

        {showSummary && errorList.length > 0 && (
          <div className={styles.errorSummary} ref={summaryRef} tabIndex={-1} role="alert" aria-labelledby="te-error-summary-title">
            <p id="te-error-summary-title"><CircleAlert size={18} aria-hidden="true" /> Please fix {errorList.length === 1 ? 'this field' : `these ${errorList.length} fields`}:</p>
            <ul>
              {errorList.map((k) => (
                <li key={k}><a href={`#${id(k)}`} onClick={(e) => { e.preventDefault(); focusField(k); }}>{FIELD_LABELS[k]}</a></li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.row2}>
          <Field name="firstName" error={visibleError('firstName')}>
            <input id={id('firstName')} type="text" autoComplete="given-name" placeholder="First name" maxLength={60}
              value={values.firstName} onChange={(e) => set('firstName', e.target.value)} onBlur={() => blur('firstName')}
              {...ariaFor('firstName', visibleError('firstName'))} />
          </Field>
          <Field name="lastName" error={visibleError('lastName')}>
            <input id={id('lastName')} type="text" autoComplete="family-name" placeholder="Last name" maxLength={60}
              value={values.lastName} onChange={(e) => set('lastName', e.target.value)} onBlur={() => blur('lastName')}
              {...ariaFor('lastName', visibleError('lastName'))} />
          </Field>
        </div>

        <Field name="phone" error={visibleError('phone')}>
          <input id={id('phone')} type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(555) 555-5555" maxLength={16}
            value={values.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')}
            {...ariaFor('phone', visibleError('phone'))} />
        </Field>

        <Field name="email" error={visibleError('email')}>
          <input id={id('email')} type="email" inputMode="email" autoComplete="email" placeholder="you@example.com" maxLength={254}
            spellCheck={false} autoCapitalize="off"
            value={values.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')}
            {...ariaFor('email', visibleError('email'))} />
        </Field>

        <Field name="appeal" error={visibleError('appeal')}>
          <Select id={id('appeal')} value={values.appeal} options={APPEAL_OPTIONS}
            onChange={(v) => set('appeal', v)} onBlur={() => blur('appeal')} {...ariaFor('appeal', visibleError('appeal'))} />
        </Field>

        {values.appeal === 'Other' && (
          <Field name="appealOther" error={visibleError('appealOther')}>
            <input id={id('appealOther')} type="text" placeholder="A few words is perfect" maxLength={140}
              value={values.appealOther} onChange={(e) => set('appealOther', e.target.value)} onBlur={() => blur('appealOther')}
              {...ariaFor('appealOther', visibleError('appealOther'))} />
          </Field>
        )}

        <Field name="bring" error={visibleError('bring')}>
          <Select id={id('bring')} value={values.bring} options={BRING_OPTIONS}
            onChange={(v) => set('bring', v)} onBlur={() => blur('bring')} {...ariaFor('bring', visibleError('bring'))} />
        </Field>

        {/* Optional and UNCHECKED by default. SMS consent must be an active choice. */}
        <div className={styles.check}>
          <input id={id('smsConsent')} type="checkbox" checked={values.smsConsent}
            onChange={(e) => set('smsConsent', e.target.checked)} />
          <label htmlFor={id('smsConsent')}>
            {SMS_CONSENT_TEXT}{' '}
            {/* TODO: confirm /privacy and /terms include SMS program terms (frequency, STOP/HELP, carrier disclaimer) before launch. */}
            <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> and{' '}
            <a href="/terms" target="_blank" rel="noopener">Terms</a>.
          </label>
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={id('website')}>Website</label>
          <input id={id('website')} name="website" type="text" tabIndex={-1} autoComplete="off"
            value={values.website} onChange={(e) => set('website', e.target.value)} />
        </div>

        {phase === 'failed' && (
          <div className={styles.failBox} role="alert">
            <CircleAlert size={18} aria-hidden="true" />
            <p><strong>Your seat is not reserved yet.</strong> {failMessage}</p>
          </div>
        )}

        <button type="submit" className={`${styles.goldButton} ${styles.submit}`} disabled={submitting} aria-busy={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className={styles.spin} size={20} aria-hidden="true" />
              <span>Reserving…</span>
            </>
          ) : (
            <>
              <span>Reserve My Seat</span>
              <ChevronRight size={22} strokeWidth={2.5} aria-hidden="true" />
            </>
          )}
        </button>

        {/* TODO: only keep this line if it is true under our privacy policy. */}
        <p className={styles.privacy}>
          <Lock size={14} aria-hidden="true" />
          <span>Your information is kept private and used only for event details.</span>
        </p>
      </form>
    </div>
  );
}

function ariaFor(name, error) {
  return {
    name,
    required: name !== 'appealOther' ? true : undefined,
    'aria-required': true,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id(name)}-error` : undefined,
  };
}

function Field({ name, error, children }) {
  return (
    <div className={`${styles.field} ${error ? styles.fieldInvalid : ''}`}>
      <label htmlFor={id(name)} className={styles.label}>
        {FIELD_LABELS[name]} <span className={styles.req} aria-hidden="true">*</span>
      </label>
      {children}
      {error && (
        <p id={`${id(name)}-error`} className={styles.fieldError}>
          <CircleAlert size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

function Select({ id: selectId, value, options, onChange, onBlur, ...aria }) {
  return (
    <div className={styles.selectWrap}>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)} onBlur={onBlur}
        className={value ? '' : styles.selectEmpty} {...aria}>
        <option value="" disabled>Select an option</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={18} className={styles.selectIcon} aria-hidden="true" />
    </div>
  );
}

function Result({ ref, phase, wantsShare, firstName }) {
  const confirmed = phase === 'confirmed';
  return (
    <div className={styles.formCard} role="status">
      <div className={styles.formHead}>
        <h2 className={styles.formTitle} ref={ref} tabIndex={-1}>
          {confirmed ? 'Your Seat Is Reserved' : "You're on the Waitlist"}
        </h2>
      </div>
      <div className={styles.resultBody}>
        <span className={`${styles.ring} ${styles.ringLg}`} aria-hidden="true"><Check size={30} strokeWidth={1.8} /></span>
        {confirmed ? (
          <p className={styles.resultLead}>
            {firstName ? `Thank you, ${firstName}. ` : ''}Your seat is reserved. Check your email for event details and the venue address.
          </p>
        ) : (
          <p className={styles.resultLead}>You're on the waitlist. We'll contact you if a seat opens.</p>
        )}

        {confirmed && (
          <div className={styles.resultActions}>
            <p className={styles.resultLabel}>Add to your calendar</p>
            <div className={styles.btnRow}>
              <a className={styles.ghostButton} href={googleCalendarUrl()} target="_blank" rel="noopener">
                <CalendarPlus size={18} aria-hidden="true" /> Google Calendar
              </a>
              <button type="button" className={styles.ghostButton} onClick={downloadIcs}>
                <Download size={18} aria-hidden="true" /> Apple / Outlook (.ics)
              </button>
            </div>
          </div>
        )}

        {confirmed && wantsShare && <ShareLink />}
      </div>
    </div>
  );
}

function ShareLink() {
  const url = `${window.location.origin}${EVENT.path}`;
  const [copied, setCopied] = useState(false);
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.getElementById('te-share-url');
      input?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const share = () => navigator.share({ title: EVENT.title, text: 'Join me at The Wealth Blueprint on Sunday, October 18. Seats are limited to 25 guests.', url }).catch(() => {});

  return (
    <div className={styles.resultActions}>
      <p className={styles.resultLabel}>Invite someone. Each guest registers separately.</p>
      <label htmlFor="te-share-url" className={styles.srOnly}>Shareable event link</label>
      <input id="te-share-url" className={styles.shareInput} readOnly value={url} onFocus={(e) => e.target.select()} />
      <div className={styles.btnRow}>
        <button type="button" className={styles.ghostButton} onClick={copy}>
          {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          {copied ? 'Link copied' : 'Copy link'}
        </button>
        {canShare && (
          <button type="button" className={styles.ghostButton} onClick={share}>
            <Share2 size={18} aria-hidden="true" /> Share
          </button>
        )}
      </div>
      <p className={styles.srOnly} aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</p>
    </div>
  );
}
