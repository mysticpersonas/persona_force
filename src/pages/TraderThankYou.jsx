import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import {
  ArrowRight,
  MailCheck,
  ListChecks,
  CalendarClock,
  Award,
  Clock
} from 'lucide-react';
import ParticleField from '../components/ParticleField';
import FadeUp from '../components/FadeUp';

// What Happens Next — straight from the campaign doc
const NEXT_STEPS = [
  { icon: MailCheck, title: 'Check your email for Day 1 access', desc: 'Your first session and reflection prompt are on the way.' },
  { icon: ListChecks, title: 'Complete each daily reflection', desc: 'Five short sessions. A few honest minutes each day.' },
  { icon: CalendarClock, title: 'Watch for the Live Reveal invitation', desc: 'It arrives after you complete the challenge.' },
  { icon: Award, title: 'You may be selected for a complimentary Map', desc: 'Selected participants are considered for a private PersonaForce Trader™ Map.' },
];

const TraderThankYou = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0F1F] text-white font-sans overflow-x-hidden selection:bg-[#00AEEF]/30 selection:text-white antialiased">

      {/* AMBIENT DEPTH — same as the Trader page */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(0,174,239,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.045)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <div className="absolute top-[12%] -left-40 w-[420px] h-[420px] rounded-full bg-[#00AEEF]/[0.05] blur-[120px]" />
        <div className="absolute top-[55%] -right-40 w-[460px] h-[460px] rounded-full bg-[#7A2DFF]/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10">

        <SiteNav />

        <div className="pt-[80px] md:pt-[110px]" />

        {/* ======================= CONFIRMATION HERO ======================= */}
        <section className="relative overflow-hidden">
          <ParticleField className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_25%,transparent_0%,#0A0F1F_78%)]" />

          <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-8 pt-14 pb-16 md:pt-20 md:pb-20 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-[#00AEEF]/[0.12] border border-[#00AEEF]/[0.3] text-[#5fd0f5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-7">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00AEEF] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Registration Confirmed
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <h1 className="text-[clamp(40px,9vw,84px)] font-display font-normal leading-[1.02] tracking-[-0.015em]">
                You&rsquo;re{' '}
                <span className="bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">In.</span>
              </h1>
            </FadeUp>

            <FadeUp delay={200}>
              <p className="text-[16px] md:text-[19px] text-[#c6cde0] mt-6 leading-[1.6] max-w-[560px] mx-auto">
                Welcome to the <span className="text-white font-semibold">PersonaForce Trader™ Founder Pilot.</span>
              </p>
            </FadeUp>

            <FadeUp delay={280}>
              <p className="text-[14px] md:text-[15px] text-[#9aa1b8] mt-4 leading-[1.7] max-w-[560px] mx-auto">
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
            <div className="relative max-w-[720px] mx-auto rounded-2xl p-8 md:p-12 text-center bg-gradient-to-b from-[#0e1730] to-[#0A0F1F] border border-white/[0.07] shadow-[0_0_60px_rgba(122,45,255,0.1)] overflow-hidden">
              <div className="pointer-events-none absolute top-2 left-1/2 -translate-x-1/2 text-[160px] md:text-[220px] leading-none font-display font-normal text-white/[0.025] select-none">&ldquo;</div>
              <div className="relative">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-5">Before Day 1 Begins</div>
                <h2 className="text-[clamp(22px,4vw,34px)] font-display font-normal tracking-[-0.6px] leading-[1.2]">
                  Who has been{' '}
                  <span className="bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">placing my trades?</span>
                </h2>
                <p className="text-[14px] md:text-[15px] text-[#9aa1b8] mt-5 leading-[1.7] max-w-[520px] mx-auto">
                  Not the strategy. Not the setup. Not the market. Who is the version of you that
                  shows up when money, pressure, fear, greed, uncertainty, and opportunity collide?
                </p>
                <p className="mt-6 text-[13px] tracking-[0.14em] uppercase font-bold bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">
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
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-3">What Happens Next</div>
                <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal tracking-[-0.6px]">Your next few days</h2>
              </div>
            </FadeUp>

            <div className="grid sm:grid-cols-2 gap-4">
              {NEXT_STEPS.map((s, i) => (
                <FadeUp key={s.title} delay={i * 90}>
                  <div className="flex items-start gap-4 h-full rounded-2xl bg-white/[0.025] border border-white/[0.07] p-6 hover:border-[#00AEEF]/30 transition-colors">
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-[#00AEEF]/[0.12] border border-[#00AEEF]/[0.35] flex items-center justify-center">
                      <s.icon className="w-5 h-5 text-[#5fd0f5]" />
                    </span>
                    <div>
                      <h3 className="text-[15px] md:text-[16px] font-bold text-white leading-snug mb-1.5">{s.title}</h3>
                      <p className="text-[13px] text-[#9aa1b8] leading-[1.6]">{s.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>

            {/* spam note */}
            <FadeUp delay={120}>
              <div className="flex items-center justify-center gap-2.5 mt-8 text-center rounded-xl bg-white/[0.02] border border-white/[0.06] px-5 py-4">
                <Clock className="w-4 h-4 text-[#6b7390] shrink-0" />
                <p className="text-[13px] text-[#9aa1b8] leading-[1.5]">
                  Don&rsquo;t see the email within a few minutes? Check your promotions, spam, or updates folder.
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
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#9aa3bd] hover:text-white transition-colors px-4 py-2"
                >
                  Explore PersonaForce <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* signature + disclaimer */}
        <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06]">
          <div className="max-w-[680px] mx-auto text-center">
            <p className="text-[14px] font-bold text-white">Dr. Travis Fox</p>
            <p className="text-[12px] text-[#5fd0f5] mt-1">PersonaForce Trader™ · Discover the Trader Behind the Trade™</p>
            <p className="text-[11.5px] leading-[1.7] text-[#646b85] mt-7">
              PersonaForce Trader™ is an educational and identity-development experience.
              It does not provide financial, investment, tax, legal, or trading advice.
              Results vary. Participants are responsible for their own trading decisions and
              should consult appropriate licensed professionals before making financial decisions.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default TraderThankYou;
