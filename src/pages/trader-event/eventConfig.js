// Single source of truth for event facts. Imported by the page AND by
// /api/trader-rsvp, so the date, capacity and copy can never drift apart.
// Keep this file free of browser or Node specifics.

export const EVENT = {
  id: 'wealth-blueprint-2026-10-18',
  name: 'The Wealth Blueprint',
  title: 'The Wealth Blueprint: Live Experience',
  capacity: 25,
  // Local (floating) times. The venue time zone is not confirmed, so calendar
  // files use floating time, which shows as 1:00 PM on the guest's own device.
  doorsOpen: '2026-10-18T13:00:00',
  start: '2026-10-18T13:30:00',
  end: '2026-10-18T15:30:00',
  location: 'Address provided via email',
  path: '/trader/event',
  siteUrl: 'https://www.personaforce.co',
  tags: { base: 'wealth-blueprint-oct18', confirmed: 'confirmed', waitlist: 'waitlist', sms: 'sms-consent' },
};

export const APPEAL_OPTIONS = [
  'Learn about trading',
  'Explore technology',
  'Take back more of my time',
  'Connect with like-minded people',
  'Other',
];

export const BRING_OPTIONS = [
  'Yes, send me a shareable link',
  'Maybe',
  'No',
];

export const SMS_CONSENT_TEXT = 'Text me event reminders. Msg & data rates may apply. Reply STOP to opt out.';
