import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MailCheck, ListChecks, CalendarClock, Award, Sparkles } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import FadeUp from '../components/FadeUp';
import TjHeader from '../components/TjHeader';
import TjFooter from '../components/TjFooter';

// What Happens Next.
// Sequence updated: registration no longer unlocks Day 1 immediately. Reminder
// emails run up to the event, and each day's reflection is sent after that
// day's session, not before it.
const NEXT_STEPS = [
  { icon: MailCheck, title: 'Watch for your reminder emails', desc: 'We’ll be in touch in the run-up to the event so you know exactly when to show up.' },
  { icon: CalendarClock, title: 'Join each daily session', desc: 'Five sessions across five days. Come as you are, not as the trader you think you should be.' },
  { icon: ListChecks, title: 'Your reflection arrives after each session', desc: 'Each day’s reflection is sent once that session wraps. A few honest minutes is all it takes.' },
  { icon: Sparkles, title: 'Watch for the Live Reveal invitation', desc: 'It arrives after you complete the challenge.' },
  // NOTE: changed from "you may be selected" to an earned guarantee, per client
  // feedback. She raised it as a question to Travis and had not had an answer at
  // the time of writing — if he confirms it is still selective, revert to:
  // 'You may be selected for a complimentary Map' / 'Selected participants are
  // considered for a private Trader’s Journey Map.'
  { icon: Award, title: 'Complete all five reflections, get your Map', desc: 'Finish every daily reflection and your private Trader’s Journey Map is yours.', wide: true },
];

const TraderThankYou = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0b0f14] text-white font-tj-body overflow-x-hidden selection:bg-[#00e676]/30 selection:text-white antialiased">

      {/* AMBIENT DEPTH — same as the Trader page */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(0,230,118,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,230,118,0.045)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <div className="absolute top-[12%] -left-40 w-[420px] h-[420px] rounded-full bg-[#00e676]/[0.05] blur-[120px]" />
        <div className="absolute top-[55%] -right-40 w-[460px] h-[460px] rounded-full bg-[#7b2cff]/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10">

        <TjHeader />


        {/* ======================= CONFIRMATION HERO ======================= */}
        <section className="relative overflow-hidden">
          <ParticleField className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,transparent_0%,#0b0f14_78%)]" />

          <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-20 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-[#00e676]/[0.12] border border-[#00e676]/[0.3] text-[#00e676] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-7">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00e676] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Registration Confirmed
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <h1 className="text-[clamp(40px,9vw,84px)] font-tj-display font-black uppercase leading-[1.02] tracking-[0.02em]">
                You&rsquo;re{' '}
                <span className="bg-gradient-to-r from-[#00e676] to-[#7b2cff] bg-clip-text text-transparent">In.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={200}>
              <p className="text-[16px] md:text-[19px] text-[#c3cad6] mt-6 leading-[1.6] max-w-[560px] mx-auto">
                Welcome to <span className="text-white font-semibold">The Trader’s Journey Founder Pilot.</span>
              </p>
            </FadeUp>

            <FadeUp delay={280}>
              <p className="text-[14px] md:text-[15px] text-[#8a93a3] mt-4 leading-[1.7] max-w-[560px] mx-auto">
                You have successfully registered for the private 5-Day Trader Identity
                Challenge™. This is not a trading strategy course, it is an identity-performance
                experience designed to help you discover the person behind your trading decisions.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* ==================== THE OPENING QUESTION ==================== */}
        <section className="px-5 md:px-8 pb-16 md:pb-24">
          <FadeUp>
            <div className="relative max-w-[720px] mx-auto rounded-2xl p-8 md:p-12 text-center bg-gradient-to-b from-[#11151d] to-[#0b0f14] border border-white/[0.07] shadow-[0_0_60px_rgba(123,44,255,0.1)] overflow-hidden">
              <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 text-[160px] md:text-[220px] leading-none font-tj-display font-black uppercase text-white/[0.025] select-none">&ldquo;</div>
              <div className="relative">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#00e676] mb-5">Something to sit with</div>
                <h2 className="text-[clamp(22px,4vw,34px)] font-tj-display font-black uppercase tracking-[0.02em] leading-[1.2]">
                  Who has been{' '}
                  <span className="bg-gradient-to-r from-[#00e676] to-[#7b2cff] bg-clip-text text-transparent">placing my trades?</span>
                </h2>
                <p className="text-[14px] md:text-[15px] text-[#8a93a3] mt-5 leading-[1.7] max-w-[520px] mx-auto">
                  Not the strategy. Not the setup. Not the market. Who is the version of you that
                  shows up when money, pressure, fear, greed, uncertainty, and opportunity collide?
                </p>
                <p className="mt-6 text-[13px] tracking-[0.14em] uppercase font-bold bg-gradient-to-r from-[#00e676] to-[#7b2cff] bg-clip-text text-transparent">
                  That is the trader we are here to reveal.
                </p>
              </div>
            </div>
          </FadeUp>
        </section>

        {/* ==================== WHAT HAPPENS NEXT ==================== */}
        <section className="px-5 md:px-8 pb-20 md:pb-28 border-t border-white/[0.05] pt-16 md:pt-24">
          <div className="max-w-[860px] mx-auto">
            <FadeUp>
              <div className="text-center mb-12 md:mb-14">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#00e676] mb-3">What Happens Next</div>
                <h2 className="text-[clamp(24px,4vw,38px)] font-tj-display font-black uppercase tracking-[0.02em]">Your next few days</h2>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 gap-4">
              {NEXT_STEPS.map((s, i) => (
                // Five steps in a two-column grid, so the last one spans the row
                // rather than sitting orphaned beside a gap.
                <FadeUp key={s.title} delay={i * 90} className={s.wide ? 'sm:col-span-2' : ''}>
                  <div className="flex items-start gap-4 h-full rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 hover:border-[#00e676]/30 transition-colors">
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-[#00e676]/[0.12] border border-[#00e676]/[0.35] flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-[#00e676]" />
                    </span>
                    <div>
                      <h3 className="text-[15px] md:text-[16px] font-bold text-white leading-snug mb-1.5">{s.title}</h3>
                      <p className="text-[13px] text-[#8a93a3] leading-[1.6]">{s.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* Deliverability note. Given every reminder and every daily reflection
                now arrives by email, this is load-bearing, so it gets the green
                accent and a bolded instruction rather than sitting as grey fine print. */}
            <FadeUp delay={120}>
              <div className="flex items-start gap-3.5 mt-8 rounded-xl bg-[#00e676]/[0.06] border border-[#00e676]/[0.28] px-5 py-4 text-left">
                <MailCheck className="w-[18px] h-[18px] text-[#00e676] shrink-0 mt-0.5" />
                <p className="text-[13px] md:text-[13.5px] text-[#c3cad6] leading-[1.65]">
                  If you don&rsquo;t see the confirmation email, check your promotions or spam
                  folders, then{' '}
                  <strong className="font-semibold text-white">
                    reply to it and move it to your primary inbox
                  </strong>{' '}
                  so you don&rsquo;t miss out on the reminders.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={180}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                <Link
                  to="/trader"
                  className="inline-flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] text-white px-6 py-3.5 rounded-xl text-[14px] font-semibold transition-colors"
                >
                  Back to the Pilot
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#8a93a3] hover:text-white transition-colors px-4 py-2"
                >
                  Explore PersonaForce <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        <TjFooter />
      </div>
    </div>
  );
};

export default TraderThankYou;
