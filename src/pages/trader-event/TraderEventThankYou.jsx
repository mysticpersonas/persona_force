import { useEffect, useState } from 'react';
import { Check, CalendarPlus, Download, Copy, Share2, CalendarDays, Clock, MapPin } from 'lucide-react';
import './tokens.css';
import styles from './TraderEvent.module.css';
import ty from './ThankYou.module.css';
import { HeroArt } from './HeroArt';
import { EVENT_TITLE, EVENT_URL, googleCalendarUrl, downloadIcs } from './calendar';

// Thank-you page for /trader/event/thank-you.
// GHL form setting: On submit > Redirect to URL > this page.

const SHARE_TEXT = 'Join me at The Wealth Blueprint on Sunday, October 18. Seats are limited to 25 guests.';

export default function TraderEventThankYou() {
  const [copied, setCopied] = useState(false);
  // Native share sheet exists on most phones; hide the button where it doesn't
  const [canShare] = useState(() => typeof navigator !== 'undefined' && typeof navigator.share === 'function');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EVENT_URL);
    } catch {
      // Older browsers: select the field so the guest can copy it themselves
      document.getElementById('te-share-url')?.select();
      document.execCommand?.('copy');
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const share = () => navigator.share({ title: EVENT_TITLE, text: SHARE_TEXT, url: EVENT_URL }).catch(() => {});

  return (
    <div data-page="trader-event" className={`${styles.page} ${ty.page}`}>
      <title>Your Seat Is Reserved | The Wealth Blueprint</title>
      {/* A thank-you page should never show up in search results */}
      <meta name="robots" content="noindex, nofollow" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" precedence="default" />

      <div className={ty.art} aria-hidden="true"><HeroArt /></div>

      <main className={ty.main}>
        <p className={ty.kicker}>The Wealth Blueprint</p>

        <section className={`${styles.formCard} ${ty.card}`} aria-labelledby="te-ty-title">
          <div className={styles.formHead}>
            <h1 id="te-ty-title" className={styles.formTitle}>Your Seat Is Reserved</h1>
          </div>

          <div className={ty.body}>
            <span className={`${styles.ring} ${styles.ringLg}`} aria-hidden="true"><Check size={30} strokeWidth={1.8} /></span>
            <p className={ty.lead}>Your seat is reserved. Check your email for event details and the venue address.</p>

            <ul className={ty.facts}>
              <li><CalendarDays size={18} aria-hidden="true" /> Sunday, October 18, 2026</li>
              <li><Clock size={18} aria-hidden="true" /> <span>Doors open 1:45 PM · Experience <span className={ty.nowrap}>2:00–4:00 PM</span></span></li>
              <li><MapPin size={18} aria-hidden="true" /> Venue address sent by email</li>
            </ul>

            <div className={ty.block}>
              <h2 className={ty.label}>Add to your calendar</h2>
              <div className={ty.btnRow}>
                <a className={ty.ghost} href={googleCalendarUrl()} target="_blank" rel="noopener">
                  <CalendarPlus size={18} aria-hidden="true" /> Google Calendar
                </a>
                <button type="button" className={ty.ghost} onClick={downloadIcs}>
                  <Download size={18} aria-hidden="true" /> Apple / Outlook (.ics)
                </button>
              </div>
            </div>

            <div className={ty.block}>
              <h2 className={ty.label}>Bringing someone?</h2>
              <p className={ty.note}>Share this link. Each guest registers separately to reserve their own seat.</p>
              <label htmlFor="te-share-url" className={styles.srOnly}>Event link</label>
              <input id="te-share-url" className={ty.shareInput} readOnly value={EVENT_URL} onFocus={(e) => e.target.select()} />
              <div className={ty.btnRow}>
                <button type="button" className={ty.ghost} onClick={copy}>
                  {copied ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
                  {copied ? 'Link copied' : 'Copy link'}
                </button>
                {canShare && (
                  <button type="button" className={ty.ghost} onClick={share}>
                    <Share2 size={18} aria-hidden="true" /> Share
                  </button>
                )}
              </div>
              <p className={styles.srOnly} aria-live="polite">{copied ? 'Link copied to clipboard' : ''}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Trading involves financial risk and does not guarantee income or additional free time.<br />This event is for educational and informational purposes only.</p>
      </footer>
    </div>
  );
}
