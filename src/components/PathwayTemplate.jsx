import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import FadeUp from './FadeUp';

const NAV_LINKS = [
  { label: "AI Manager", type: "soon" },
  { label: "Lawyers", to: "/lawyers", active: true },
  { label: "Sales Identity", to: "/sales-identity" },
  { label: "Sales & Culture", to: "/sales-culture" },
  { label: "Athletes", to: "/athletes" },
];

const imgFallback = (e) => { e.currentTarget.style.opacity = '0'; };

const ConsultBtn = ({ className = "" }) => (
  <Link to="/book" className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}>
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

const CheckBubble = () => (
  <span className="w-[18px] h-[18px] rounded-full bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5] mt-px">
    <Check className="w-2.5 h-2.5" strokeWidth={3} />
  </span>
);

// Section heading used inside split content blocks
const SplitTitle = ({ a, em }) => (
  <h2 className="text-[clamp(20px,2.8vw,28px)] font-black leading-[1.18] tracking-[-0.4px] mb-4">
    {a} {em && <em className="text-[#5b8af5] not-italic">{em}</em>}
  </h2>
);

// A full-bleed image section with a dark overlay
const BgSection = ({ img, children, overlay = "0.88" }) => (
  <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8 border-y border-white/[0.06]">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
    <div className="absolute inset-0" style={{ background: `rgba(6,8,26,${overlay})` }} />
    <div className="relative z-[1] max-w-[1000px] mx-auto">{children}</div>
  </section>
);

const PathwayTemplate = ({ cfg }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (e) => {
    if (e) e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);
    setToastMessage("Coming Soon!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, [cfg]);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      {/* ANNOUNCE BAR */}
      <div className="bg-[#3b6fe8] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 relative z-50 leading-tight">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV */}
      <nav className={`fixed top-[36px] md:top-[44px] w-full z-40 transition-all duration-300 flex justify-center border-b border-white/[0.06] ${isScrolled ? 'bg-[#06081a] md:bg-[#06081a]/95 md:backdrop-blur-md py-3 md:py-4' : 'bg-[#06081a] py-3 md:py-5'}`}>
        <div className="w-full max-w-[1040px] px-5 md:px-8 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-[7px] md:rounded-lg bg-gradient-to-br from-[#3b6fe8] to-[#7c3bed] flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] fill-white"><path d="M12 2L4 6v6c0 5.5 3.5 10.7 8 12 4.5-1.3 8-6.5 8-12V6l-8-4z"/></svg>
            </div>
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force®</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-5 lg:gap-7 items-center">
            {NAV_LINKS.map((l) => l.to ? (
              <Link key={l.label} to={l.to} className={`text-[13px] whitespace-nowrap transition-colors ${l.active ? 'text-[#5b8af5] font-semibold' : 'text-[#7a7fa8] hover:text-white'}`}>{l.label}</Link>
            ) : (
              <a key={l.label} href="#" onClick={showToast} className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3.5 md:gap-4 shrink-0">
            <Link to="/book" className="hidden md:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">Book a Call</Link>
            <button className="md:hidden text-[#7a7fa8] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + drawer */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end mb-8"><button className="text-[#7a7fa8] hover:text-white" onClick={() => setIsMenuOpen(false)}><X className="w-6 h-6" /></button></div>
        <div className="flex flex-col gap-6">
          {NAV_LINKS.map((l) => l.to ? (
            <Link key={l.label} to={l.to} className={`text-[15px] font-bold ${l.active ? 'text-[#5b8af5]' : 'text-[#eef0ff] hover:text-[#5b8af5]'}`} onClick={() => setIsMenuOpen(false)}>{l.label}</Link>
          ) : (
            <a key={l.label} href="#" onClick={showToast} className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]">{l.label}</a>
          ))}
          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>Book a Call</Link>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3b6fe8] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold shadow-[0_0_20px_rgba(59,111,232,0.4)] z-50 animate-[fadeUp_0.3s_ease_both]">{toastMessage}</div>
      )}

      <div className="pt-[68px] md:pt-[92px]" />

      {/* HERO */}
      <section className="relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${cfg.hero.img})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06081a]/[0.86] via-[#06081a]/[0.72] to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <Link to="/lawyers" className="inline-flex items-center gap-1.5 text-[12px] text-[#7a7fa8] hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-3.5 h-3.5" /> Lawyers
            </Link>
          </FadeUp>
          <FadeUp delay={50}>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              {cfg.pathwayLabel}
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,54px)] font-black leading-[1.06] tracking-[-1px] text-white mb-5 max-w-[760px] mx-auto">
              {cfg.hero.titleA}{' '}
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">{cfg.hero.titleEm}</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.6] max-w-[580px] mx-auto leading-[1.85]">{cfg.hero.body}</p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-8 max-w-[320px] sm:max-w-none mx-auto">
              <ConsultBtn />
              <button onClick={showToast} className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.16] text-[#eef0ff] px-6 py-3.5 rounded-[10px] text-[13px] font-semibold transition-colors">
                {cfg.hero.secondaryLabel}
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* PROBLEM SPLIT */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src={cfg.problem.img} alt={cfg.problem.titleEm} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(20%)_brightness(0.8)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/55 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <SplitTitle a={cfg.problem.titleA} em={cfg.problem.titleEm} />
              {cfg.problem.blocks.map((b, i) => (
                <div key={i} className="mb-5">
                  <p className="text-[12.5px] font-bold text-white mb-2.5">{b.heading}</p>
                  <div className="flex flex-col gap-2">
                    {b.items.map((t) => <div key={t} className="flex items-center gap-2.5 text-[13px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div>)}
                  </div>
                </div>
              ))}
              <div className="bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[12px] p-4 md:p-5 text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.6]">{cfg.problem.callout}</div>
              <ConsultBtn className="mt-6" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* BANNER */}
      <div className="relative overflow-hidden border-y border-[#3b6fe8]/[0.28] bg-gradient-to-br from-[#3b6fe8]/[0.08] to-[#7c3bed]/[0.06] py-14 md:py-16 text-center px-5 md:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[160px] [background:radial-gradient(ellipse,rgba(59,111,232,0.1)_0%,transparent_70%)] pointer-events-none" />
        <FadeUp>
          <div className="relative z-[1] max-w-[1000px] mx-auto">
            <h2 className="text-[clamp(20px,3vw,30px)] font-black tracking-[-0.3px] mb-5">When testimony matters, <em className="text-[#5b8af5] not-italic">behavior matters more.</em></h2>
            <ConsultBtn />
          </div>
        </FadeUp>
      </div>

      {/* INTRO */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">The System</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black text-center leading-[1.12] tracking-[-0.5px] mb-3">
              {cfg.intro.titleA} <em className="text-[#5b8af5] not-italic">{cfg.intro.titleEm}</em>
            </h2>
            <p className="text-[14px] text-[#eef0ff]/[0.58] text-center max-w-[620px] mx-auto mb-9 leading-[1.8]">{cfg.intro.lead}</p>
          </FadeUp>
          <FadeUp delay={80}>
            <div className="max-w-[620px] mx-auto bg-white/[0.04] border border-white/[0.07] rounded-[16px] p-6 md:p-8">
              <div className="text-[12.5px] font-bold text-white mb-4">{cfg.intro.listHeading}</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {cfg.intro.list.map((t) => <div key={t} className="flex items-start gap-2.5 text-[13px] text-[#eef0ff]/[0.58] leading-[1.5]"><CheckBubble />{t}</div>)}
              </div>
            </div>
            <div className="text-center mt-9"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* 4 PHOTO CARDS */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {cfg.cards.map((c, i) => (
            <FadeUp key={i} delay={i * 80}>
              <div className="relative rounded-[14px] overflow-hidden aspect-[3/4] group bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                <img src={c.img} alt={c.title} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(25%)_brightness(0.8)] transition-all duration-[450ms] group-hover:scale-[1.05] group-hover:[filter:grayscale(0%)_brightness(1)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06081a] via-[#06081a]/45 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-[13px] md:text-[14px] font-bold text-white mb-1.5 leading-[1.3]">{c.title}</div>
                  <div className="text-[11px] md:text-[11.5px] text-[#eef0ff]/[0.6] leading-[1.5]">{c.desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* CHECKLIST (bg) — What You Can Prevent / Predict */}
      <BgSection img={cfg.checklist.img}>
        <FadeUp>
          <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-2">{cfg.checklist.title}</h2>
          <p className="text-[13px] text-[#eef0ff]/[0.58] mb-8">{cfg.checklist.lead}</p>
        </FadeUp>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[760px]">
          {cfg.checklist.items.map((a, i) => (
            <FadeUp key={i} delay={i * 70}>
              <div className="h-full flex items-start gap-3 bg-white/[0.04] border border-white/[0.07] rounded-[12px] p-4 transition-colors hover:border-[#3b6fe8]/[0.28]">
                <CheckBubble />
                <div>
                  <div className="text-[13px] font-bold text-white mb-1">{a.title}</div>
                  <div className="text-[12px] text-[#eef0ff]/[0.58] leading-[1.55]">{a.desc}</div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
        <FadeUp><div className="mt-8"><ConsultBtn /></div></FadeUp>
      </BgSection>

      {/* WHY CHANGES (split) */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src={cfg.whyChanges.img} alt={cfg.whyChanges.title} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(10%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/40 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <SplitTitle a={cfg.whyChanges.title} />
              <div className="flex flex-col gap-4 mb-4">
                {cfg.whyChanges.rows.map((r, i) => (
                  <div key={i}>
                    <p className="text-[12.5px] text-[#eef0ff]/[0.58] mb-1">{r.label}</p>
                    <p className="text-[14px] text-white font-semibold leading-[1.5]">{r.value}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-white/[0.07] text-[13px] text-[#eef0ff]/[0.58] leading-[1.75]">{cfg.whyChanges.note}</div>
              <ConsultBtn className="mt-6" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* TRAUMA (bg) — optional */}
      {cfg.trauma && (
        <BgSection img={cfg.trauma.img} overlay="0.85">
          <FadeUp>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-3">{cfg.trauma.title}</h2>
            <p className="text-[13.5px] text-[#eef0ff]/[0.58] max-w-[640px] leading-[1.8] mb-6">{cfg.trauma.lead}</p>
            <p className="text-[12.5px] font-bold text-white mb-3.5">{cfg.trauma.listHeading}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[680px] mb-6">
            {cfg.trauma.list.map((t, i) => (
              <FadeUp key={i} delay={i * 60}><div className="flex items-start gap-3 text-[13px] text-[#eef0ff]/[0.58] leading-[1.5]"><CheckBubble />{t}</div></FadeUp>
            ))}
          </div>
          <FadeUp delay={120}>
            <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8] max-w-[620px]">{cfg.trauma.closing}</p>
            <div className="mt-7"><ConsultBtn /></div>
          </FadeUp>
        </BgSection>
      )}

      {/* BUILT FOR (bg) — optional */}
      {cfg.builtFor && (
        <BgSection img={cfg.builtFor.img} overlay="0.9">
          <FadeUp>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-2">{cfg.builtFor.title}</h2>
            <p className="text-[13px] text-[#eef0ff]/[0.58] mb-6">{cfg.builtFor.lead}</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[620px] mb-7">
            {cfg.builtFor.items.map((t, i) => (
              <FadeUp key={i} delay={i * 60}><div className="flex items-center gap-3 text-[13.5px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div></FadeUp>
            ))}
          </div>
          <FadeUp delay={120}>
            <p className="text-[14px] text-white font-semibold leading-[1.7]">{cfg.builtFor.closing}</p>
            <div className="mt-7"><ConsultBtn /></div>
          </FadeUp>
        </BgSection>
      )}

      {/* THIS IS NOT (split) — optional */}
      {cfg.thisIsNot && (
        <section className="py-16 md:py-24 px-5 md:px-8">
          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <FadeUp>
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                <img src={cfg.thisIsNot.img} alt={cfg.thisIsNot.titleA} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(15%)_brightness(0.82)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/45 to-transparent" />
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div>
                <SplitTitle a={cfg.thisIsNot.titleA} em={cfg.thisIsNot.titleEm} />
                <div className="flex flex-col gap-2 mb-4">
                  {cfg.thisIsNot.rows.map((r, i) => <p key={i} className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.7]">{r}</p>)}
                </div>
                <div className="pt-4 border-t border-white/[0.07] text-[13.5px] text-white font-semibold leading-[1.8]">{cfg.thisIsNot.note}</div>
                <ConsultBtn className="mt-6" />
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      {/* FINAL CTA */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden bg-white/[0.04] border border-[#3b6fe8]/[0.28] rounded-[20px] p-9 md:p-[56px_48px] text-center shadow-[0_0_60px_rgba(59,111,232,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-5">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Ready to begin
              </div>
              <h2 className="text-[clamp(24px,4vw,40px)] font-black tracking-[-0.5px] mb-3.5">
                {cfg.finalCta.titleA} <em className="text-[#5b8af5] not-italic">{cfg.finalCta.titleEm}</em>
              </h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] max-w-[460px] mx-auto mb-7 leading-[1.8]">{cfg.finalCta.body}</p>
              <ConsultBtn />
              <div className="text-[11px] text-[#eef0ff]/[0.26] mt-3">No obligation · Built for trial attorneys &amp; legal teams</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#7a7fa8]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PersonaForce® | All Rights Reserved</p>
          <div className="flex justify-center gap-4 md:gap-7 flex-wrap font-medium">
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PathwayTemplate;
