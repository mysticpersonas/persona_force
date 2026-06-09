import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Check, ArrowLeft } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import FormModal from '../components/FormModal';

const FREE_PROFILE_FORM = { id: "Ine3CsP62NEDVDJiaaMp", title: "Jury Analyzer", height: 956 };

/* IMAGES — local in /public/jury (swap by overwriting, keep names) */
const IMG = {
  hero: "/jury/hero.jpg",
  vsCalm: "/jury/vs-calm.jpg",
  vsSim: "/jury/vs-sim.jpg",
  research: "/jury/research.jpg",
  attorneysBg: "/jury/attorneys-bg.jpg",
  highstakesBg: "/jury/highstakes-bg.jpg",
};

const CARDS = [
  { img: "/jury/card-mapping.jpg", title: "Juror Identity Mapping", desc: "Reveal how each juror responds to pressure, authority, and group influence before deliberation begins." },
  { img: "/jury/card-deliberation.jpg", title: "Deliberation Dynamics", desc: "Understand how jurors communicate, persuade, resist influence, and shift positions inside the jury room." },
  { img: "/jury/card-influence.jpg", title: "Influence Architecture", desc: "Identify who leads, who persuades, who withdraws, and who ultimately shapes the verdict." },
  { img: "/jury/card-verdict.jpg", title: "Verdict Stability", desc: "Predict how group pressure, emotional triggers, and authority response affect the final outcome." },
];

const LAYERS = ["Decision Persona", "Authority Persona", "Group Influence Persona", "Emotional Trigger Persona", "Pressure Shift Persona"];
const REVEALS = ["who leads deliberation", "who flips votes", "who persuades the room", "who collapses under pressure", "who anchors the final verdict"];

const ATTORNEYS_GET = [
  { title: "Juror Identity Profiles", desc: "Deep psychological profiles of potential jurors." },
  { title: "Deliberation Role Mapping", desc: "Predicts who becomes the leader, persuader, or holdout." },
  { title: "Influence Network Modeling", desc: "Shows how jurors influence each other." },
  { title: "Emotional Trigger Mapping", desc: "What narratives move the room." },
  { title: "Authority Response Modeling", desc: "Who trusts experts, judges, or lawyers." },
];

const USED_FOR = ["catastrophic injury cases", "corporate litigation", "class actions", "medical malpractice", "high exposure civil trials"];

const NAV_LINKS = [
  { label: "For CEOs", to: "/for-ceos" },
  { label: "AI Manager", to: "/book" },
  { label: "Lawyers", to: "/lawyers", active: true },
  { label: "Sales Identity", to: "/sales-identity" },
  { label: "Sales & Culture", to: "/sales-culture" },
  { label: "Athletes", to: "/athletes" },
  { label: "Free Blueprints", to: "/free-blueprints" },
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

// Reusable "PersonaForce VS X" visual — two images with a VS badge in the middle
const VsCard = ({ leftLabel, rightLabel, leftCaption, rightCaption }) => (
  <div className="relative rounded-[18px] overflow-hidden border border-white/[0.07] shadow-[0_0_40px_rgba(59,111,232,0.1)] aspect-[16/10]">
    <div className="grid grid-cols-2 h-full">
      <div className="relative bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
        <img src={IMG.vsCalm} alt={leftLabel} onError={imgFallback} className="w-full h-full object-cover [filter:brightness(0.7)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/85 via-[#06081a]/10 to-[#06081a]/40" />
        <div className="absolute top-4 left-0 right-0 text-center text-[12px] md:text-[14px] font-bold text-white tracking-[-0.2px] px-2">{leftLabel}</div>
        {leftCaption && <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] md:text-[11px] text-[#5b8af5] font-semibold uppercase tracking-[0.1em]">{leftCaption}</div>}
      </div>
      <div className="relative bg-gradient-to-br from-[#161616] to-[#222]">
        <img src={IMG.vsSim} alt={rightLabel} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(100%)_brightness(0.5)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/85 via-[#06081a]/10 to-[#06081a]/40" />
        <div className="absolute top-4 left-0 right-0 text-center text-[12px] md:text-[14px] font-bold text-[#eef0ff]/70 tracking-[-0.2px] px-2">{rightLabel}</div>
        {rightCaption && <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] md:text-[11px] text-[#eef0ff]/40 font-semibold uppercase tracking-[0.1em]">{rightCaption}</div>}
      </div>
    </div>
    {/* VS badge */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#06081a] border border-[#3b6fe8]/[0.4] flex items-center justify-center text-[12px] md:text-[13px] font-black text-[#5b8af5] shadow-[0_0_24px_rgba(59,111,232,0.4)]">VS</div>
  </div>
);

const JuryAnalysis = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeForm, setActiveForm] = useState(null);

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

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      {/* ANNOUNCE BAR */}
      <div className="bg-[#3b6fe8] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 relative z-50 leading-tight">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV */}
      <nav className={`fixed top-[36px] md:top-[44px] w-full z-40 transition-all duration-300 flex justify-center border-b border-white/[0.06] ${isScrolled ? 'bg-[#06081a] md:bg-[#06081a]/95 md:backdrop-blur-md py-3 md:py-4' : 'bg-[#06081a] py-3 md:py-5'}`}>
        <div className="w-full max-w-[1140px] px-5 md:px-8 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force®</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            {NAV_LINKS.map((l) => l.to ? (
              <Link key={l.label} to={l.to} className={`text-[13px] whitespace-nowrap transition-colors ${l.active ? 'text-[#5b8af5] font-semibold' : 'text-[#7a7fa8] hover:text-white'}`}>{l.label}</Link>
            ) : (
              <a key={l.label} href="#" onClick={showToast} className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">{l.label}</a>
            ))}
          </div>

          <div className="flex items-center gap-3.5 md:gap-4 shrink-0">
            <Link to="/book" className="hidden lg:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">Book a Call</Link>
            <button className="lg:hidden text-[#7a7fa8] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}><Menu className="w-5 h-5" /></button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay + drawer */}
      <div className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})` }} />
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
              Pathway 01 · Jury Analysis
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,54px)] font-black leading-[1.06] tracking-[-1px] text-white mb-5 max-w-[760px] mx-auto">
              Most Jury Analysis Stops At <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">Demographics.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.6] max-w-[560px] mx-auto leading-[1.85]">
              We analyze identity. Traditional systems simulate <strong className="text-white">what jurors think.</strong> Persona Architecture reveals <strong className="text-white">how they decide under pressure.</strong> Because verdicts are not statistical. They are psychological.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 mt-8 max-w-[320px] sm:max-w-none mx-auto">
              <ConsultBtn />
              <button onClick={() => setActiveForm(FREE_PROFILE_FORM)} className="inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.16] text-[#eef0ff] px-6 py-3.5 rounded-[10px] text-[13px] font-semibold transition-colors">
                Free Profile
              </button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* PROBLEM WITH TRADITIONAL SIMULATION */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp><VsCard leftLabel="PersonaForce" rightLabel="Simulators" leftCaption="maps identity" rightCaption="simulates" /></FadeUp>
          <FadeUp delay={100}>
            <div>
              <h2 className="text-[clamp(20px,2.8vw,28px)] font-black leading-[1.18] tracking-[-0.4px] mb-4">
                The Problem With Traditional <em className="text-[#5b8af5] not-italic">Jury Simulation.</em>
              </h2>
              <p className="text-[12.5px] font-bold text-white mb-2.5">Most platforms analyze:</p>
              <div className="flex flex-col gap-2 mb-5">
                {["demographics", "political attitudes", "case opinions"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-[13px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div>
                ))}
              </div>
              <p className="text-[12.5px] font-bold text-white mb-2.5">But verdicts are determined by:</p>
              <div className="flex flex-col gap-2 mb-5">
                {["identity under pressure", "influence inside deliberation", "emotional triggers", "authority response", "group dynamics"].map((t) => (
                  <div key={t} className="flex items-center gap-2.5 text-[13px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div>
                ))}
              </div>
              <div className="bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[12px] p-4 md:p-5">
                <p className="text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.6]">The real question isn't: <strong className="text-white">What does this juror believe?</strong></p>
                <p className="text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.6] mt-1.5">It's: <strong className="text-white">Who does this juror become when the room turns tense?</strong></p>
              </div>
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

      {/* JUROR IDENTITY ARCHITECTURE */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">The System</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black text-center leading-[1.12] tracking-[-0.5px] mb-3">
              Introducing Juror Identity <em className="text-[#5b8af5] not-italic">Architecture™</em>
            </h2>
            <p className="text-[14px] text-[#eef0ff]/[0.58] text-center max-w-[620px] mx-auto mb-10 leading-[1.8]">
              PersonaForce is a 4-layer system that stabilizes performance under pressure by training execution, leadership, and culture — not just tactics.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[820px] mx-auto">
            <FadeUp>
              <div className="h-full bg-white/[0.04] border border-white/[0.07] rounded-[16px] p-6 md:p-7">
                <div className="text-[12.5px] font-bold text-white mb-4">Our system profiles jurors across <span className="text-[#5b8af5]">five psychological layers</span>:</div>
                <div className="flex flex-col gap-2.5">
                  {LAYERS.map((t) => <div key={t} className="flex items-center gap-2.5 text-[13px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div>)}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="h-full bg-white/[0.04] border border-white/[0.07] rounded-[16px] p-6 md:p-7">
                <div className="text-[12.5px] font-bold text-white mb-4">This reveals:</div>
                <div className="flex flex-col gap-2.5">
                  {REVEALS.map((t) => <div key={t} className="flex items-center gap-2.5 text-[13px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div>)}
                </div>
              </div>
            </FadeUp>
          </div>
          <FadeUp><div className="text-center mt-9"><ConsultBtn /></div></FadeUp>
        </div>
      </section>

      {/* 4 PHOTO CARDS */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {CARDS.map((c, i) => (
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
        </div>
      </section>

      {/* WHAT ATTORNEYS ACTUALLY GET */}
      <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.attorneysBg})` }} />
        <div className="absolute inset-0 bg-[#06081a]/[0.88]" />
        <div className="relative z-[1] max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2">Deliverables</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-2">What Attorneys Actually Get</h2>
            <p className="text-[13px] text-[#eef0ff]/[0.58] mb-8">Before trial you receive:</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[760px]">
            {ATTORNEYS_GET.map((a, i) => (
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
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src={IMG.research} alt="Inside the deliberation room" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(10%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/40 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <h2 className="text-[clamp(20px,2.8vw,28px)] font-black leading-[1.18] tracking-[-0.4px] mb-4">Why This Matters</h2>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8] mb-3">Most jury simulations answer: <span className="text-white">"What verdict will they reach?"</span></p>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8] mb-3">Identity modeling answers: <strong className="text-white">"How the verdict will happen."</strong></p>
              <p className="text-[13.5px] text-[#5b8af5] font-semibold leading-[1.8]">The second is far more powerful.</p>
              <ConsultBtn className="mt-6" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* BUILT FOR HIGH STAKES LITIGATION */}
      <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8 border-y border-white/[0.06]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.highstakesBg})` }} />
        <div className="absolute inset-0 bg-[#06081a]/[0.9]" />
        <div className="relative z-[1] max-w-[1000px] mx-auto">
          <FadeUp>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-2">Built for High Stakes Litigation</h2>
            <p className="text-[13px] text-[#eef0ff]/[0.58] mb-6">Used for:</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[620px] mb-7">
            {USED_FOR.map((t, i) => (
              <FadeUp key={i} delay={i * 60}><div className="flex items-center gap-3 text-[13.5px] text-[#eef0ff]/[0.58]"><CheckBubble />{t}</div></FadeUp>
            ))}
          </div>
          <FadeUp delay={120}>
            <p className="text-[14px] text-white font-semibold leading-[1.7]">When millions are on the line, guesswork costs the case.</p>
            <div className="mt-7"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* THIS IS NOT JURY RESEARCH */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp><VsCard leftLabel="Persona Architecture" rightLabel="Traditional Simulation" leftCaption="maps identity" rightCaption="simulates jurors" /></FadeUp>
          <FadeUp delay={100}>
            <div>
              <h2 className="text-[clamp(20px,2.8vw,28px)] font-black leading-[1.18] tracking-[-0.4px] mb-4">
                This Is Not Jury Research. <em className="text-[#5b8af5] not-italic">It Is Jury Psychology.</em>
              </h2>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.85] mb-2">Traditional systems simulate jurors.</p>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.85] mb-2">Persona Architecture maps their identity.</p>
              <p className="text-[13.5px] text-white font-semibold leading-[1.85]">And identity decides the verdict.</p>
              <ConsultBtn className="mt-6" />
            </div>
          </FadeUp>
        </div>
      </section>

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
              <h2 className="text-[clamp(24px,4vw,40px)] font-black tracking-[-0.5px] mb-3.5">Win the room. <em className="text-[#5b8af5] not-italic">Before you enter it.</em></h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] max-w-[460px] mx-auto mb-7 leading-[1.8]">
                One call is all it takes to see exactly how identity intelligence changes your case preparation, your courtroom strategy, and your outcomes.
              </p>
              <ConsultBtn />
              <div className="text-[11px] text-[#eef0ff]/[0.26] mt-3">No obligation · Built for trial attorneys &amp; legal teams</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FREE PROFILE FORM MODAL */}
      <FormModal form={activeForm} onClose={() => setActiveForm(null)} />

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

export default JuryAnalysis;
