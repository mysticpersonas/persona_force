// Add to Calendar helpers. Guests add the full window (doors 1:00 PM to the
// 3:30 PM finish) so the reminder fires before doors open.
// Times are floating (no time zone): they show as 1:00 PM on the guest's own
// device, which is right for a local in-person event.

export const EVENT_TITLE = 'The Wealth Blueprint: Live Experience';
export const EVENT_URL = 'https://www.personaforce.co/trader/event';

const START = '20261018T130000';
const END = '20261018T153000';
const LOCATION = 'Address provided via email';
const DETAILS = 'A live, immersive experience hosted by Nicole Quinones with Dr. Travis Fox and Michelle Fox. The venue address will be sent to you by email.';

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_TITLE,
    dates: `${START}/${END}`,
    details: DETAILS,
    location: LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

// ICS text must escape commas, semicolons and backslashes.
const esc = (s) => s.replace(/[\\;,]/g, (m) => `\\${m}`);

export function downloadIcs() {
  const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PersonaForce//The Wealth Blueprint//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:wealth-blueprint-2026-10-18@personaforce.co',
    `DTSTAMP:${now}`,
    `DTSTART:${START}`,
    `DTEND:${END}`,
    `SUMMARY:${esc(EVENT_TITLE)}`,
    `DESCRIPTION:${esc(DETAILS)}`,
    `LOCATION:${esc(LOCATION)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(EVENT_TITLE)}`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wealth-blueprint-oct-18-2026.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
