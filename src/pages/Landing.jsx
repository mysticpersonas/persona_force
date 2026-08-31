import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ChevronDown
} from 'lucide-react';
import FadeUp from '../components/FadeUp';
import StarField from '../components/StarField';
import SectionVideo from '../components/SectionVideo';

// Module-level so the arrays keep a stable identity — a literal declared inside
// the component would restart SectionVideo's playback effect on every render.
// Each window is deliberately short: a motif, not a background movie.
const PROFESSION_CLIPS = [
  { src: '/3d/ceoo.mp4', duration: 4 },
  { src: '/3d/lawyer.mp4', duration: 4 },
];
const SPORT_CLIPS = [
  { src: '/3d/golf.mp4', duration: 4 },
  { src: '/3d/ftblusa.mp4', duration: 4 },
];
const OS_CLIP = [{ src: '/3d/30yrsos.mp4', duration: 4 }];

const Landing = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Resolved once, lazily, so the browser is never asked to fetch both cuts.
  // Deliberately not reactive: swapping the hero's src mid-session would restart
  // the sky, and nobody resizes a phone into a desktop.
  const [heroSrc] = useState(() =>
    window.matchMedia('(max-width: 900px), (pointer: coarse)').matches
      ? '/3d/3d_bg-m.mp4'
      : '/3d/3d_bg.mp4'
  );

  const testimonials = [
    {
      quote: "First program that gave me a system, not just a framework. Understanding my shadow personas and how to shift out of pressure in real time changed how I handle every high stakes negotiation.",
      author: "Marcus T., VP of Sales"
    },
    {
      quote: "Tone, persona, structure, three days in and I see every conversation differently. This isn't training. It's a completely different way of operating.",
      author: "James R., Sales Director"
    },
    {
      quote: "The energy kept the entire room locked in. Learning to recognise my dark personas and control them under pressure was the most practical self awareness work I've ever done.",
      author: "Leila K., Executive Coach"
    }
  ];

  const stageRef = useRef(null);
  const scrollOutRef = useRef(null);
  const popRef = useRef(null);

  const scrollToVsl = () => {
    document.getElementById('vsl')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // Feed the cursor into the hero stage as CSS vars — no re-render, no layout.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e) => {
      el.style.setProperty('--pf-mx', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      el.style.setProperty('--pf-my', ((e.clientY / window.innerHeight) * 2 - 1).toFixed(3));
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Scroll choreography — the headline zooms out as the video rises into its place.
  // Both read the same scroll position, so the handoff reads as one movement.
  useEffect(() => {
    const out = scrollOutRef.current;
    const pop = popRef.current;
    if (!out || !pop) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const clamp = (v) => Math.min(1, Math.max(0, v));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      // Hero: ease-in, so it sits perfectly still for the first few pixels
      // instead of shrinking the instant you touch the wheel.
      const p = clamp(window.scrollY / (vh * 0.72));
      const e = p * p;
      out.style.setProperty('--pf-out-s', (1 - e * 0.3).toFixed(3));
      out.style.setProperty('--pf-out-y', `${(-e * 64).toFixed(1)}px`);
      out.style.setProperty('--pf-out-o', clamp(1 - e * 1.25).toFixed(3));
      out.style.setProperty('--pf-out-b', `${(e * 10).toFixed(1)}px`);

      // Video: ease-out, so it arrives with weight and settles rather than snapping.
      const q = clamp((vh - pop.getBoundingClientRect().top) / (vh * 0.62));
      const ee = 1 - Math.pow(1 - q, 3);
      pop.style.setProperty('--pf-pop-s', (0.86 + ee * 0.14).toFixed(3));
      pop.style.setProperty('--pf-pop-y', `${((1 - ee) * 64).toFixed(1)}px`);
      pop.style.setProperty('--pf-pop-o', clamp(ee * 1.4).toFixed(3));

      // Every section plate rotates flat as its section arrives. One loop for all
      // of them beats one scroll listener per section.
      for (const plate of document.querySelectorAll('[data-pf-plate]')) {
        const r = plate.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        // 0 while the plate is still a viewport away, 1 once it's settled in frame.
        const t = clamp((vh - r.top) / (vh * 0.75));
        const g = 1 - Math.pow(1 - t, 3);
        const inner = plate.firstElementChild;
        if (!inner) continue;
        inner.style.setProperty('--pf-pl-rx', `${((1 - g) * 14).toFixed(2)}deg`);
        inner.style.setProperty('--pf-pl-s', (1 + (1 - g) * 0.14).toFixed(3));
        inner.style.setProperty('--pf-pl-y', `${((1 - g) * 56).toFixed(1)}px`);
        inner.style.setProperty('--pf-pl-o', clamp(g * 1.25).toFixed(3));
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="relative isolate min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      {/* ── THE SKY ──────────────────────────────────────────────────────────
          Sits behind the announce bar, nav and hero as one continuous field,
          then dissolves into the flat page colour so the sections below it
          need no changes at all. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(100svh+920px)] md:h-[calc(100svh+1120px)] overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_-15%,#182a5e_0%,#0d1234_36%,#06081a_74%)]" />

        {/* 3D plate — confined to the hero viewport and left to loop on its own.
            Stretching it over the full sky (hero + video) distorted the footage. */}
        <div className="absolute inset-x-0 top-0 h-[100svh] overflow-hidden">
          {/* Phones get the 640px cut (152KB vs 574KB) and a poster, so the sky
              has its first frame before a single byte of video has arrived. */}
          <video
            className="pf-bgvid h-full w-full object-cover"
            src={heroSrc}
            poster="/3d/3d_bg.jpg"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          {/* Feather the bottom edge so the plate dissolves instead of cutting off */}
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06081a] to-transparent" />
        </div>

        <StarField className="absolute inset-0 h-full w-full" />

        {/* Brand bloom directly behind the headline */}
        <div className="absolute left-1/2 top-[46%] h-[460px] w-[900px] max-w-[150vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,111,232,0.30),rgba(59,111,232,0))] blur-[70px]" />

        {/* Edge vignettes keep the eye centred, the way the reference frames its canvas */}
        <div className="absolute inset-y-0 left-0 w-[16vw] bg-gradient-to-r from-[#06081a] via-[#06081a]/50 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[16vw] bg-gradient-to-l from-[#06081a] via-[#06081a]/50 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#06081a] via-[#06081a]/80 to-transparent" />

        <div className="pf-grain absolute inset-0 opacity-[0.045] mix-blend-overlay" />
      </div>

      
      <SiteNav />

      <div className="pt-[80px] md:pt-[110px]" /> {/* Spacer for fixed navs */}

      {/* HERO — a 3D stage under the night sky. Layers sit on different Z planes and the
          whole stage tilts toward the cursor, so depth comes from real perspective. */}
      <section className="relative flex min-h-[calc(100svh-80px)] md:min-h-[calc(100svh-110px)] flex-col justify-center px-5 md:px-8 pt-14 md:pt-20 pb-6 md:pb-10 text-center [perspective:1400px] [perspective-origin:50%_40%]">
        {/* Two wrappers, two jobs: this one takes the scroll (no transition, instant),
            the one inside takes the cursor tilt (slow transition). One element can't
            do both without the transition making scroll feel like syrup. */}
        <div ref={scrollOutRef} className="pf-scroll-out">
        <div
          ref={stageRef}
          className="pf-stage mx-auto flex max-w-[1100px] flex-col items-center"
        >
          {/* Each block is two elements on purpose: the outer one owns depth (translateZ),
              the inner one owns the entrance. Putting both on one element would make the
              entrance transform overwrite the depth transform. */}

          {/* Eyebrow — hairline rules instead of a pill, so it whispers rather than shouts */}
          <div className="pf-layer mb-7 md:mb-10" style={{ '--pf-z': '34px' }}>
            <div className="inline-flex items-center gap-3 md:gap-4 animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_both]">
              <span aria-hidden="true" className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-[#5b8af5]/70" />
              <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#98a1cf] whitespace-nowrap">
                Identity Intelligence™ System
              </span>
              <span aria-hidden="true" className="h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-[#5b8af5]/70" />
            </div>
          </div>

          <h1
            className="pf-layer font-display font-normal text-[28px] sm:text-[40px] md:text-[52px] lg:text-[62px] leading-[1.12] tracking-[-0.015em] text-[#eef0ff] max-w-[1060px] mx-auto mb-8 md:mb-12 text-balance"
            style={{ '--pf-z': '0px' }}
          >
            <span className="block animate-[wordUp_1.1s_cubic-bezier(0.22,1,0.36,1)_120ms_both]">
              You don&rsquo;t have a{' '}
              <span className="pf-line pf-line--erase">performance</span> problem.
            </span>
            <span className="mt-1 block italic animate-[wordUp_1.1s_cubic-bezier(0.22,1,0.36,1)_420ms_both] bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_28%,#7c9efa_62%,#3b6fe8_100%)] bg-clip-text text-transparent">
              You have an <span className="pf-line pf-line--reveal">identity</span> problem.
            </span>
          </h1>

          <div className="pf-layer" style={{ '--pf-z': '-24px' }}>
            <p className="font-ui text-[14.5px] md:text-[18px] font-normal text-[#8790bb] max-w-[620px] mx-auto leading-[1.75] animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_700ms_both]">
              PersonaForce™ reveals who shows up under pressure, so leaders, teams, athletes and organizations can perform with clarity, consistency and confidence.
            </p>
          </div>

          {/* Scroll button — hairline ring, breathing halo, nudging chevron.
              Same visual grammar as the nav CTA so it belongs to the hero. */}
          <div className="pf-layer mt-10 md:mt-14" style={{ '--pf-z': '-44px' }}>
            <button
              type="button"
              onClick={scrollToVsl}
              aria-label="Scroll to the video"
              className="group relative flex h-12 w-12 md:h-[54px] md:w-[54px] items-center justify-center rounded-full border border-[#5b8af5]/30 bg-[#5b8af5]/[0.06] backdrop-blur-sm transition-all duration-500 ease-out hover:border-[#5b8af5]/75 hover:bg-[#5b8af5]/[0.14] hover:shadow-[0_0_30px_rgba(59,111,232,0.4)] animate-[fadeUp_0.9s_cubic-bezier(0.22,1,0.36,1)_1100ms_both]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-full border border-[#5b8af5]/40 animate-[pfHalo_2.8s_cubic-bezier(0.4,0,0.2,1)_infinite]"
              />
              <ChevronDown
                className="h-[18px] w-[18px] text-[#a8b6f0] transition-colors duration-500 group-hover:text-white animate-[pfNudge_2.2s_ease-in-out_infinite]"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
        </div>
      </section>

      {/* VSL — rises into the space the headline vacates */}
      <section id="vsl" className="pt-2 pb-8 md:pb-12 px-5 md:px-8 scroll-mt-24">
        <div className="max-w-[900px] mx-auto">
          <div ref={popRef} className="pf-pop">
            <div className="w-full max-w-[760px] mx-auto rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)] relative">
              <wistia-player media-id="ey25sbhvm4" aspect="1.7777777777777777"></wistia-player>
            </div>
          </div>

          {/* Meta line — same hairline grammar as the hero eyebrow, so the two
              sections read as one system instead of two designs. */}
          <FadeUp delay={400}>
            <div className="flex items-center justify-center gap-3 md:gap-4 mt-5 md:mt-7">
              <span aria-hidden="true" className="hidden sm:block h-px w-5 md:w-10 bg-gradient-to-r from-transparent to-[#5b8af5]/45" />
              <p className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.18em] md:tracking-[0.24em] text-[#7e88bb] text-center">
                Watch free · No email required · 12 minutes
              </p>
              <span aria-hidden="true" className="hidden sm:block h-px w-5 md:w-10 bg-gradient-to-l from-transparent to-[#5b8af5]/45" />
            </div>
          </FadeUp>

          <FadeUp delay={500}>
            <div className="flex justify-center mt-6 md:mt-9">
              <Link
                to="/book?source=home"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#5b8af5]/45 bg-[#5b8af5]/[0.08] backdrop-blur-md px-7 py-3.5 md:px-9 md:py-4 font-ui text-[14px] md:text-[15px] font-medium text-[#eef0ff] transition-all duration-400 ease-out hover:border-[#5b8af5]/90 hover:bg-[#5b8af5]/[0.16] hover:text-white hover:shadow-[0_0_44px_rgba(59,111,232,0.45)]"
              >
                <span className="relative grid overflow-hidden">
                  <span className="col-start-1 row-start-1 block transition-transform duration-300 ease-out group-hover:-translate-y-full">Book My Mapping Session</span>
                  <span className="col-start-1 row-start-1 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">Book My Mapping Session</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2} />
              </Link>
            </div>
          </FadeUp>

          {/* Scarcity reads as a live status line, not a boxed callout — less shouty, more credible. */}
          <FadeUp delay={600}>
            <div className="flex items-center justify-center gap-2.5 mt-5 md:mt-7">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#5b8af5] opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5b8af5]" />
              </span>
              <p className="font-ui text-[12px] md:text-[13.5px] text-[#8790bb]">
                Mapping sessions this month: <span className="font-semibold text-[#c3d3ff]">6 spots remaining</span>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* WHAT IS COSTING YOU RESULTS — the CEO plate rises behind the questions */}
      <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24 px-5 md:px-8">
        <SectionVideo clips={PROFESSION_CLIPS} opacity={0.34} />

        <div className="relative max-w-[1000px] mx-auto w-full">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-[#5b8af5]/60" />
              <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#98a1cf]">The Real Question</span>
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-[#5b8af5]/60" />
            </div>
            <h2 className="font-display font-normal text-[32px] sm:text-[44px] md:text-[60px] text-center mb-12 md:mb-20 tracking-[-0.02em] leading-[1.08] text-[#eef0ff]">
              What is costing you{' '}
              <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">results?</em>
            </h2>
          </FadeUp>

          {/* A ledger, not a card grid — hairline rules and a ghosted index read
              calmer and let the footage behind stay visible. */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16">
            {[
              { role: "Leaders", q: "Why is my team still not executing?" },
              { role: "Sales", q: "Why are deals stalling?" },
              { role: "Athletes", q: "Why does performance change under pressure?" },
              { role: "Organizations", q: "Why does culture break down despite training?" }
            ].map((item, i) => (
              <FadeUp key={item.role} delay={i * 110}>
                <div className="group relative flex items-start gap-5 md:gap-7 border-t border-white/[0.08] py-7 md:py-10 transition-colors duration-500 hover:border-[#5b8af5]/40">
                  <span aria-hidden="true" className="font-ui text-[11px] md:text-[12px] font-medium tabular-nums text-[#5b8af5]/50 pt-1.5 transition-colors duration-500 group-hover:text-[#5b8af5]">
                    0{i + 1}
                  </span>
                  <div>
                    <div className="font-ui text-[9px] md:text-[10px] font-medium tracking-[0.26em] uppercase text-[#7e88bb] mb-2.5 md:mb-3">{item.role}</div>
                    <h3 className="font-display text-[21px] md:text-[27px] leading-[1.22] text-[#eef0ff]">{item.q}</h3>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SEE WHAT OTHERS MISS — golf and football trade places behind the ledger */}
      <section className="relative overflow-hidden py-20 md:py-32 px-5 md:px-8 border-y border-white/[0.06]">
        <SectionVideo clips={SPORT_CLIPS} opacity={0.38} />

        <div className="relative max-w-[1000px] mx-auto w-full">
          <FadeUp>
            <h2 className="font-display font-normal text-[32px] sm:text-[44px] md:text-[60px] text-center mb-12 md:mb-20 tracking-[-0.02em] leading-[1.08] text-[#eef0ff]">
              See what others{' '}
              <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">miss.</em>
            </h2>
          </FadeUp>

          <div className="flex flex-col">
            {[
              { most: "Most systems train behavior.", pf: "PersonaForce™ maps identity." },
              { most: "Most systems teach communication.", pf: "PersonaForce™ reveals who is communicating." },
              { most: "Most systems improve skills.", pf: "PersonaForce™ identifies who takes over when pressure arrives." }
            ].map((row, i) => (
              <FadeUp key={row.pf} delay={i * 110}>
                <div className="group grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-10 items-center py-8 md:py-12 border-b border-white/[0.07] last:border-0">
                  {/* The dismissed half stays in the quiet sans; the claim gets the serif. */}
                  <p className="font-ui text-[14px] md:text-[17px] text-[#6d76a3] leading-[1.6] text-center md:text-right transition-colors duration-500 group-hover:text-[#8790bb]">
                    {row.most}
                  </p>
                  <div className="hidden md:flex h-10 w-10 shrink-0 mx-auto items-center justify-center rounded-full border border-[#5b8af5]/25 bg-[#5b8af5]/[0.07] backdrop-blur-sm transition-all duration-500 group-hover:border-[#5b8af5]/70 group-hover:bg-[#5b8af5]/[0.16]">
                    <ArrowRight className="h-4 w-4 text-[#a8b6f0] transition-transform duration-500 group-hover:translate-x-0.5" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-[21px] md:text-[30px] leading-[1.22] text-[#eef0ff] text-center md:text-left">
                    {row.pf}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* POWERED BY MINDPERSONAS — the OS footage carries 30 years of depth */}
      <section className="relative overflow-hidden py-20 md:py-32 px-5 md:px-8">
        <SectionVideo clips={OS_CLIP} opacity={0.36} />

        <div className="relative max-w-[1000px] mx-auto w-full flex flex-col items-center">
          <FadeUp>
            <h2 className="font-display font-normal text-[30px] sm:text-[40px] md:text-[54px] text-center mb-10 md:mb-14 tracking-[-0.02em] leading-[1.1] max-w-[880px] mx-auto text-[#eef0ff] text-balance">
              Powered by the MindPersonas<sup className="text-[0.5em] align-super">™</sup>{' '}
              <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">
                Human Identity Operating System<sup className="text-[0.5em] align-super">™</sup>
              </em>
            </h2>
          </FadeUp>

          <FadeUp delay={120}>
            <div className="flex flex-col items-center mb-10 md:mb-16">
              <div className="font-display text-[68px] md:text-[110px] leading-[0.9] bg-[linear-gradient(160deg,#ffffff_0%,#7c9efa_70%,#3b6fe8_100%)] bg-clip-text text-transparent">30+</div>
              <div className="font-ui text-[9px] md:text-[10.5px] font-medium tracking-[0.34em] uppercase text-[#7e88bb] mt-3">Years</div>
            </div>
          </FadeUp>

          <FadeUp delay={220}>
            <div className="flex flex-wrap justify-center gap-2 md:gap-2.5 max-w-[780px] mx-auto">
              {["Corporate", "Athletics", "Leadership", "Sales", "Performance", "Identity Architecture™"].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/[0.1] bg-[#0b0d22]/40 backdrop-blur-md px-4 py-2 md:px-5 md:py-2.5 font-ui text-[12px] md:text-[13.5px] text-[#a8b0d8] transition-all duration-400 hover:border-[#5b8af5]/45 hover:text-white"
                >
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* HOSTS */}
      <section className="py-12 md:py-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-[#5b8af5]/60" />
              <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#98a1cf]">The People Behind It</span>
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-[#5b8af5]/60" />
            </div>
            <h2 className="font-display font-normal text-[32px] sm:text-[44px] md:text-[60px] text-center mb-12 md:mb-20 tracking-[-0.02em] leading-[1.08] text-[#eef0ff] text-balance">
              Built by people who&rsquo;ve{' '}
              <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">lived this work.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="rounded-[18px] md:rounded-[24px] border border-white/[0.08] bg-[#0b0d22]/45 backdrop-blur-xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12 items-start mb-5 md:mb-6 hover:border-[#3b6fe8]/[0.32] transition-colors">
              <div className="w-24 h-24 md:w-[140px] md:h-[140px] rounded-full bg-[#161933] border border-[#5b8af5]/25 flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_40px_rgba(59,111,232,0.22)]">
                <img src="/tf.jpg" alt="Dr. Travis Fox" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="font-ui text-[9px] md:text-[10px] font-medium tracking-[0.26em] uppercase text-[#7e88bb] mb-2.5 md:mb-3">Creator & Lead Architect</div>
                <h3 className="font-display text-[28px] md:text-[38px] leading-[1.1] mb-2 md:mb-3 text-[#eef0ff]">Dr. Travis Fox</h3>
                <div className="font-ui text-[11.5px] md:text-[13px] text-[#7c9efa] font-medium mb-4 md:mb-6 leading-relaxed">PhD in Psychology · Emmy Award Winning Producer · Clinical Hypnotherapist</div>
                <p className="font-ui text-[13.5px] md:text-[15px] text-[#8790bb] leading-[1.75] mb-4 md:mb-5">With over 30 years of experience guiding more than a million individuals, Dr. Travis Fox is the mastermind behind the Identity Architecture™ that powers PersonaForce™. He specializes in decoding how the human nervous system, identity, and decision making function when placed under extreme pressure.</p>
                <p className="font-ui text-[13.5px] md:text-[15px] text-[#8790bb] leading-[1.75]">Drawing from his extensive background in psychology, he translates subconscious processing into field usable frameworks. He doesn't just analyze behavior he engineers the precise system architecture that allows leaders to predict, stabilize, and redirect their responses in real time.</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mt-5 md:mt-6">
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">30+</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Years of experience</div></div>
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">1M+</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Individuals guided</div></div>
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">25+</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Years in pressure fields</div></div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="rounded-[18px] md:rounded-[24px] border border-white/[0.08] bg-[#0b0d22]/45 backdrop-blur-xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 md:gap-12 items-start hover:border-[#3b6fe8]/[0.32] transition-colors">
              <div className="w-24 h-24 md:w-[140px] md:h-[140px] rounded-full bg-[#161933] border border-[#5b8af5]/25 flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_40px_rgba(59,111,232,0.22)]">
                <img src="/mf.jpg" alt="Michelle Fox" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="font-ui text-[9px] md:text-[10px] font-medium tracking-[0.26em] uppercase text-[#7e88bb] mb-2.5 md:mb-3">Co Creator & Integration Lead</div>
                <h3 className="font-display text-[28px] md:text-[38px] leading-[1.1] mb-2 md:mb-3 text-[#eef0ff]">Michelle Fox</h3>
                <div className="font-ui text-[11.5px] md:text-[13px] text-[#7c9efa] font-medium mb-4 md:mb-6 leading-relaxed">Somatic Hypnotherapist · Expert Trauma Navigator · Mapping Practitioner</div>
                <p className="font-ui text-[13.5px] md:text-[15px] text-[#8790bb] leading-[1.75] mb-4 md:mb-5">As the Co Creator of PersonaForce™, Michelle Fox is the Lead Alchemist who integrates Human Identity Architecture™ into practical application. Her rare expertise in somatic and subconscious pattern work allows her to decode the quiet, dangerous state shifts that derail performance under pressure.</p>
                <p className="font-ui text-[13.5px] md:text-[15px] text-[#8790bb] leading-[1.75]">Michelle specializes in translating complex behavioral loops into clear, actionable frameworks. She trains leaders and teams to recognize subtle signs of hypervigilance and collapse ensuring they can navigate high stakes moments without escalating or retreating, while maintaining complete operational control.</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mt-5 md:mt-6">
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">15+</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Years in pattern work</div></div>
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">200+</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Organisations served</div></div>
                  <div><div className="font-display text-[26px] md:text-[36px] text-[#eef0ff] leading-none">98%</div><div className="font-ui text-[10px] md:text-[11.5px] text-[#6d76a3] mt-1.5 md:mt-2">Client retention rate</div></div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="py-14 md:py-24 px-5 md:px-8 border-y border-white/[0.06] flex flex-col items-center">
        <div className="max-w-[1000px] mx-auto w-full">
          <FadeUp>
            <p className="text-center font-ui text-[12.5px] md:text-[14px] text-[#8790bb] mb-10 md:mb-16 max-w-[520px] mx-auto leading-[1.7]">
              Across industries, environments, and pressure levels, the results speak the same language
            </p>
          </FadeUp>
          {/* Divided by hairlines rather than boxed — reads as one continuous record */}
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: "91%", lbl: "Leaders stable within 30 days" },
              { num: "3x", lbl: "Follow Through improvement" },
              { num: "100+", lbl: "Leaders mapped" },
              { num: "98%", lbl: "Client retention" }
            ].map((stat, i) => (
              <FadeUp key={stat.num} delay={i * 110} className="w-full">
                <div className="h-full flex flex-col items-center justify-start text-center px-3 py-6 md:px-6 md:py-4 border-l border-white/[0.07] first:border-l-0 md:border-l">
                  <div className="font-display text-[36px] md:text-[54px] leading-none bg-[linear-gradient(160deg,#ffffff_0%,#7c9efa_75%,#3b6fe8_100%)] bg-clip-text text-transparent">{stat.num}</div>
                  <div className="font-ui text-[10.5px] md:text-[12.5px] text-[#7e88bb] leading-[1.5] mt-3 max-w-[150px]">{stat.lbl}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Slider) */}
      <section className="py-12 md:py-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full flex flex-col items-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-r from-transparent to-[#5b8af5]/60" />
              <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#98a1cf]">In Their Words</span>
              <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-12 bg-gradient-to-l from-transparent to-[#5b8af5]/60" />
            </div>
            <h2 className="font-display font-normal text-[32px] sm:text-[44px] md:text-[60px] text-center mb-12 md:mb-20 tracking-[-0.02em] leading-[1.08] text-[#eef0ff] text-balance">
              Identity level change is{' '}
              <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">impossible to ignore.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={100} className="w-full">
            <div className="relative w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testi, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1 md:px-2">
                    <div className="relative mx-auto flex h-full max-w-[820px] flex-col items-center rounded-[18px] md:rounded-[26px] border border-white/[0.08] bg-[#0b0d22]/45 backdrop-blur-xl p-7 md:p-16 text-center">
                      <p className="font-display text-[19px] md:text-[28px] leading-[1.45] text-[#d8e0ff] mb-7 md:mb-10">
                        &ldquo;{testi.quote}&rdquo;
                      </p>
                      <div className="mt-auto flex items-center gap-2.5 font-ui text-[11.5px] md:text-[13px] font-medium text-[#7e88bb]">
                        <span className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-[#5b8af5]" />
                        {testi.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-10">
                <button 
                  onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="p-2 md:p-2.5 rounded-full border border-white/[0.08] hover:bg-white/5 transition-colors text-[#8790bb] hover:text-white bg-[#0b0d22]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <div className="flex gap-2 md:gap-2.5">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${currentTestimonial === i ? 'bg-[#5b8af5] w-6 md:w-8' : 'bg-white/10 hover:bg-white/30 w-1.5 md:w-2'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                  className="p-2 md:p-2.5 rounded-full border border-white/[0.08] hover:bg-white/5 transition-colors text-[#8790bb] hover:text-white bg-[#0b0d22]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pt-6 pb-12 md:pb-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <div className="relative flex flex-col items-center overflow-hidden rounded-[22px] md:rounded-[32px] border border-[#5b8af5]/25 bg-[#0b0d22]/50 backdrop-blur-2xl p-8 md:p-[76px_64px] text-center shadow-[0_0_80px_rgba(59,111,232,0.12)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5b8af5] to-transparent" />
              <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(59,111,232,0.22),transparent)] blur-[60px]" />

              <div className="relative flex items-center gap-3 md:gap-4 mb-7 md:mb-10">
                <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-10 bg-gradient-to-r from-transparent to-[#5b8af5]/60" />
                <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.3em] text-[#98a1cf]">Run Your Mapping</span>
                <span aria-hidden="true" className="hidden sm:block h-px w-6 md:w-10 bg-gradient-to-l from-transparent to-[#5b8af5]/60" />
              </div>

              <h2 className="relative font-display font-normal text-[30px] sm:text-[40px] md:text-[56px] mb-5 md:mb-8 tracking-[-0.02em] leading-[1.08] text-[#eef0ff] text-balance">
                See who you become<br className="hidden md:block"/>{' '}
                <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">under pressure before pressure decides.</em>
              </h2>
              <p className="relative font-ui text-[14px] md:text-[16.5px] text-[#8790bb] max-w-[600px] mx-auto mb-8 md:mb-12 leading-[1.75]">
                In one call, you'll see the exact architecture beneath your team's performance. The identity drivers, the shadow patterns, the predictable collapse points and a clear path to install the stability that makes performance predictable.
              </p>

              <ul className="relative list-none max-w-[480px] mx-auto mb-9 md:mb-14 text-left flex flex-col w-full">
                {[
                  "Full Identity Architecture™ overview for your context",
                  "Shadow interference pattern identification",
                  "Recommended PersonaForce™ solution path",
                  "No pitch. No pressure. Pure intelligence."
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3.5 border-t border-white/[0.07] py-3.5 font-ui text-[13px] md:text-[14.5px] text-[#a8b0d8]">
                    <span className="h-1 w-1 rounded-full bg-[#5b8af5] shrink-0 mt-2.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/book?source=home"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#5b8af5]/50 bg-[#5b8af5]/[0.1] backdrop-blur-md px-8 py-4 md:px-11 md:py-5 font-ui text-[14.5px] md:text-[16px] font-medium text-[#eef0ff] shadow-[0_0_30px_rgba(59,111,232,0.18)] transition-all duration-400 ease-out hover:border-[#5b8af5] hover:bg-[#5b8af5]/[0.2] hover:text-white hover:shadow-[0_0_60px_rgba(59,111,232,0.55)]"
              >
                <span className="relative grid overflow-hidden">
                  <span className="col-start-1 row-start-1 block transition-transform duration-300 ease-out group-hover:-translate-y-full">Book My PersonaForce™ Mapping Call</span>
                  <span className="col-start-1 row-start-1 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">Book My PersonaForce™ Mapping Call</span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2} />
              </Link>
              <div className="relative font-ui text-[11.5px] md:text-[13px] text-[#7e88bb] mt-5 md:mt-6">
                45 minutes · No cost · Limited to 6 sessions per month
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="flex items-center justify-center gap-2.5 mt-6 md:mt-9 text-center">
              <span className="relative flex h-1.5 w-1.5 shrink-0">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#5b8af5] opacity-75 animate-ping" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#5b8af5]" />
              </span>
              <p className="font-ui text-[12px] md:text-[13.5px] text-[#8790bb]">
                This month: <span className="font-semibold text-[#c3d3ff]">6 mapping sessions remaining</span>. Next availability in June
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 md:py-14 px-5 md:px-8 border-t border-white/[0.06] text-center font-ui text-[11.5px] md:text-[13px] text-[#7e88bb]">
        <div className="max-w-[1000px] mx-auto flex flex-col md:flex-row justify-between items-center gap-5">
          <p>© 2026 PersonaForce™ | All Rights Reserved</p>
          <div className="flex justify-center gap-5 md:gap-8 flex-wrap">
            {[
              { href: '#', label: 'Whitepaper' },
              { href: '/privacy', label: 'Privacy Policy' },
              { href: '/terms', label: 'Terms & Conditions' },
              { href: '#', label: 'Contact' },
            ].map(({ href, label }) => (
              <a key={label} href={href} className="group relative transition-colors duration-300 hover:text-[#eef0ff]">
                {label}
                <span aria-hidden="true" className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-[#5b8af5] transition-transform duration-400 ease-out group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
