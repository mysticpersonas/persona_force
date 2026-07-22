import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Check, ChevronDown } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import FormModal from '../components/FormModal';

/* ------------------------------------------------------------------ */
/*  IMAGES — swap these with the real assets when provided.            */
/*  Drop files in /public and point each key at e.g. "/athletes-hero.jpg" */
/* ------------------------------------------------------------------ */
const IMG = {
  hero: "/athletes/hero.jpg",
  reality: "/athletes/reality.jpg",
  whyBg: "/athletes/why-bg.jpg",
  diffBg: "/athletes/difference-bg.jpg",
  trackIndividual: "/athletes/track-individual.jpg",
  trackTeam: "/athletes/track-team.jpg",
};

const CAPABILITIES = [
  { img: "/athletes/cap-performance.jpg", title: "Performance Stability", desc: "Reduce performance anxiety and increase clutch consistency when pressure spikes." },
  { img: "/athletes/cap-reset.jpg", title: "Emotional Reset Speed", desc: "Recover faster after mistakes and neutralize emotional volatility in real time." },
  { img: "/athletes/cap-leadership.jpg", title: "Leadership Presence", desc: "Stabilize leadership clarity so decisions stay sharp under stress." },
  { img: "/athletes/cap-cohesion.jpg", title: "Team Cohesion & Culture", desc: "Strengthen team chemistry and build measurable cultural alignment that sustains confidence." },
];

const REVEALS = [
  "Performance Identity™",
  "Competition Identity™",
  "Recovery Identity™",
  "Pressure Identity™",
];

const PRESSURE = [
  "Decision speed drops",
  "Muscle tension rises",
  "Emotional volatility increases",
  "Leadership clarity narrows",
  "Team chemistry destabilizes",
];

const YOULL_SEE = [
  "More confident sales conversations",
  "Cleaner follow-up + pipeline discipline",
  "Less blame, more ownership",
  "Stronger leadership presence in the room",
  "Faster coaching, fewer repeated mistakes",
  "A culture that holds under quota pressure",
];

const TRACK_INDIVIDUAL = [
  "Access flow states faster",
  "Reset emotionally within seconds",
  "Neutralize performance anxiety",
  "Eliminate overthinking",
  "Stabilize confidence without arrogance",
  "Recover identity after injury or slump",
];

const TRACK_TEAM = [
  "Identify persona conflicts",
  "Align leadership structure",
  "Strengthen emotional cohesion",
  "Increase accountability without friction",
  "Build collective identity resilience",
];

const BLUEPRINTS = [
  { label: "Golfers Blueprint", form: { id: "OifLjaajW8n0ohzpfKG4", title: "Golf Performance", height: 3309 } },
  { label: "Baseball Blueprint", form: { id: "sr5wW6EsFdrOrieus4xP", title: "Baseball Assessment", height: 2862 } },
  { label: "Soccer Blueprint", form: { id: "2Bq0rgubPUDckEX0ss3D", title: "Soccer Assessment", height: 2939 } },
];

// Reusable primary CTA -> booking flow, with the sliding arrow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book?source=athletes"
    className={`group inline-flex items-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

// Small accent check bubble
const CheckBubble = ({ size = "sm" }) => (
  <span className={`${size === "sm" ? "w-4 h-4" : "w-5 h-5"} rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5]`}>
    <Check className={size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"} strokeWidth={3} />
  </span>
);

const Athletes = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activeForm, setActiveForm] = useState(null);

  const showToast = (e, msg = "Coming Soon!") => {
    if (e) e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2000);
  };

  // Smooth-scroll the hero "Free Blueprints" button down to the blueprint cards
  const scrollToBlueprints = () => {
    document.getElementById('blueprints')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  // If a hot-linked image fails, hide it so the gradient placeholder behind shows instead
  const imgFallback = (e) => { e.currentTarget.style.opacity = '0'; };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      {/* ANNOUNCE BAR — fixed at top; slides up out of view once scrolled so the nav can take its place with no blank gap */}
      <div className={`fixed top-0 left-0 w-full bg-[#3b6fe8] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 z-50 leading-tight transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV */}
      {/* NAV — sits below the announce bar at rest, then slides up to top-0 on scroll as the bar leaves */}
      <nav className={`fixed w-full z-40 transition-all duration-300 flex justify-center border-b border-white/[0.06] ${isScrolled ? 'top-0 bg-[#06081a] md:bg-[#06081a]/95 md:backdrop-blur-md py-3 md:py-4' : 'top-[36px] md:top-[44px] bg-[#06081a] py-3 md:py-5'}`}>
        <div className="w-full max-w-[1140px] px-5 md:px-8 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force™</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            <Link to="/for-ceos" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">For CEOs</Link>
            <Link to="/ai-manager" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">AI Manager</Link>
            <Link to="/lawyers" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Lawyers</Link>
            <Link to="/sales-identity" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Sales</Link>
            <Link to="/sales-culture" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Organizations</Link>
            <Link to="/athletes" className="text-[13px] whitespace-nowrap text-[#5b8af5] font-semibold transition-colors">Athletes</Link>
            <Link to="/trader" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Traders</Link>
            <Link to="/free-blueprints" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Free Blueprints</Link>
          </div>

          <div className="flex items-center gap-3.5 md:gap-4">
            <Link to="/book?source=athletes" className="hidden lg:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">
              Book a Call
            </Link>
            <button className="lg:hidden text-[#7a7fa8] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex justify-end mb-8">
          <button className="text-[#7a7fa8] hover:text-white" onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <Link to="/for-ceos" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>For CEOs</Link>
          <Link to="/ai-manager" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>AI Manager</Link>
          <Link to="/lawyers" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Lawyers</Link>
          <Link to="/sales-identity" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Sales</Link>
          <Link to="/sales-culture" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Organizations</Link>
          <Link to="/athletes" className="text-[15px] font-bold text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Athletes</Link>
          <Link to="/trader" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Traders</Link>
          <Link to="/free-blueprints" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Free Blueprints</Link>
          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book?source=athletes" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3b6fe8] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold shadow-[0_0_20px_rgba(59,111,232,0.4)] z-50 animate-[fadeUp_0.3s_ease_both]">
          {toastMessage}
        </div>
      )}

      <div className="pt-[68px] md:pt-[92px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06081a]/[0.82] via-[#06081a]/[0.7] to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              Athletes & Performance
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,56px)] font-black leading-[1.05] tracking-[-1px] text-white mb-5 max-w-[760px] mx-auto">
              Discover Who Plays<br />
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">Under Pressure.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] max-w-[560px] mx-auto leading-[1.8]">
              Every athlete has two versions: the one that practices.
            </p>
            <p className="text-[13px] md:text-[14px] text-[#eef0ff]/[0.65] italic max-w-[520px] mx-auto mt-3.5 leading-[1.75]">
              And the one that competes.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col items-center gap-3 mt-7 md:mt-8 w-full">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto max-w-[320px] sm:max-w-none">
                <ConsultBtn className="justify-center w-full sm:w-auto" />
                <button onClick={scrollToBlueprints} className="group inline-flex items-center justify-center gap-2 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.14] text-[#eef0ff] px-6 py-3.5 rounded-[10px] text-[13px] font-medium transition-colors w-full sm:w-auto">
                  Free Blueprints <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </button>
              </div>
            </div>
          </FadeUp>

          {/* BLUEPRINTS (scroll target) */}
          <FadeUp delay={380}>
            <div id="blueprints" className="scroll-mt-28 mt-9 md:mt-12">
              <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-3.5">Free Blueprints</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-[520px] mx-auto">
                {BLUEPRINTS.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => setActiveForm(b.form)}
                    className="group flex items-center justify-between gap-2 bg-white/[0.04] border border-white/[0.07] hover:border-[#3b6fe8]/[0.4] hover:bg-white/[0.07] text-[#eef0ff] px-4 py-3 rounded-[10px] text-[11.5px] font-semibold tracking-[0.04em] uppercase transition-all"
                  >
                    {b.label}
                    <ArrowRight className="w-3.5 h-3.5 text-[#5b8af5] shrink-0 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* VSL */}
      <section className="pb-12 md:pb-20 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <FadeUp>
            <div className="w-full max-w-[760px] mx-auto rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)] relative">
              <wistia-player media-id="08ajejts2l" aspect="1.7777777777777777"></wistia-player>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-center text-[11px] md:text-[13px] text-[#3a3f60] mt-3 md:mt-5">
              Watch free · No email required
            </p>
          </FadeUp>
        </div>
      </section>

      {/* REALITY SPLIT */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src={IMG.reality} alt="Athlete under pressure" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(20%)_brightness(0.8)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/50 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <h2 className="text-[clamp(20px,2.8vw,28px)] font-black leading-[1.18] tracking-[-0.4px] uppercase mb-4">
                The Reality Most<br />Programs Ignore
              </h2>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8] mb-2.5">
                You don't lose games because of conditioning. You don't miss putts because of mechanics. You don't collapse in the fourth quarter because of effort.
              </p>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8]">
                You lose because, under pressure, <strong className="text-white">a different identity takes over.</strong>
              </p>
              <div className="flex flex-col my-4">
                {["The one that hesitates.", "The one that tightens.", "The one that overthinks.", "The one that protects instead of competes."].map((t, i, a) => (
                  <div key={i} className={`flex items-center gap-3 py-2.5 text-[13.5px] text-[#eef0ff]/[0.58] ${i < a.length - 1 ? 'border-b border-white/[0.07]' : ''}`}>
                    <span className="w-[3px] h-3.5 rounded-full bg-[#3b6fe8] shrink-0" />{t}
                  </div>
                ))}
              </div>
              <div className="bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] rounded-[12px] p-4 md:p-5">
                <p className="text-[13px] text-[#eef0ff]/[0.58] leading-[1.7]">Most systems try to motivate the athlete.</p>
                <strong className="text-white block mt-1 text-[14px]">We reprogram the operating system driving the athlete.</strong>
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
            <h2 className="text-[clamp(20px,3vw,30px)] font-black tracking-[-0.3px] mb-5">
              When testimony matters, <em className="text-[#5b8af5] not-italic">behavior matters more.</em>
            </h2>
            <ConsultBtn />
          </div>
        </FadeUp>
      </div>

      {/* WHAT IS PF */}
      <section className="py-16 md:py-24 px-5 md:px-8 bg-white/[0.02] border-b border-white/[0.07]">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">What PersonaForce™ Is</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black text-center leading-[1.12] tracking-[-0.5px] mb-8">
              A Human Identity<br /><em className="text-[#5b8af5] not-italic">Architecture System.</em>
            </h2>
          </FadeUp>
          <div className="max-w-[680px] mx-auto">
            <FadeUp delay={100}>
              <p className="text-[14px] text-[#eef0ff]/[0.58] leading-[1.85] text-center mb-3">
                The PersonaForce framework is built on the MindPersonas<sup className="text-[0.6em] font-bold align-super">™</sup> Human Identity Operating System<sup className="text-[0.6em] font-bold align-super">™</sup> that <strong className="text-white">maps, diagnoses, and aligns the internal identity architecture</strong> for elite athletes, professional teams, and high-stakes leaders.
              </p>
              <p className="text-[14px] text-[#eef0ff]/[0.58] leading-[1.85] text-center mb-6">
                Built on a <strong className="text-white">102-Persona identity framework</strong>, it reveals:
              </p>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REVEALS.map((r, i) => (
                <FadeUp key={i} delay={i * 70}>
                  <div className="h-full flex items-start gap-2.5 bg-white/[0.04] border border-white/[0.07] rounded-[10px] py-3.5 px-4 text-[12.5px] text-[#eef0ff]/[0.58] transition-colors hover:border-[#3b6fe8]/[0.28] hover:bg-white/[0.07]">
                    <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] shrink-0 mt-[6px]" />{r}
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={120}>
              <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.8] text-center mt-6">
                And then we stabilize the system. This is not mindset training.<br />
                <strong className="text-white">This is identity engineering.</strong>
              </p>
              <div className="text-center mt-7"><ConsultBtn /></div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CAPABILITIES PHOTO CARDS */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">What Gets Installed</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black text-center leading-[1.12] tracking-[-0.5px] mb-10">
              Four capabilities.<br className="sm:hidden" /> <em className="text-[#5b8af5] not-italic">One stable identity.</em>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {CAPABILITIES.map((c, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="relative rounded-[14px] overflow-hidden aspect-[3/4] group bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                  <img src={c.img} alt={c.title} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(25%)_brightness(0.78)] transition-all duration-[450ms] group-hover:scale-[1.05] group-hover:[filter:grayscale(0%)_brightness(1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06081a] via-[#06081a]/40 to-transparent" />
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

      {/* WHY IT WORKS */}
      <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.whyBg})` }} />
        <div className="absolute inset-0 bg-[#06081a]/[0.88]" />
        <div className="relative z-[1] max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2">Why It Works</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-4">
              Why It Works At<br />The Highest Levels
            </h2>
            <p className="text-[13.5px] text-[#eef0ff]/[0.58] max-w-[640px] leading-[1.8] mb-4">
              PersonaForce Sales &amp; Culture Training aligns your team around one standard of execution so performance stays consistent even when pressure rises.
            </p>
            <p className="text-[13.5px] text-[#eef0ff]/[0.58] max-w-[640px] leading-[1.85] mb-6">
              <strong className="text-white">Pressure is universal.</strong> From the PGA Tour to Division I basketball, from professional football to international soccer to professional bodybuilding — the nervous system does not care about the league. <strong className="text-white">It responds to perceived threat.</strong>
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
            <FadeUp delay={80}>
              <div className="bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[12px] p-5 md:p-6">
                <div className="text-[12px] font-bold text-white mb-3.5">When pressure spikes:</div>
                <div className="flex flex-col gap-2.5">
                  {PRESSURE.map((p, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-[12.5px] text-[#eef0ff]/[0.58]">
                      <CheckBubble />{p}
                    </div>
                  ))}
                </div>
                <p className="text-[13px] font-bold text-white mt-4">Unless identity is stabilized.</p>
              </div>
            </FadeUp>

            <FadeUp delay={160}>
              <div>
                <p className="text-[11px] text-[#eef0ff]/[0.26] font-bold uppercase tracking-[0.1em] mb-3">You'll See:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {YOULL_SEE.map((y, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.5]">
                      <CheckBubble />{y}
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={200}>
            <div className="mt-8"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* INDIVIDUAL vs TEAMS */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">Who It's For</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black text-center leading-[1.12] tracking-[-0.5px] mb-10">
              Built for the individual.<br /><em className="text-[#5b8af5] not-italic">Engineered for the team.</em>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch">
            {[
              { img: IMG.trackIndividual, label: "Track 01", title: "For Individual Athletes", intro: "You don't need more hype. You need internal stability. PersonaForce™ helps elite performers:", list: TRACK_INDIVIDUAL, close: ["Because slumps aren't mechanical.", "They're identity disruptions."] },
              { img: IMG.trackTeam, label: "Track 02", title: "For Teams & Franchises", intro: "Talent without identity alignment creates ego clashes, locker room fragmentation, leadership inconsistency, emotional contagion, and momentum instability. PersonaForce™ maps team identity architecture to:", list: TRACK_TEAM, close: ["Aligned identity creates predictable chemistry.", "Predictable chemistry wins championships."] },
            ].map((t, i) => (
              <FadeUp key={i} delay={i * 100} className="h-full">
                <div className="h-full flex flex-col rounded-[16px] overflow-hidden border border-white/[0.07] bg-white/[0.04] transition-colors hover:border-[#3b6fe8]/[0.28]">
                  <div className="h-[180px] overflow-hidden group bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                    <img src={t.img} alt={t.title} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(15%)_brightness(0.72)] transition-all duration-[450ms] group-hover:[filter:grayscale(0%)_brightness(0.9)] group-hover:scale-[1.04]" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2">{t.label}</div>
                    <div className="text-[16px] font-black text-white mb-2.5 tracking-[-0.2px]">{t.title}</div>
                    <div className="text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.75] mb-4">{t.intro}</div>
                    <div className="flex flex-col gap-2 mb-4">
                      {t.list.map((item, ii) => (
                        <div key={ii} className="flex items-start gap-2.5 text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.5]">
                          <CheckBubble />{item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-white/[0.07] text-[12.5px] text-[#eef0ff]/[0.58] italic leading-[1.6]">
                      {t.close[0]}<br /><strong className="text-white not-italic">{t.close[1]}</strong>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* THE DIFFERENCE */}
      <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.diffBg})` }} />
        <div className="absolute inset-0 bg-[#06081a]/[0.9]" />
        <div className="relative z-[1] max-w-[1000px] mx-auto text-center">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2">The Difference</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px] mb-8">
              The <em className="text-[#5b8af5] not-italic">Difference.</em>
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 max-w-[620px] mx-auto items-stretch text-left">
            <FadeUp>
              <div className="h-full bg-white/[0.03] border border-white/[0.07] rounded-[14px] p-6">
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#eef0ff]/[0.26] mb-3.5">Most systems focus on:</div>
                <div className="flex flex-col">
                  {["Tactics", "Strength training", "Sports psychology", "Motivation"].map((d, i, a) => (
                    <div key={i} className={`text-[13px] text-[#eef0ff]/[0.58] py-2.5 ${i < a.length - 1 ? 'border-b border-white/[0.07]' : ''}`}>{d}</div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div className="h-full bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] rounded-[14px] p-6 flex flex-col">
                <div className="text-[10px] font-bold tracking-[0.14em] uppercase text-[#5b8af5] mb-3.5">PersonaForce™ focuses on:</div>
                <div className="flex-1 flex items-center">
                  <div className="text-[18px] md:text-[20px] font-black text-white leading-[1.25] tracking-[-0.3px]">Identity under pressure.</div>
                </div>
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={120}>
            <div className="max-w-[520px] mx-auto mt-8 text-[13px] text-[#eef0ff]/[0.58] leading-[1.85]">
              Because behavior changes when identity stabilizes.<br />
              <strong className="text-white block text-[14px] mt-1">And identity stabilizes when it is mapped, understood, and architected.</strong>
            </div>
            <div className="mt-8"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden bg-white/[0.04] border border-[#3b6fe8]/[0.28] rounded-[20px] p-9 md:p-[56px_48px] text-center shadow-[0_0_60px_rgba(59,111,232,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-5">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Ready to begin
              </div>
              <h2 className="text-[clamp(24px,4vw,40px)] font-black tracking-[-0.5px] mb-3.5">
                Identity Stabilizes.<br /><em className="text-[#5b8af5] not-italic">Performance Follows.</em>
              </h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] max-w-[440px] mx-auto mb-7 leading-[1.8]">
                One call is all it takes to see the exact identity patterns holding your performance back — and the path to stability that holds under the brightest lights.
              </p>
              <ConsultBtn />
              <div className="text-[11px] text-[#eef0ff]/[0.26] mt-3">No obligation · Built for elite athletes &amp; teams</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FORM MODAL (blueprint assessments) */}
      <FormModal form={activeForm} onClose={() => setActiveForm(null)} />

      {/* FOOTER (same as home) */}
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#7a7fa8]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PersonaForce™ | All Rights Reserved</p>
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

export default Athletes;
