import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Clock, MapPin, Users, Wine, ChartColumnIncreasing, UsersRound, Gift, ChevronRight } from 'lucide-react';
import './tokens.css';
import styles from './TraderEvent.module.css';
import { HeroArt, CardMountains } from './HeroArt';
import RsvpForm from './RsvpForm';
import { useInView, useReveal, prefersReducedMotion } from './hooks';

const SPEAKERS = [
  {
    slug: 'nicole',
    name: 'Nicole Quinones',
    role: 'Trading Educator',
    desc: 'Show you how to take back your time through trading.',
  },
  {
    slug: 'travis',
    name: 'Dr. Travis Fox',
    role: 'Human Identity Architect',
    desc: 'Help you align your identity, mindset, and opportunities for a greater future.',
  },
  {
    slug: 'michelle',
    name: 'Michelle Fox',
    role: 'Human Identity Somatic Expert',
    desc: 'Guide you to create lasting change from the inside out.',
  },
];

const INFO = [
  { icon: CalendarDays, label: 'Sunday', value: 'October 18, 2026' },
  { icon: Clock, label: 'Doors Open', value: '1:00 PM', note: 'Experience: 1:30–3:30 PM' },
  { icon: MapPin, label: 'Exclusive Venue', note: 'Address provided after registration' },
  { icon: Users, label: 'Limited Seating', value: '25 Guest Seats' },
];

const EXPECT = [
  { icon: Wine, title: 'A Warm Welcome', text: 'Enjoy a complimentary glass of wine on us (21+).' },
  { icon: ChartColumnIncreasing, title: 'Real Knowledge', text: 'Discover how trading and technology can open new possibilities.' },
  { icon: UsersRound, title: 'Inspiring Perspective', text: 'Gain insights from experienced educators and identity experts.' },
  { icon: Gift, title: 'A Special Surprise', text: "One guest will receive an additional gift. We'll reveal the details at the event!" },
];

const WIDTHS = [240, 360, 480, 720];
const srcset = (slug, ext) => WIDTHS.map((w) => `/trader/${slug}-${w}.${ext} ${w}w`).join(', ');
// Desktop: a third of the 1200px container. Mobile: a third of the viewport.
const SIZES = '(min-width: 1024px) 380px, (min-width: 768px) 31vw, 31vw';

function Portrait({ slug, name }) {
  return (
    <figure className={`${styles.portrait} ${styles[`portrait_${slug}`]}`}>
      <picture>
        <source type="image/avif" srcSet={srcset(slug, 'avif')} sizes={SIZES} />
        <source type="image/webp" srcSet={srcset(slug, 'webp')} sizes={SIZES} />
        <img
          src={`/trader/${slug}-480.png`}
          srcSet={srcset(slug, 'png')}
          sizes={SIZES}
          width="720"
          height="900"
          alt={`Portrait of ${name}`}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </figure>
  );
}

// Head tags for in-app navigation. The standalone HTML entry
// (trader-event.html) already ships these statically for crawlers, so it
// renders with standalone=true and skips them to avoid duplicates.
function HeadTags() {
  return (
    <>
      <title>The Wealth Blueprint: Live Experience | Oct 18, 2026</title>
      <meta name="description" content="A live, immersive experience hosted by Nicole Quinones with Dr. Travis Fox and Michelle Fox. Sunday, October 18, 2026. Limited to 25 guests. Reserve your complimentary seat." />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Montserrat:wght@400;500;600;700&display=swap" precedence="default" />
    </>
  );
}

export default function TraderEvent({ standalone = false }) {
  const formRef = useRef(null);
  const formInView = useInView(formRef, { threshold: 0.15 });
  const [done, setDone] = useState(false);
  useReveal(styles.reveal, styles.revealed);

  useEffect(() => {
    if (!standalone) window.scrollTo(0, 0);
  }, [standalone]);

  const goToForm = () => {
    formRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
    // Move focus to the first field so keyboard and screen reader users land
    // where the button sent them.
    formRef.current?.querySelector('input:not([type=hidden]):not([tabindex="-1"])')?.focus({ preventScroll: true });
  };

  return (
    <div data-page="trader-event" className={styles.page}>
      {!standalone && <HeadTags />}
      <a href="#reserve" className={styles.skip}>Skip to registration</a>

      <header className={styles.hero}>
        <HeroArt />
        <div className={styles.heroInner}>
          <div className={styles.speakers}>
            {SPEAKERS.map((s, i) => (
              <div key={s.slug} className={`${styles.speakerHead} ${styles[`col_${i}`]}`}>
                <p className={styles.speakerName}>{s.name}</p>
                <p className={styles.speakerRole}>{s.role}</p>
                <p className={styles.speakerDesc}>{s.desc}</p>
              </div>
            ))}
            <span className={`${styles.divider} ${styles.divider_a}`} aria-hidden="true" />
            <span className={`${styles.divider} ${styles.divider_b}`} aria-hidden="true" />
            {SPEAKERS.map((s, i) => (
              <div key={s.slug} className={`${styles.portraitCell} ${styles[`col_${i}`]}`}>
                <Portrait slug={s.slug} name={s.name} />
              </div>
            ))}
          </div>

          {/* Mobile only: descriptions move out from under the narrow columns */}
          <ul className={styles.speakerList}>
            {SPEAKERS.map((s) => (
              <li key={s.slug}>
                <span className={styles.speakerListName}>{s.name}</span> {s.desc}
              </li>
            ))}
          </ul>

          <div className={styles.titleBlock}>
            <h1 className={styles.title}>
              <span className={styles.titleThe}>The</span>
              <span className={styles.titleMain}>
                <span>Wealth</span> <span>Blueprint</span>
              </span>
            </h1>
            <div className={styles.streak} aria-hidden="true" />
            <p className={styles.tagline}>
              <span className={styles.taglineIvory}>Stop trading your time.</span>
              <span className={styles.taglineGold}>Start exploring what's possible.</span>
            </p>
            <p className={styles.hosted}>
              <span>A live, immersive experience hosted by Nicole Quinones</span>
            </p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.info} aria-label="Event details">
          <ul className={styles.infoList}>
            {INFO.map(({ icon: Icon, label, value, note }) => (
              <li key={label} className={styles.infoItem}>
                <span className={styles.ring} aria-hidden="true"><Icon size={24} strokeWidth={1.6} /></span>
                <span className={styles.infoText}>
                  <span className={styles.infoLabel}>{label}</span>
                  {value && <span className={styles.infoValue}>{value}</span>}
                  {note && <span className={styles.infoNote}>{note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.split}>
          <div className={styles.leftCol}>
            <section aria-labelledby="te-expect" className={styles.reveal}>
              <h2 id="te-expect" className={styles.expectTitle}>What to Expect</h2>
              <ul className={styles.expectList}>
                {EXPECT.map(({ icon: Icon, title, text }) => (
                  <li key={title} className={styles.expectItem}>
                    <span className={`${styles.ring} ${styles.ringLg}`} aria-hidden="true"><Icon size={30} strokeWidth={1.5} /></span>
                    <span>
                      <span className={styles.expectItemTitle}>{title}</span>
                      <span className={styles.expectItemText}>{text}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <aside className={`${styles.urgency} ${styles.reveal}`} aria-labelledby="te-urgency">
              <CardMountains />
              <div className={styles.urgencyBody}>
                <h2 id="te-urgency" className={styles.urgencyTitle}>Don't Miss This Opportunity</h2>
                <p>Seats are limited to just 25 guests. This is more than a presentation. It's an immersive experience designed to help you see what's possible.</p>
              </div>
            </aside>
          </div>

          <div className={styles.formCol} id="reserve" ref={formRef}>
            <RsvpForm onDone={() => setDone(true)} />
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Trading involves financial risk and does not guarantee income or additional free time.<br />This event is for educational and informational purposes only.</p>
      </footer>

      <div className={`${styles.stickyCta} ${formInView || done ? styles.stickyHidden : ''}`} aria-hidden={formInView || done}>
        <button type="button" className={styles.goldButton} onClick={goToForm} tabIndex={formInView || done ? -1 : 0}>
          <span>Reserve My Seat</span>
          <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
