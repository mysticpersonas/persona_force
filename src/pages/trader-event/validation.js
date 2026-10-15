// Shared RSVP validation. The form uses it for inline errors; the API runs the
// exact same rules again, because anything the browser checks can be bypassed.

import { APPEAL_OPTIONS, BRING_OPTIONS } from './eventConfig.js';

export const FIELD_LABELS = {
  firstName: 'First Name',
  lastName: 'Last Name',
  phone: 'Cell Phone Number',
  email: 'Email Address',
  appeal: 'What appeals to you most about this event?',
  appealOther: 'Tell us what appeals to you',
  bring: 'Would you like to bring someone?',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Keep only the 10 US digits. A leading country code 1 is dropped.
export function phoneDigits(value = '') {
  let d = String(value).replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  return d.slice(0, 10);
}

// "5555555555" -> "(555) 555-5555", built up as the person types.
export function formatPhone(value) {
  const d = phoneDigits(value);
  if (d.length === 0) return '';
  if (d.length < 4) return `(${d}`;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

const clean = (v, max) => String(v ?? '').trim().replace(/\s+/g, ' ').slice(0, max);

export function normalizeRsvp(input = {}) {
  return {
    firstName: clean(input.firstName, 60),
    lastName: clean(input.lastName, 60),
    phone: phoneDigits(input.phone),
    email: clean(input.email, 254).toLowerCase(),
    appeal: clean(input.appeal, 60),
    appealOther: clean(input.appealOther, 140),
    bring: clean(input.bring, 60),
    smsConsent: input.smsConsent === true,
  };
}

// Returns { fieldName: message } for every invalid field. Empty object = valid.
export function validateRsvp(data) {
  const errors = {};
  if (!data.firstName) errors.firstName = 'Please enter your first name.';
  if (!data.lastName) errors.lastName = 'Please enter your last name.';

  if (!data.phone) errors.phone = 'Please enter your cell phone number.';
  else if (data.phone.length !== 10 || !/^[2-9]\d{2}[2-9]/.test(data.phone)) {
    errors.phone = 'Please enter a valid 10-digit US number, like (555) 555-5555.';
  }

  if (!data.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email, like you@example.com.';

  if (!APPEAL_OPTIONS.includes(data.appeal)) errors.appeal = 'Please choose what appeals to you most.';
  else if (data.appeal === 'Other' && !data.appealOther) errors.appealOther = 'Please tell us a little more.';

  if (!BRING_OPTIONS.includes(data.bring)) errors.bring = 'Please let us know if you would like to bring someone.';
  return errors;
}
