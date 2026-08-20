import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import SceneBackground from '../components/SceneBackground';
import homeConfig from '../config/verticals/home';
import { CARD_IMAGES } from '../config/imagery';
import useScrollFx from '../hooks/useScrollFx';
import useStoryScroll from '../hooks/useStoryScroll';

// Nav destinations live in one array so the desktop pill and the fullscreen
// mobile overlay can never drift out of sync.
const NAV_LINKS = [
  { to: '/for-ceos', label: 'For CEOs' },
  { to: '/ai-manager', label: 'AI Manager' },
  { to: '/lawyers', label: 'Lawyers' },
  { to: '/sales-identity', label: 'Sales' },
  { to: '/sales-culture', label: 'Organizations' },
  { to: '/athletes', label: 'Athletes' },
  { to: '/trader', label: 'Traders' },
  { to: '/free-blueprints', label: 'Free Blueprints' },
];

/**
 * Landing — the stacked-card lander.
 *
 * LAYOUT THESIS: the page is a deck of slabs. A DARK rail lets the fixed WebGL
 * constellation show through; a LIGHT rail is opaque and rides UP over the slab
 * above it (negative margin + rounded leading edge + upward shadow + an explicit
 * z-rank). Scrolling reads as surfaces landing on each other.
 *
 * SCROLL THESIS: the hero is a full viewport of TEXT ONLY — on every breakpoint.
 * That empty space is not wasted, it is the stage: scrolling flies the camera
 * through the constellation, and you need room to see it happen.
 *
 * TYPE THESIS: sans-black is the voice you present with; the serif is the voice
 * underneath. The serif appears ONLY on a headline's emphasis clause — the exact
 * words the copy already marks with <em>. The type performs the product's claim.
 */
const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleComingSoon = (e) => {
    e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);
    setToastMessage("Coming Soon!");
    setTimeout(() => setToastMessage(""), 2000);
  };

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // The scroll story: camera journey + section reveals, both anchored to the
  // [data-act] sections below.
  useStoryScroll();

  // ── Scroll choreography ────────────────────────────────────────────────
  // The hero copy pulls BACK as you leave it (scale down, drift up, defocus) and
  // the VSL pushes FORWARD as it arrives. Reading the two as one move: the words
  // recede into the field, and the thing they were describing comes to meet you.
  const heroCopyRef = useRef(null);
  const vslRef = useRef(null);

  useScrollFx(heroCopyRef, (p, el) => {
    el.style.transform = `translate3d(0, ${(-p * 46).toFixed(2)}px, 0) scale(${(1 - p * 0.17).toFixed(4)})`;
    el.style.opacity = String(Math.max(0, 1 - p * 1.25));
    el.style.filter = p > 0.01 ? `blur(${(p * 7).toFixed(2)}px)` : 'none';
  }, 'exit');

  useScrollFx(vslRef, (p, el) => {
    const e = p * p * (3 - 2 * p);   // smoothstep — no linear-ramp cheapness
    el.style.transform = `translate3d(0, ${((1 - e) * 44).toFixed(2)}px, 0) scale(${(0.88 + e * 0.12).toFixed(4)})`;
    el.style.opacity = e.toFixed(3);
  }, 'enter');

  // the fullscreen menu owns the viewport while it is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <div className="min-h-screen bg-[var(--pf-dark-900)] text-[var(--pf-text-on-dark)] font-sans overflow-x-hidden selection:bg-[var(--pf-blue)]/30 selection:text-white">

      {/* The one WebGL scene — fixed behind the whole page at z-0. Dark slabs are
          translucent so it shows through; light slabs are opaque and occlude it. */}
      <SceneBackground config={homeConfig} />

      {/* ANNOUNCE BAR — fixed at top; slides up out of view once scrolled so the nav can take its place with no blank gap */}
      <div className={`fixed top-0 left-0 w-full bg-[var(--pf-blue)] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 z-50 leading-tight transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV — floats bare over the constellation at rest, then condenses into a
          glass pill on scroll. Same "surface that lands on top" language as the slabs. */}
      <nav className={`fixed w-full z-40 flex justify-center px-3 md:px-6 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled ? 'top-2 md:top-3' : 'top-[36px] md:top-[44px]'}`}>
        <div className={`w-full max-w-[1180px] flex justify-between items-center gap-4 transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isScrolled
            ? 'bg-[var(--pf-dark-900)]/92 backdrop-blur-xl border border-white/[0.10] rounded-full py-2.5 pl-5 pr-2.5 md:py-3 md:pl-7 md:pr-3 shadow-[0_8px_32px_rgba(6,8,26,0.28)]'
            : 'bg-transparent border border-transparent rounded-full py-3 px-2 md:py-4 md:px-3'
        }`}>

          <Link to="/" className="flex items-center gap-2 md:gap-2.5 shrink-0 group">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain transition-transform duration-[350ms] group-hover:scale-105" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[var(--pf-text-on-dark)]">
              Persona<span className="text-[var(--pf-blue-lift)]">Force™</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-1 xl:gap-1.5 items-center">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="text-[13px] whitespace-nowrap text-[var(--pf-text-on-dark-2)] hover:text-white px-3 py-2 rounded-full hover:bg-white/[0.07] transition-all duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <Link to="/book?source=home" className="pf-btn pf-btn-sm pf-btn-primary hidden lg:inline-flex">
              Book a Call
            </Link>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[var(--pf-text-on-dark)] bg-white/[0.07] border border-white/[0.09] hover:bg-white/[0.12] transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN MOBILE MENU — takes the whole viewport so the links are big,
          thumb-reachable targets rather than a cramped side drawer. */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden bg-[var(--pf-dark-900)]/97 backdrop-blur-2xl flex flex-col transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center px-5 py-5 border-b border-white/[0.07]">
          <div className="flex items-center gap-2.5">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 rounded-lg object-contain" />
            <div className="text-[15px] font-extrabold tracking-[-0.3px]">
              Persona<span className="text-[var(--pf-blue-lift)]">Force™</span>
            </div>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full text-[var(--pf-text-on-dark)] bg-white/[0.07] border border-white/[0.09]"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setIsMenuOpen(false)}
              // staggered entrance, but only while open — otherwise the closed
              // menu would replay its animation invisibly on every render
              style={{ transitionDelay: isMenuOpen ? `${60 + i * 35}ms` : '0ms' }}
              className={`group flex items-center justify-between py-4 border-b border-white/[0.06] text-[22px] font-bold text-[var(--pf-text-on-dark)] transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {l.label}
              <ArrowRight className="w-5 h-5 text-[var(--pf-text-on-dark-2)] group-hover:text-[var(--pf-blue-lift)] transition-colors" />
            </Link>
          ))}

          <Link
            to="/book?source=home"
            onClick={() => setIsMenuOpen(false)}
            style={{ transitionDelay: isMenuOpen ? `${60 + NAV_LINKS.length * 35}ms` : '0ms' }}
            className={`pf-btn pf-btn-lg pf-btn-primary w-full mt-8 transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Book a Call
          </Link>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[var(--pf-blue)] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold shadow-[0_0_20px_rgba(59,111,232,0.4)] z-[80] animate-[fadeUp_0.3s_ease_both]">
          {toastMessage}
        </div>
      )}

      {/* All page content rides above the fixed constellation canvas */}
      <main className="relative z-10">

        {/* ════════════════════════════════════════════════════════════
            THE DESCENT (acts: surface → load → fracture → cutaway → core)
            ONE continuous dark stage. No card edges between these — the 3D
            state behind them is what separates one beat from the next, so the
            camera journey is never interrupted by an opaque wall.
            ════════════════════════════════════════════════════════════ */}
        <div className="pf-slab-1 relative">

          {/* HERO — text only, a full viewport on EVERY breakpoint. The height is
              the point: it gives the scroll journey room to read before the deck starts. */}
          <section data-act="surface" className="relative min-h-screen [min-height:100svh] flex flex-col items-center justify-center text-center px-5 md:px-8 pt-[104px] md:pt-[140px] pb-28 md:pb-32">
            <div ref={heroCopyRef} className="max-w-[1000px] mx-auto flex flex-col items-center will-change-transform">
              <div data-reveal>
                <div className="pf-eyebrow inline-flex items-center gap-2 bg-[var(--pf-blue)]/[0.16] border border-[var(--pf-blue)]/[0.32] backdrop-blur-md text-[var(--pf-blue-lift)] py-2 px-4 md:px-5 rounded-full mb-6 md:mb-9">
                  Identity Intelligence™ System
                </div>
              </div>

              <div data-reveal>
                {/* The setup is sans-black. The payoff switches to the display serif —
                    same sentence, different voice. That shift is the whole design idea. */}
                <h1 className="pf-h1 text-[var(--pf-text-on-dark)] max-w-[880px] mx-auto mb-5 md:mb-7">
                  You don't have a<br/>performance problem.<br/>
                  <em className="pf-display not-italic text-[var(--pf-blue-lift)] leading-[1.1] inline-block mt-2 md:mt-4">You have an identity problem.</em>
                </h1>
              </div>

              <div data-reveal>
                <p className="pf-lead text-[var(--pf-text-on-dark-2)] max-w-[600px] mx-auto">
                  PersonaForce™ reveals who shows up under pressure—so leaders, teams, athletes and organizations can perform with clarity, consistency and confidence.
                </p>
              </div>
            </div>

            {/* Scroll cue — tells you the hero is a doorway, not a dead end.
                Deliberately wordless: a falling dot says "keep going" without
                adding a single word of copy to the page. */}
            <div className="pf-cue absolute bottom-9 md:bottom-12 left-1/2 -translate-x-1/2" aria-hidden="true">
              <span className="pf-cue-shell"><span className="pf-cue-dot" /></span>
              <svg className="pf-cue-chev" width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
                <path d="M1 1l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </section>

          {/* VSL — its own beat now that the hero is text only. Same order as before. */}
          <section data-act="load" className="pt-4 md:pt-8 pb-16 md:pb-24 px-5 md:px-8">
            <div className="max-w-[900px] mx-auto">
              {/* Driven by scroll, not FadeUp — both write `transform`, so running
                  them together would make them fight over the same property. */}
              <div ref={vslRef} className="w-full max-w-[760px] mx-auto rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[var(--pf-blue)]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)] relative will-change-transform">
                <wistia-player media-id="ey25sbhvm4" aspect="1.7777777777777777"></wistia-player>
              </div>

              <div data-reveal>
                <p className="text-center text-[11px] md:text-[13px] text-[#3a3f60] mt-3 md:mt-5">
                  Watch free · No email required · 12 minutes
                </p>
              </div>

              <div data-reveal>
                <div className="flex justify-center mt-5 md:mt-8">
                  <Link to="/book?source=home" className="pf-btn pf-btn-lg pf-btn-primary">
                    Book My Mapping Session
                  </Link>
                </div>
              </div>

              <div data-reveal>
                <div className="pf-card pf-card-dark flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-2.5 py-3 px-5 md:py-3.5 md:px-6 mx-auto mt-5 md:mt-8 max-w-[480px] text-[12px] md:text-sm font-semibold text-center sm:text-left">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--pf-blue)] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shrink-0 hidden sm:block" />
                  <p className="text-[var(--pf-text-on-dark)]">Mapping sessions this month: <span className="text-[var(--pf-blue-lift)]">6 spots remaining</span></p>
                </div>
              </div>
            </div>
          </section>

        {/* ACT · FRACTURE — the lattice behind this is shearing apart under load.
            Still the dark stage: no slab edge, so the descent reads as one take. */}
        <section data-act="fracture" className="relative text-[var(--pf-text-on-dark)] pt-10 md:pt-16 pb-16 md:pb-24 px-5 md:px-8">
          <div className="pf-act-scrim" aria-hidden="true" />

          <div className="max-w-[1080px] mx-auto w-full relative z-10">

            <div data-reveal>
              <h2 className="pf-h2 text-center mb-10 md:mb-14">
                What is costing you <em className="pf-display not-italic text-[var(--pf-blue-lift)] block sm:inline">results?</em>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5">
              {[
                { role: "Leaders", q: "Why is my team still not executing?" },
                { role: "Sales", q: "Why are deals stalling?" },
                { role: "Athletes", q: "Why does performance change under pressure?" },
                { role: "Organizations", q: "Why does culture break down despite training?" }
              ].map((item, i) => (
                <div key={i} data-reveal className="h-full [perspective:1200px]">
                  <div className="pf-card pf-card-dark pf-card-tilt p-6 md:p-8 relative overflow-hidden group h-full flex flex-col">
                    {/* The face behind the question. The scrim keeps the copy
                        dominant; the image warms and pushes in only on hover, so
                        the card reacts physically instead of sitting passive. */}
                    {CARD_IMAGES[item.role] && (
                      <>
                        <img
                          src={CARD_IMAGES[item.role]}
                          alt=""
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                          className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-[0.24] saturate-[0.35]
                                     transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                     group-hover:opacity-[0.42] group-hover:scale-[1.06]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--pf-dark-900)] via-[var(--pf-dark-900)]/82 to-[var(--pf-dark-900)]/50" />
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--pf-blue)] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10" />
                    <div className="relative z-10 flex items-center gap-2.5 mb-4 md:mb-5">
                      <span className="w-5 h-px bg-[var(--pf-blue-lift)]/45" />
                      <span className="pf-eyebrow text-[var(--pf-blue-lift)]">{item.role}</span>
                    </div>
                    <h3 className="pf-h3 text-[var(--pf-text-on-dark)] relative z-10">{item.q}</h3>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ACT · CUTAWAY — the money beat. This is the one act that pins: the
            camera pierces the outer shell while the rows land. "Most systems"
            stop at the surface; here we visibly go under it. */}
        <section data-act="cutaway" className="relative text-[var(--pf-text-on-dark)] pt-10 md:pt-16 pb-16 md:pb-24 px-5 md:px-8">
          <div className="pf-act-scrim" aria-hidden="true" />
          <div className="max-w-[1080px] mx-auto w-full relative z-10">
            <div data-pin-inner>
              <div data-reveal>
                <h2 className="pf-h2 text-center mb-10 md:mb-14">
                  See what others <em className="pf-display not-italic text-[var(--pf-blue-lift)] block sm:inline">miss.</em>
                </h2>
              </div>

              <div className="flex flex-col max-w-[960px] mx-auto">
                {[
                  { most: "Most systems train behavior.", pf: "PersonaForce™ maps identity." },
                  { most: "Most systems teach communication.", pf: "PersonaForce™ reveals who is communicating." },
                  { most: "Most systems improve skills.", pf: "PersonaForce™ identifies who takes over when pressure arrives." }
                ].map((row, i) => (
                  <div key={i} data-reveal>
                    <div className="group grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 items-center py-6 md:py-8 border-b border-[var(--pf-border-dark)] last:border-0">
                      <p className="pf-lead text-[var(--pf-text-on-dark-2)] text-center md:text-right">{row.most}</p>
                      <div className="hidden md:flex w-9 h-9 rounded-full bg-[var(--pf-blue)]/[0.14] border border-[var(--pf-blue)]/[0.35] items-center justify-center shrink-0 mx-auto transition-colors duration-300 group-hover:bg-[var(--pf-blue)] group-hover:border-[var(--pf-blue)]">
                        <ArrowRight className="w-4 h-4 text-[var(--pf-blue-lift)] transition-colors duration-300 group-hover:text-white" />
                      </div>
                      <p className="pf-h3 text-[var(--pf-text-on-dark)] text-center md:text-left">{row.pf}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ACT · CORE — the camera has arrived at the centre. The nested
            counter-rotating shells are the interior of the same sphere the
            hero looked at from outside. */}
        <section data-act="core" className="relative text-[var(--pf-text-on-dark)] pt-10 md:pt-16 pb-16 md:pb-24 px-5 md:px-8">
          <div className="pf-act-scrim" aria-hidden="true" />
          <div className="max-w-[1080px] mx-auto w-full flex flex-col items-center relative z-10">

            <div data-reveal>
              <h2 className="pf-h2 text-center mb-8 md:mb-12 max-w-[860px] mx-auto">
                Powered by the MindPersonas<sup className="pf-tm">™</sup> <em className="pf-display not-italic text-[var(--pf-blue-lift)]">Human Identity Operating System<sup className="pf-tm">™</sup></em>
              </h2>
            </div>

            <div data-reveal>
              <div className="flex flex-col items-center mb-10 md:mb-14">
                <div className="pf-display text-[52px] md:text-[84px] text-[var(--pf-blue-lift)] leading-none">30+</div>
                <div className="pf-eyebrow text-[var(--pf-text-on-dark-2)] mt-2">Years</div>
              </div>
            </div>

            <div data-reveal>
              <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-[760px] mx-auto">
                {["Corporate", "Athletics", "Leadership", "Sales", "Performance", "Identity Architecture™"].map((tag, i) => (
                  <span key={i} className="bg-white/[0.04] backdrop-blur-md border border-white/[0.09] hover:border-[var(--pf-blue)]/[0.45] hover:bg-white/[0.07] transition-all duration-200 text-[#b0b8e8] text-[13px] md:text-[15px] font-semibold py-2.5 px-5 md:py-3 md:px-6 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* PROOF STRIP — the numbers that back the claim above */}
            <div className="w-full mt-16 md:mt-28 pt-12 md:pt-20 border-t border-white/[0.06]">
              <div data-reveal>
                <p className="text-center text-[13px] md:text-[15px] text-[var(--pf-text-on-dark-2)] mb-8 md:mb-12 max-w-[520px] mx-auto leading-relaxed">
                  Across industries, environments, and pressure levels, the results speak the same language
                </p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
                {[
                  { num: "91%", lbl: "Leaders stable within 30 days" },
                  { num: "3x", lbl: "Follow Through improvement" },
                  { num: "100+", lbl: "Leaders mapped" },
                  { num: "98%", lbl: "Client retention" }
                ].map((stat, i) => (
                  <div key={i} data-reveal className="w-full h-full">
                    <div className="pf-card pf-card-dark py-6 px-3 md:py-8 md:px-5 text-center flex flex-col justify-center h-full">
                      <div className="pf-display text-[30px] md:text-[40px] text-[var(--pf-blue-lift)] leading-none mb-1.5">{stat.num}</div>
                      <div className="text-[10.5px] md:text-[13px] text-[var(--pf-text-on-dark-2)] leading-tight px-1 md:px-2">{stat.lbl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        </div>{/* ── end of the descent ── */}

        {/* ════════════════════════════════════════════════════════════
            ACT · EMERGENCE — you surface out of the system into daylight.
            This is the ONE light slab, and the only card edge in the whole
            descent, so the transition finally carries meaning instead of
            being a texture that fires four times.
            ════════════════════════════════════════════════════════════ */}
        <section data-act="emergence" className="pf-stack pf-stack-light pf-slab-2 relative overflow-hidden bg-[var(--pf-graphite)]/88 backdrop-blur-xl text-[var(--pf-text-on-dark)] pt-20 md:pt-32 pb-16 md:pb-28 px-5 md:px-8">
          <div className="max-w-[1080px] mx-auto w-full">

            <div data-reveal>
              <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <span className="w-6 h-px bg-[var(--pf-blue-lift)]/35" />
                <span className="pf-eyebrow text-[var(--pf-blue-lift)]">The People Behind It</span>
                <span className="w-6 h-px bg-[var(--pf-blue-lift)]/35" />
              </div>
              <h2 className="pf-h2 text-center mb-10 md:mb-14">
                Built by people who've <em className="pf-display not-italic text-[var(--pf-blue-lift)] block sm:inline">lived this work.</em>
              </h2>
            </div>

            <div data-reveal>
              <div className="pf-card pf-card-glass pf-card-static p-6 md:p-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 items-start mb-5 md:mb-6">
                <div className="w-32 h-32 md:w-[200px] md:h-[200px] rounded-full bg-[var(--pf-graphite-card)] border-2 border-[var(--pf-blue)]/[0.35] flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_40px_rgba(59,111,232,0.18)]">
                  <img src="/imagery/tf-560.webp" alt="Dr. Travis Fox" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <div className="pf-eyebrow text-[var(--pf-blue-lift)] mb-1.5 md:mb-2">Creator & Lead Architect</div>
                  <h3 className="pf-display text-[25px] md:text-[33px] mb-1 md:mb-2 text-[var(--pf-text-on-dark)] leading-[1.15]">Dr. Travis Fox</h3>
                  <div className="text-[12px] md:text-[14px] text-[var(--pf-blue-lift)] font-semibold mb-3 md:mb-5 leading-tight">PhD in Psychology · Emmy Award Winning Producer · Clinical Hypnotherapist</div>
                  <p className="text-[14.5px] md:text-[16px] text-[var(--pf-text-on-dark-2)] leading-[1.7] md:leading-[1.75] mb-3 md:mb-4">With over 30 years of experience guiding more than a million individuals, Dr. Travis Fox is the mastermind behind the Identity Architecture™ that powers PersonaForce™. He specializes in decoding how the human nervous system, identity, and decision making function when placed under extreme pressure.</p>
                  <p className="text-[14.5px] md:text-[16px] text-[var(--pf-text-on-dark-2)] leading-[1.7] md:leading-[1.75]">Drawing from his extensive background in psychology, he translates subconscious processing into field usable frameworks. He doesn't just analyze behavior he engineers the precise system architecture that allows leaders to predict, stabilize, and redirect their responses in real time.</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-5 md:gap-10 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/[0.08]">
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">30+</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Years of experience</div></div>
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">1M+</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Individuals guided</div></div>
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">25+</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Years in pressure fields</div></div>
                  </div>
                </div>
              </div>
            </div>

            <div data-reveal>
              <div className="pf-card pf-card-glass pf-card-static p-6 md:p-12 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 md:gap-12 items-start">
                <div className="w-32 h-32 md:w-[200px] md:h-[200px] rounded-full bg-[var(--pf-graphite-card)] border-2 border-[var(--pf-blue)]/[0.35] flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_40px_rgba(59,111,232,0.18)]">
                  <img src="/imagery/mf-560.webp" alt="Michelle Fox" className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left">
                  <div className="pf-eyebrow text-[var(--pf-blue-lift)] mb-1.5 md:mb-2">Co Creator & Integration Lead</div>
                  <h3 className="pf-display text-[25px] md:text-[33px] mb-1 md:mb-2 text-[var(--pf-text-on-dark)] leading-[1.15]">Michelle Fox</h3>
                  <div className="text-[12px] md:text-[14px] text-[var(--pf-blue-lift)] font-semibold mb-3 md:mb-5 leading-tight">Somatic Hypnotherapist · Expert Trauma Navigator · Mapping Practitioner</div>
                  <p className="text-[14.5px] md:text-[16px] text-[var(--pf-text-on-dark-2)] leading-[1.7] md:leading-[1.75] mb-3 md:mb-4">As the Co Creator of PersonaForce™, Michelle Fox is the Lead Alchemist who integrates Human Identity Architecture™ into practical application. Her rare expertise in somatic and subconscious pattern work allows her to decode the quiet, dangerous state shifts that derail performance under pressure.</p>
                  <p className="text-[14.5px] md:text-[16px] text-[var(--pf-text-on-dark-2)] leading-[1.7] md:leading-[1.75]">Michelle specializes in translating complex behavioral loops into clear, actionable frameworks. She trains leaders and teams to recognize subtle signs of hypervigilance and collapse ensuring they can navigate high stakes moments without escalating or retreating, while maintaining complete operational control.</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-5 md:gap-10 mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/[0.08]">
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">15+</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Years in pattern work</div></div>
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">200+</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Organisations served</div></div>
                    <div><div className="pf-display text-[22px] md:text-[29px] text-[var(--pf-text-on-dark)] leading-none">98%</div><div className="text-[10px] md:text-[12px] text-[var(--pf-text-on-dark-2)] mt-1 md:mt-1.5">Client retention rate</div></div>
                  </div>
                </div>
              </div>
            </div>

            {/* TESTIMONIALS (Slider) — same slate slab */}
            <div className="mt-20 md:mt-32">
              <div data-reveal>
                <div className="flex items-center justify-center gap-3 mb-3 md:mb-4">
                <span className="w-6 h-px bg-[var(--pf-blue-lift)]/35" />
                <span className="pf-eyebrow text-[var(--pf-blue-lift)]">In Their Words</span>
                <span className="w-6 h-px bg-[var(--pf-blue-lift)]/35" />
              </div>
                <h2 className="pf-h2 text-center mb-10 md:mb-14">
                  Identity level change is <em className="pf-display not-italic text-[var(--pf-blue-lift)] block sm:inline">impossible to ignore.</em>
                </h2>
              </div>

              <div data-reveal className="w-full">
                <div className="relative w-full overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
                  >
                    {testimonials.map((testi, i) => (
                      <div key={i} className="w-full flex-shrink-0 px-1 md:px-2">
                        <div className="pf-card pf-card-glass pf-card-static p-7 md:p-16 relative flex flex-col h-full items-center text-center mx-auto max-w-[820px]">
                          <p className="pf-display text-[17px] md:text-[23px] text-[var(--pf-text-on-dark)] leading-[1.5] md:leading-[1.55] mb-6 md:mb-8">
                            "{testi.quote}"
                          </p>
                          <div className="text-[11.5px] md:text-[13px] font-semibold text-[var(--pf-text-on-dark-2)] flex items-center gap-2 mt-auto">
                            <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[var(--pf-blue)]" />
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
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] hover:border-[var(--pf-blue)]/40 transition-colors text-[var(--pf-text-on-dark-2)] hover:text-[var(--pf-text-on-dark)]"
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
                          className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${currentTestimonial === i ? 'bg-[var(--pf-blue-deep)] w-6 md:w-8' : 'bg-white/15 hover:bg-white/30 w-1.5 md:w-2'}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                      className="w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.06] hover:border-[var(--pf-blue)]/40 transition-colors text-[var(--pf-text-on-dark-2)] hover:text-[var(--pf-text-on-dark)]"
                      aria-label="Next testimonial"
                    >
                      <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            ACT · REASSEMBLY — the page ends where it began, inside the
            constellation, but the lattice is re-knit denser and brighter
            than in the hero: the system with stability installed.
            ════════════════════════════════════════════════════════════ */}
        <section data-act="reassembly" className="pf-stack pf-stack-dark pf-slab-3 bg-[var(--pf-dark-900)]/80 backdrop-blur-md border-t border-white/[0.08] text-[var(--pf-text-on-dark)] pt-16 md:pt-28 px-5 md:px-8">
          <div className="max-w-[1080px] mx-auto w-full">
            <div data-reveal>
              <div className="pf-card bg-[var(--pf-dark-800)]/80 backdrop-blur-xl border-[var(--pf-blue)]/[0.32] p-6 md:p-[72px_56px] text-center shadow-[0_0_60px_rgba(59,111,232,0.08)] relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--pf-blue)] to-transparent" />

                <div className="pf-eyebrow inline-flex items-center gap-2 bg-[var(--pf-blue)]/[0.18] border border-[var(--pf-blue)]/[0.32] text-[var(--pf-blue-lift)] py-2 px-4 md:px-5 rounded-full mb-5 md:mb-8">
                  Run Your Mapping
                </div>

                <h2 className="pf-display pf-h2 mb-4 md:mb-6 text-[var(--pf-text-on-dark)]">
                  See who you become<br className="hidden md:block"/> under pressure before pressure decides.
                </h2>
                <p className="text-[14px] md:text-[17px] text-[var(--pf-text-on-dark-2)] max-w-[580px] mx-auto mb-6 md:mb-10 leading-[1.65] md:leading-[1.7]">
                  In one call, you'll see the exact architecture beneath your team's performance. The identity drivers, the shadow patterns, the predictable collapse points and a clear path to install the stability that makes performance predictable.
                </p>

                <ul className="list-none max-w-[460px] mx-auto mb-8 md:mb-12 text-left flex flex-col gap-3 w-full">
                  {[
                    "Full Identity Architecture™ overview for your context",
                    "Shadow interference pattern identification",
                    "Recommended PersonaForce™ solution path",
                    "No pitch. No pressure. Pure intelligence."
                  ].map((feature, i) => (
                    <li key={i} className="text-[13px] md:text-[15px] font-medium text-[#b0b8e8] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--pf-blue)] shrink-0 mt-1.5" />
                      <span className="leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link to="/book?source=home" className="pf-btn pf-btn-lg pf-btn-primary w-full sm:w-auto mx-auto">
                  Book My PersonaForce™ Mapping Call
                </Link>
                <div className="text-[11.5px] md:text-[13px] text-[var(--pf-text-on-dark-2)] mt-4 md:mt-5 font-medium">
                  45 minutes · No cost · Limited to 6 sessions per month
                </div>
              </div>
            </div>

            <div data-reveal>
              <div className="pf-card pf-card-dark flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-2.5 py-3 px-5 md:py-4 md:px-6 mx-auto mt-5 md:mt-8 max-w-[500px] text-[12px] md:text-sm font-semibold text-center sm:text-left text-[var(--pf-text-on-dark)]">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--pf-blue)] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shrink-0 hidden sm:block" />
                <p>This month: <span className="text-[var(--pf-blue-lift)]">6 mapping sessions remaining</span></p>
              </div>
            </div>
          </div>

          {/* FOOTER — closes the final slab */}
          <footer className="mt-16 md:mt-28 pt-8 md:pt-10 pb-8 md:pb-10 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[var(--pf-text-on-dark-2)]">
            <div className="max-w-[1080px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2026 PersonaForce™ | All Rights Reserved</p>
              <div className="flex justify-center gap-4 md:gap-7 flex-wrap font-medium">
                <a href="#" onClick={handleComingSoon} className="hover:text-[var(--pf-text-on-dark)] transition-colors">Whitepaper</a>
                <a href="/privacy" className="hover:text-[var(--pf-text-on-dark)] transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-[var(--pf-text-on-dark)] transition-colors">Terms &amp; Conditions</a>
                <a href="#" onClick={handleComingSoon} className="hover:text-[var(--pf-text-on-dark)] transition-colors">Contact</a>
              </div>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default Landing;
