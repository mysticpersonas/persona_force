import { useState, useEffect, useRef } from 'react';
import SiteNav from '../components/SiteNav';
import {
  Check,
  X,
  ArrowRight,
  ChevronDown,
  LineChart,
  Crosshair,
  Activity,
  BarChart3,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Eye,
  Compass,
  Flame,
  Sparkles,
  Lock,
  Zap
} from 'lucide-react';
import ParticleField from '../components/ParticleField';

/* ------------------------------------------------------------------ *
 * Small in-house scroll helpers (no animation library on this stack). *
 * Everything triggers once, only when it enters the viewport.         *
 * ------------------------------------------------------------------ */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -40px 0px', ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
};

// Blur-to-focus reveal — used for the single most important line on the page.
const BlurReveal = ({ children, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 blur-0 translate-y-0' : 'opacity-0 blur-[8px] translate-y-3'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Directional slide-in for list reveals.
const SlideIn = ({ children, from = 'left', delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  const hidden = from === 'left' ? '-translate-x-6 opacity-0' : 'translate-x-6 opacity-0';
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'translate-x-0 opacity-100' : hidden
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Generic fade-up.
const Rise = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Repeated primary CTA — same wording everywhere, per the brief.
const CTAButton = ({ onClick, glow = false, className = '' }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center gap-2 bg-[#00AEEF] hover:bg-[#0bb9f8] text-[#04121f] px-5 py-3 text-[14px] sm:px-7 sm:py-4 sm:text-[15px] rounded-xl font-bold tracking-[-0.2px] transition-colors ${
      glow ? 'animate-[pftGlow_3s_ease-in-out_infinite]' : 'shadow-[0_0_24px_rgba(0,174,239,0.25)] hover:shadow-[0_0_34px_rgba(0,174,239,0.4)]'
    } ${className}`}
  >
    Join the Private Pilot <ArrowRight className="w-4 h-4" />
  </button>
);

/* ------------------------------------------------------------------ */

const HERO_WORDS = [
  { t: 'Discover' },
  { t: 'the' },
  { t: 'Trader' },
  { t: 'break' },
  { t: 'Behind', accent: true },
  { t: 'the' },
  { t: 'Trade™' },
];

// The "noise" traders fixate on (Blind Spot)
const STUDY = [
  { icon: LineChart, label: 'Charts' },
  { icon: Crosshair, label: 'Setups' },
  { icon: Activity, label: 'Signals' },
  { icon: BarChart3, label: 'Indicators' },
  { icon: TrendingUp, label: 'Entries & Exits' },
  { icon: Shield, label: 'Risk' },
  { icon: Clock, label: 'Timing' },
  { icon: Target, label: 'Strategy' },
];

// Steady / Triggered / Future — front-end names for Core/Shadow/Oracle
const TRADERS = [
  {
    icon: Compass,
    name: 'The Steady Trader',
    tag: 'Your baseline',
    color: '#00AEEF',
    desc: 'Who you are when you are calm, clear, and following the plan.',
  },
  {
    icon: Flame,
    name: 'The Triggered Trader',
    tag: 'The hijack',
    color: '#e0934d',
    desc: 'The version of you that takes over under pressure, revenge, freeze, force, overtrade, move stops, or exit emotionally.',
  },
  {
    icon: Sparkles,
    name: 'The Future Trader',
    tag: 'The next level',
    color: '#7A2DFF',
    desc: 'The more disciplined version of you being built, the one ready to lead your next 90 days.',
  },
];

const COLLIDE = [
  'Money', 'Pressure', 'Fear', 'Greed', 'Confidence', 'Uncertainty',
  'Opportunity', 'Loss', 'Winning', 'Waiting', 'Hesitation', 'Overconfidence',
];

const DAYS = [
  { n: 1, title: 'Who Is The Trader?', focus: 'Identify the version of you making trading decisions.', color: '#00AEEF' },
  { n: 2, title: 'The Invisible Trade', focus: 'See what happens before you click, enter, exit, hold, or hesitate.', color: '#1f9bf0' },
  { n: 3, title: 'The Identity Gap', focus: 'Discover why smart traders break rules they already understand.', color: '#4a82f5' },
  { n: 4, title: 'Pressure Reveals Identity', focus: 'Recognize who takes over when money, fear, and uncertainty collide.', color: '#6a5cf8' },
  { n: 5, title: 'Meet Your Future Trader', focus: 'Define the version of you that should lead your next 90 days.', color: '#7A2DFF', payoff: true },
];

const FOR_YOU = [
  'You know your strategy but still break your rules.',
  'You hesitate when the setup is clear.',
  'You force trades when you should wait.',
  'You revenge trade after a loss.',
  'You exit too early, hold too long, or move stops emotionally.',
  'You become overconfident after a win.',
  'You want to understand the version of you that shows up under pressure.',
  'You are ready to study yourself as seriously as you study the market.',
];

const WALK_AWAY = [
  'A clearer view of your trading behavior under pressure.',
  'A better understanding of your emotional decision pattern.',
  'A first look at the version of you that breaks rules or overrides discipline.',
  'A simple language for recognizing when you are steady, triggered, or future-focused.',
  'A private reflection path for deciding whether deeper 1:1 or group work is right for you.',
  'A chance to be considered for a private PersonaForce Trader™ Map.',
];

const NOT_THIS = [
  'This is not financial advice.',
  'This is not an investment program.',
  'This is not a signal group.',
  'This is not a trading strategy course.',
  'This is not an AI trading tool.',
  'This is not a promise of profit or trading results.',
];

const Trader = () => {
  // Drives the sticky bottom CTA bar below — separate from the nav, which owns its own.
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Same sticky announce-bar behavior as every other page
  const scrollToForm = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Re-run GHL's embed script on mount so the inline form auto-resizes on this SPA route.
  // Without this the iframe keeps a fixed height and scrolls internally (chunky on mobile).
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://link.msgsndr.com/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  const [lineRef, lineIn] = useInView({ threshold: 0.3 });
  const [formRef, formIn] = useInView({ threshold: 0.2 });

  return (
    <div className="relative min-h-screen bg-[#0A0F1F] text-white font-sans overflow-x-hidden selection:bg-[#00AEEF]/30 selection:text-white antialiased">

      {/* AMBIENT DEPTH — faint data-grid + drifting glows behind everything so no section reads flat */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(0,174,239,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.045)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <div className="absolute top-[12%] -left-40 w-[420px] h-[420px] rounded-full bg-[#00AEEF]/[0.05] blur-[120px]" />
        <div className="absolute top-[55%] -right-40 w-[460px] h-[460px] rounded-full bg-[#7A2DFF]/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10">

      <SiteNav />

      <div className="pt-[80px] md:pt-[110px]" />

      {/* ============================ 1 · HERO ============================ */}
      <section className="relative overflow-hidden">
        <ParticleField className="absolute inset-0 w-full h-full" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_0%,#0A0F1F_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0A0F1F]" />

        <div className="relative z-10 max-w-[860px] mx-auto px-5 md:px-8 pt-12 pb-20 md:pt-20 md:pb-32 text-center">
          {/* scarcity / invitation frame, early */}
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-[#00AEEF]/[0.3] text-[#5fd0f5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-7 opacity-0 animate-[wordUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both]">
            <span className="w-[5px] h-[5px] rounded-full bg-[#00AEEF] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
            Private invitation · Small group of traders
          </div>

          {/* word-by-word headline */}
          <h1 className="text-[clamp(27px,7vw,68px)] font-display font-normal leading-[1.08] md:leading-[1.04] tracking-[-0.015em] md:tracking-[-0.015em] flex flex-wrap justify-center gap-x-[0.22em] gap-y-0.5 max-w-[760px] mx-auto">
            {HERO_WORDS.map((w, i) =>
              w.t === 'break' ? (
                <span key={i} className="w-full h-0" />
              ) : (
                <span
                  key={i}
                  className={`inline-block opacity-0 animate-[wordUp_0.6s_cubic-bezier(0.16,1,0.3,1)_both] ${
                    w.accent ? 'bg-gradient-to-br from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent' : ''
                  }`}
                  style={{ animationDelay: `${150 + i * 45}ms` }}
                >
                  {w.t}
                </span>
              )
            )}
          </h1>

          <p
            className="text-[15px] md:text-[18px] text-[#aab2cc] max-w-[600px] mx-auto mt-7 leading-[1.7] opacity-0 animate-[wordUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]"
            style={{ animationDelay: '560ms' }}
          >
            A private 5-day identity pilot for traders who want to understand why they
            break rules, hesitate, overtrade, revenge trade, or lose discipline under
            pressure.
          </p>

          <div className="opacity-0 animate-[wordUp_0.7s_cubic-bezier(0.16,1,0.3,1)_both]" style={{ animationDelay: '700ms' }}>
            <div className="mt-8 md:mt-9">
              <CTAButton onClick={scrollToForm} glow />
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[11.5px] font-semibold text-[#8b93ad]">
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#00AEEF]" /> Free</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#00AEEF]" /> 5 Days</span>
              <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[#00AEEF]" /> Invited traders only</span>
            </div>
            <p className="text-[12px] text-[#6b7390] mt-4 max-w-[440px] mx-auto leading-[1.55]">
              This is not a trading strategy course. No signals. No financial advice.
              Just the identity behind your decisions.
            </p>
          </div>
        </div>
      </section>

      {/* ====================== 2 · THE BLIND SPOT ===================== */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[960px] mx-auto">
          <Rise className="text-center mb-12 md:mb-14">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-4">The Blind Spot</div>
            <h2 className="text-[clamp(22px,3.6vw,34px)] font-display font-normal tracking-[-0.6px] leading-[1.25] max-w-[700px] mx-auto">
              Traders study everything about the market.{' '}
              <span className="text-[#7e87aa]">Almost nothing about themselves.</span>
            </h2>
          </Rise>

          {/* the noise they fixate on */}
          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-[660px] mx-auto mb-9">
            {STUDY.map((s, i) => (
              <Rise key={s.label + i} delay={i * 60}>
                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] text-[#8b93ad] text-[12.5px] md:text-[13px] font-medium px-3.5 py-2 rounded-lg">
                  <s.icon className="w-3.5 h-3.5 text-[#6b7390]" />
                  {s.label}
                </div>
              </Rise>
            ))}
          </div>

          <Rise delay={100}>
            <p className="text-center text-[15px] md:text-[16px] text-[#aab2cc] max-w-[640px] mx-auto leading-[1.75]">
              But the same trader can still hesitate, force a trade, move a stop, revenge
              trade, oversize, exit too early, or break a rule they promised themselves they
              would follow. <span className="text-white font-medium">That is not always a strategy problem. Sometimes it is the identity behind the decision.</span>
            </p>
          </Rise>

          {/* connector down to the card */}
          <Rise delay={140} className="flex justify-center my-8">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gradient-to-b from-white/10 to-[#00AEEF]/50" />
              <ChevronDown className="w-4 h-4 text-[#00AEEF] -mt-1" />
            </div>
          </Rise>

          {/* the person placing the trade */}
          <Rise delay={180}>
            <div className="relative max-w-[540px] mx-auto rounded-2xl p-7 md:p-9 text-center bg-gradient-to-b from-[#0e1730] to-[#0A0F1F] border border-[#00AEEF]/25 shadow-[0_0_50px_rgba(0,174,239,0.12)]">
              <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#7A2DFF] flex items-center justify-center mb-5 shadow-[0_0_24px_rgba(0,174,239,0.45)]">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <p className="text-[17px] md:text-[20px] font-bold text-white leading-snug">The person placing the trade.</p>
              <p className="text-[13.5px] md:text-[14px] text-[#9aa1b8] mt-3 leading-[1.65]">
                You can have a system, a plan, and a signal, but when pressure hits, a
                different version of you may take over. This pilot helps you identify that version.
              </p>
              <div className="mt-6 pt-5 border-t border-white/[0.07] text-[10.5px] font-bold tracking-[0.16em] uppercase text-[#5fd0f5]">
                PersonaForce Trader™ Identity Check
              </div>
            </div>
          </Rise>

          <Rise delay={220}>
            <p className="text-center mt-9 text-[13px] tracking-[0.14em] uppercase font-bold bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">
              Before you fix the trade, you need to see who is placing it.
            </p>
          </Rise>
        </div>
      </section>

      {/* =================== 3 · THE PHILOSOPHY BEAT =================== */}
      <section className="relative overflow-hidden px-5 md:px-8 py-24 md:py-36 border-y border-white/[0.05] bg-[radial-gradient(ellipse_at_center,rgba(122,45,255,0.08)_0%,transparent_70%)]">
        <div className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2 text-[180px] md:text-[260px] leading-none font-display font-normal text-white/[0.025] select-none">&ldquo;</div>

        <div className="relative max-w-[900px] mx-auto text-center">
          <BlurReveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="w-8 md:w-12 h-px bg-gradient-to-r from-transparent to-[#00AEEF]/60" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#5fd0f5]">The PersonaForce Principle</span>
              <span className="w-8 md:w-12 h-px bg-gradient-to-l from-transparent to-[#7A2DFF]/60" />
            </div>
          </BlurReveal>

          <BlurReveal>
            <h2 className="text-[clamp(26px,5vw,52px)] font-display font-normal leading-[1.18] tracking-[-0.015em]">
              The market does not create your identity.
              <br className="hidden md:block" />{' '}
              <span className="bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">
                It reveals it.
              </span>
            </h2>
          </BlurReveal>

          <BlurReveal className="flex justify-center mt-8">
            <span className="block h-[3px] w-24 rounded-full bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF]" />
          </BlurReveal>

          <BlurReveal className="mt-8">
            <p className="text-[15px] md:text-[17px] text-[#aab2cc] max-w-[600px] mx-auto leading-[1.7]">
              Every win, loss, entry, exit, hesitation, and rule break reveals something
              about the trader behind the trade. This pilot helps you see the pattern
              before the pattern costs you again.
            </p>
          </BlurReveal>
        </div>
      </section>

      {/* ==================== 4 · WHY THIS IS DIFFERENT =============== */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[820px] mx-auto text-center">
          <Rise>
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-4">Why This Is Different</div>
            <h2 className="text-[clamp(22px,3.6vw,36px)] font-display font-normal tracking-[-0.6px] leading-[1.22]">
              We are not starting with the market.
            </h2>
          </Rise>

          <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
            <Rise delay={100}>
              <div className="h-full rounded-2xl bg-white/[0.02] border border-white/[0.07] p-6">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#6b7390] mb-3">Most programs</div>
                <p className="text-[15px] text-[#9aa1b8] leading-[1.6]">Begin with strategy, what to trade, which system to use, how the setup works.</p>
              </div>
            </Rise>
            <Rise delay={180}>
              <div className="h-full rounded-2xl bg-gradient-to-b from-[#0e1730] to-[#0A0F1F] border border-[#7A2DFF]/30 p-6 shadow-[0_0_40px_rgba(122,45,255,0.12)]">
                <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#b58cff] mb-3">PersonaForce Trader™</div>
                <p className="text-[15px] text-[#d4daea] leading-[1.6]">Begins with the trader, what happens inside you when the trade becomes emotional, uncertain, pressured, or personal.</p>
              </div>
            </Rise>
          </div>

          <Rise delay={240}>
            <p className="mt-9 text-[16px] md:text-[18px] font-bold text-white">
              The goal is simple: <span className="bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent">reveal the trader behind the trade.</span>
            </p>
          </Rise>
        </div>
      </section>

      {/* ============== 5 · THREE VERSIONS OF YOU (authority) ========= */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-t border-white/[0.05]">
        <div className="max-w-[1100px] mx-auto">
          <Rise className="text-center mb-14 md:mb-16">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-3">The Identity States</div>
            <h2 className="text-[clamp(24px,4vw,40px)] font-display font-normal tracking-[-0.6px] leading-[1.2]">
              Three versions of you can show up<br className="hidden sm:block" /> in every trade.
            </h2>
            <p className="text-[14px] md:text-[15px] text-[#9aa1b8] mt-5 max-w-[560px] mx-auto leading-[1.65]">
              This pilot helps you identify which version has been placing your trades, and
              which version needs to lead next.
            </p>
          </Rise>

          <div className="grid gap-5 md:grid-cols-3">
            {TRADERS.map((t, i) => (
              <Rise key={t.name} delay={i * 120}>
                <div className="group h-full rounded-2xl bg-white/[0.025] border border-white/[0.07] p-7 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: `${t.color}1a`, border: `1px solid ${t.color}55`, boxShadow: `0 0 22px ${t.color}33` }}
                  >
                    <t.icon className="w-6 h-6" style={{ color: t.color }} />
                  </div>
                  <h3 className="text-[17px] font-bold text-white mb-2.5">{t.name}</h3>
                  <p className="text-[13.5px] text-[#9aa1b8] leading-[1.65]">{t.desc}</p>
                  <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="mt-4 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: t.color }}>{t.tag}</div>
                </div>
              </Rise>
            ))}
          </div>

          {/* mid-page CTA */}
          <Rise delay={120} className="flex justify-center mt-14">
            <CTAButton onClick={scrollToForm} />
          </Rise>
        </div>
      </section>

      {/* ================ 6 · WHAT CHANGES WHEN PRESSURE HITS ========= */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[760px] mx-auto text-center">
          <Rise>
            <h2 className="text-[clamp(22px,3.6vw,34px)] font-display font-normal tracking-[-0.6px]">What changes when pressure hits?</h2>
            <p className="text-[15px] md:text-[16px] leading-[1.7] text-[#aab2cc] mt-5 max-w-[600px] mx-auto">
              Over five short sessions, you will begin identifying what happens inside you
              when these conditions show up:
            </p>
          </Rise>
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {COLLIDE.map((word, i) => (
              <Rise key={word} delay={i * 55}>
                <span className="inline-block bg-white/[0.04] border border-white/[0.08] text-[#d4daea] text-[12px] md:text-[13px] font-semibold tracking-[0.02em] px-4 py-2 rounded-full hover:border-[#00AEEF]/40 hover:text-white transition-colors">
                  {word}
                </span>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 7 · THE 5-DAY JOURNEY =================== */}
      <section className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          <Rise className="text-center mb-16 md:mb-20">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-3">The Challenge</div>
            <h2 className="text-[clamp(24px,4vw,40px)] font-display font-normal tracking-[-0.6px]">Five Days. One Question.</h2>
            <p className="text-[15px] md:text-[17px] text-[#aab2cc] mt-4 font-medium">Who is placing the trade?</p>
          </Rise>

          <div ref={lineRef} className="relative">
            {/* connecting line — desktop (draws left→right) */}
            <div className="hidden md:block absolute top-7 left-[10%] w-[80%] h-px origin-left transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: 'linear-gradient(90deg,#00AEEF,#7A2DFF)', transform: lineIn ? 'scaleX(1)' : 'scaleX(0)' }}
            />
            {/* connecting line — mobile (draws top→bottom) */}
            <div className="md:hidden absolute left-6 top-6 bottom-6 w-px origin-top transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: 'linear-gradient(180deg,#00AEEF,#7A2DFF)', transform: lineIn ? 'scaleY(1)' : 'scaleY(0)' }}
            />

            <div className="grid gap-9 md:grid-cols-5 md:gap-4">
              {DAYS.map((d, i) => (
                <Rise key={d.n} delay={i * 110}>
                  <div className="group flex md:flex-col items-start md:items-center gap-4 text-left md:text-center">
                    <div
                      className={`relative z-10 shrink-0 rounded-full flex items-center justify-center font-black bg-[#0A0F1F] border-2 transition-transform duration-300 group-hover:scale-110 ${
                        d.payoff ? 'w-14 h-14 md:w-16 md:h-16 text-[18px]' : 'w-12 h-12 md:w-14 md:h-14 text-[16px]'
                      }`}
                      style={{ borderColor: d.color, color: d.color, boxShadow: `0 0 ${d.payoff ? 34 : 20}px ${d.color}${d.payoff ? '77' : '55'}` }}
                    >
                      {d.n}
                    </div>
                    <div className="md:px-1">
                      <div className="text-[10px] font-bold tracking-[0.16em] uppercase mb-1.5" style={{ color: d.color }}>Day {d.n}</div>
                      <div className={`font-bold leading-tight mb-2 ${d.payoff ? 'text-white text-[16px] md:text-[17px]' : 'text-[#e7ebf5] text-[15px]'}`}>{d.title}</div>
                      <p className="text-[12.5px] text-[#8b93ad] leading-[1.55]">{d.focus}</p>
                    </div>
                  </div>
                </Rise>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 8 · THIS IS FOR YOU IF ================= */}
      <section className="px-5 md:px-8 py-20 md:py-28 border-t border-white/[0.05]">
        <div className="max-w-[860px] mx-auto">
          <SlideIn from="left" className="mb-10 text-center md:text-left">
            <h2 className="text-[clamp(22px,3.6vw,34px)] font-display font-normal tracking-[-0.6px]">This is for you if…</h2>
          </SlideIn>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {FOR_YOU.map((line, i) => (
              <SlideIn key={i} from="left" delay={80 + i * 70}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#00AEEF]/15 border border-[#00AEEF]/40 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00AEEF]" strokeWidth={3} />
                  </span>
                  <p className="text-[14px] md:text-[15px] text-[#cdd4e6] leading-[1.55]">{line}</p>
                </div>
              </SlideIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================ 9 · WHAT YOU'LL WALK AWAY WITH ============= */}
      <section className="px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-[900px] mx-auto">
          <Rise className="text-center mb-12">
            <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#b58cff] mb-3">The Takeaway</div>
            <h2 className="text-[clamp(22px,3.6vw,34px)] font-display font-normal tracking-[-0.6px]">What you&rsquo;ll walk away with</h2>
          </Rise>
          <div className="grid sm:grid-cols-2 gap-4">
            {WALK_AWAY.map((line, i) => (
              <Rise key={i} delay={i * 90}>
                <div className="flex items-start gap-3.5 h-full rounded-xl bg-white/[0.025] border border-white/[0.07] p-5 hover:border-[#7A2DFF]/35 transition-colors">
                  <span className="mt-0.5 shrink-0 w-6 h-6 rounded-lg bg-[#7A2DFF]/15 border border-[#7A2DFF]/40 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#b58cff]" strokeWidth={3} />
                  </span>
                  <p className="text-[14px] md:text-[15px] text-[#cdd4e6] leading-[1.55]">{line}</p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 10 · THIS IS NOT ====================== */}
      <section className="px-5 md:px-8 pt-8 pb-4">
        <div className="max-w-[720px] mx-auto rounded-2xl bg-white/[0.02] border border-white/[0.06] p-7 md:p-9">
          <Rise>
            <h2 className="flex items-center gap-2 text-[16px] font-bold text-[#c6cde0] mb-6">
              <span className="w-6 h-px bg-white/20" /> This is not…
            </h2>
          </Rise>
          <div className="flex flex-col gap-3">
            {NOT_THIS.map((line, i) => (
              <Rise key={i} delay={i * 60}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center">
                    <X className="w-3 h-3 text-[#828aa3]" strokeWidth={3} />
                  </span>
                  <p className="text-[14px] text-[#9aa1b8] leading-[1.55]">{line}</p>
                </div>
              </Rise>
            ))}
          </div>
          <Rise delay={80}>
            <p className="mt-6 pt-5 border-t border-white/[0.06] text-[13.5px] text-[#cdd4e6] leading-[1.6]">
              This is an identity-performance pilot designed to help you understand
              <span className="text-white font-medium"> who is placing the trade.</span>
            </p>
          </Rise>
        </div>
      </section>

      {/* ======================= 11 · THE FORM ======================== */}
      <section id="register" className="px-4 sm:px-6 md:px-8 py-16 md:py-24 scroll-mt-[70px] bg-[radial-gradient(ellipse_at_center,rgba(0,174,239,0.06)_0%,transparent_70%)]">
        <div className="max-w-[640px] mx-auto text-center">
          {/* pre-form privacy / safety line */}
          <Rise>
            <div className="flex items-start gap-3 text-left max-w-[540px] mx-auto mb-10 rounded-xl bg-white/[0.03] border border-white/[0.07] px-5 py-4">
              <Lock className="w-4 h-4 text-[#5fd0f5] mt-0.5 shrink-0" />
              <p className="text-[13px] text-[#9aa1b8] leading-[1.6]">
                You do not need to share your strategy, account size, signals, trade history,
                or proprietary system. This pilot focuses only on the identity behind your decisions.
              </p>
            </div>
          </Rise>

          <Rise>
            <div className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.16em] uppercase text-[#5fd0f5] mb-5">
              <span className="w-[5px] h-[5px] rounded-full bg-[#00AEEF] animate-[pulse_1.5s_ease-in-out_infinite]" />
              Private pilot · Limited to invited traders
            </div>
            <h2 className="text-[clamp(26px,4.5vw,42px)] font-display font-normal tracking-[-0.015em]">Join the Private PFT Pilot</h2>
            <p className="text-[14px] md:text-[15px] text-[#9aa1b8] mt-4 max-w-[480px] mx-auto leading-[1.65]">
              Complete the short registration below. Once accepted, you&rsquo;ll receive access
              to Day 1 and your first identity reflection prompt.
            </p>
          </Rise>

          {/* trust strip */}
          <Rise delay={80}>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-2.5 mt-8 max-w-[560px] mx-auto">
              {[
                { icon: Lock, text: 'Private pilot, not a public course' },
                { icon: Check, text: 'Free to join, no payment' },
                { icon: Zap, text: 'Invited traders only' },
              ].map((it, i) => (
                <div key={i} className="flex items-center gap-2 flex-1 justify-center rounded-lg bg-white/[0.03] border border-white/[0.07] px-3 py-2.5 text-[12px] font-semibold text-[#cdd4e6]">
                  <it.icon className="w-3.5 h-3.5 text-[#5fd0f5] shrink-0" />
                  {it.text}
                </div>
              ))}
            </div>
          </Rise>

          <div
            ref={formRef}
            className={`mt-8 md:mt-10 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/[0.09] p-1.5 sm:p-3 md:p-4 shadow-[0_0_60px_rgba(0,174,239,0.1)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              formIn ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'
            }`}
          >
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/HYyfRIKByhEmFky3sdjl"
              style={{ width: '100%', minHeight: '640px', border: 'none', borderRadius: '8px', display: 'block' }}
              id="inline-HYyfRIKByhEmFky3sdjl"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="PFT Founder Pilot Registration Form"
              data-height="undefined"
              data-layout-iframe-id="inline-HYyfRIKByhEmFky3sdjl"
              data-form-id="HYyfRIKByhEmFky3sdjl"
              title="PFT Founder Pilot Registration Form"
            />
          </div>
        </div>
      </section>

      {/* ===================== 12 · DISCLAIMER ======================== */}
      <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11.5px] leading-[1.7] text-[#646b85]">
            PersonaForce Trader™ is an educational and identity-development experience.
            It does not provide financial, investment, tax, legal, or trading advice.
            Results vary. Participants are responsible for their own trading decisions and
            should consult appropriate licensed professionals before making financial decisions.
          </p>
          <div className="flex items-center justify-center gap-5 mt-6 text-[12px] font-semibold text-[#8b93ad]">
            <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="w-px h-3 bg-white/10" />
            <a href="/terms" className="hover:text-white transition-colors">Terms &amp; Conditions</a>
          </div>
          <p className="text-[11px] text-[#3f4763] mt-5">
            © {new Date().getFullYear()} PersonaForce Trader™ · Discover the Trader Behind the Trade™
          </p>
        </div>
      </footer>

      {/* STICKY MOBILE CTA — follows the user on phones/tablets; hides once the form is in view */}
      <div className={`lg:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] bg-[#0A0F1F]/95 backdrop-blur-md border-t border-white/[0.08] transition-all duration-300 ${isScrolled && !formIn ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}`}>
        <button onClick={scrollToForm} className="w-full inline-flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-[#0bb9f8] text-[#04121f] py-3.5 rounded-xl text-[15px] font-bold shadow-[0_0_24px_rgba(0,174,239,0.35)]">
          Join the Private Pilot <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default Trader;
