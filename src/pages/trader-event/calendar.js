// Add to Calendar helpers. Guests add the full window (doors 1:00 PM to the
// 3:30 PM finish) so the reminder fires before doors open.

import { EVENT } from './eventConfig.js';

const DETAILS = 'A live, immersive experience hosted by Nicole Quinones with Dr. Travis Fox and Michelle Fox. The venue address will be sent to you by email.';

// "2026-10-18T13:00:00" -> "20261018T130000" (floating local time)
const stamp = (iso) => iso.replace(/[-:]/g, '');

export function googleCalendarUrl() {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT.title,
    dates: `${stamp(EVENT.doorsOpen)}/${stamp(EVENT.end)}`,
    details: DETAILS,
    location: EVENT.location,
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
    `UID:${EVENT.id}@personaforce.co`,
    `DTSTAMP:${now}`,
    `DTSTART:${stamp(EVENT.doorsOpen)}`,
    `DTEND:${stamp(EVENT.end)}`,
    `SUMMARY:${esc(EVENT.title)}`,
    `DESCRIPTION:${esc(DETAILS)}`,
    `LOCATION:${esc(EVENT.location)}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT2H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${esc(EVENT.title)}`,
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
