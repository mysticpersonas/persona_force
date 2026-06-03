import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import FadeUp from '../components/FadeUp';
import FormModal from '../components/FormModal';

/* ------------------------------------------------------------------ */
/*  Every free blueprint / profile offered across the site, grouped    */
/*  by the section it lives in. Add a new entry here and it shows up    */
/*  automatically — same card, same modal flow as the section pages.    */
/* ------------------------------------------------------------------ */
const COLLECTIONS = [
  {
    category: "Athletes",
    label: "Collection 01",
    tagline: "Map how identity holds — or fractures — under pressure, sport by sport.",
    to: "/athletes",
    blueprints: [
      { label: "Golfers Blueprint", desc: "Performance identity assessment built for the pressure of the course.", form: { id: "OifLjaajW8n0ohzpfKG4", title: "Golf Performance", height: 3309 } },
      { label: "Baseball Blueprint", desc: "Map composure, reset speed, and clutch consistency at the plate.", form: { id: "sr5wW6EsFdrOrieus4xP", title: "Baseball Assessment", height: 2862 } },
      { label: "Soccer Blueprint", desc: "Reveal the identity that takes over in high-stakes moments on the pitch.", form: { id: "2Bq0rgubPUDckEX0ss3D", title: "Soccer Assessment", height: 2939 } },
    ],
  },
  {
    category: "Lawyers",
    label: "Collection 02",
    tagline: "Free identity profiles for trial, deposition, and witness preparation.",
    to: "/lawyers",
    blueprints: [
      { label: "Jury Analysis", desc: "A free juror identity profile — see who leads, flips, and anchors the verdict.", form: { id: "Ine3CsP62NEDVDJiaaMp", title: "Jury Analyzer", height: 956 } },
      { label: "Witness Identity", desc: "Pressure analysis that prepares a witness for how they respond, not just what they say.", form: { id: "D2Sc4W1jASxKOOsEt6LA", title: "Witness Pressure Analysis", height: 2075 } },
      { label: "Deposition Identity", desc: "Map how a witness thinks, deflects, and breaks before you ever depose them.", form: { id: "rGQd8BoquCp0KMHoh3ir", title: "Deposition Identity Profile", height: 1890 } },
    ],
  },
];

// Reusable primary CTA -> booking flow, with the sliding arrow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book"
    className={`group inline-flex items-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

const FreeBlueprints = () => {
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // Total count for the hero sub-line
  const total = COLLECTIONS.reduce((n, c) => n + c.blueprints.length, 0);

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
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force®</span>
            </div>
          </Link>

          <div className="hidden md:flex gap-5 lg:gap-7 items-center">
            <Link to="/book" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">AI Manager</Link>
            <Link to="/lawyers" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Lawyers</Link>
            <Link to="/sales-identity" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Sales Identity</Link>
            <Link to="/sales-culture" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Sales &amp; Culture</Link>
            <Link to="/athletes" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Athletes</Link>
            <Link to="/free-blueprints" className="text-[13px] whitespace-nowrap text-[#5b8af5] font-semibold transition-colors">Free Blueprints</Link>
          </div>

          <div className="flex items-center gap-3.5 md:gap-4">
            <Link to="/book" className="hidden md:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">
              Book a Call
            </Link>
            <button className="md:hidden text-[#7a7fa8] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
        <div className="flex justify-end mb-8">
          <button className="text-[#7a7fa8] hover:text-white" onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <Link to="/book" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>AI Manager</Link>
          <Link to="/lawyers" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Lawyers</Link>
          <Link to="/sales-identity" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Sales Identity</Link>
          <Link to="/sales-culture" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Sales &amp; Culture</Link>
          <Link to="/athletes" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Athletes</Link>
          <Link to="/free-blueprints" className="text-[15px] font-bold text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Free Blueprints</Link>
          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>
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
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1030] via-[#06081a]/90 to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[240px] [background:radial-gradient(ellipse,rgba(59,111,232,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-6">
              <Sparkles className="w-3 h-3" />
              {total} Free Blueprints · No Cost
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,56px)] font-black leading-[1.05] tracking-[-1px] text-white mb-5 max-w-[760px] mx-auto">
              Every Free Blueprint,<br />
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">In One Place.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] max-w-[560px] mx-auto leading-[1.8]">
              Start mapping identity under pressure for free. Pick the blueprint that fits you — athlete, team, or trial — and get an instant profile. No call required to begin.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
              <ConsultBtn className="justify-center w-full sm:w-auto max-w-[320px]" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* COLLECTIONS — one neat section per category */}
      {COLLECTIONS.map((c, ci) => (
        <section key={c.category} className={`py-14 md:py-20 px-5 md:px-8 ${ci % 2 === 1 ? 'bg-white/[0.02] border-y border-white/[0.07]' : ''}`}>
          <div className="max-w-[1000px] mx-auto">
            <FadeUp>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-10">
                <div>
                  <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2">{c.label}</div>
                  <h2 className="text-[clamp(22px,3.5vw,34px)] font-black leading-[1.12] tracking-[-0.5px]">
                    {c.category} <em className="text-[#5b8af5] not-italic">Blueprints</em>
                  </h2>
                  <p className="text-[13.5px] text-[#eef0ff]/[0.58] leading-[1.7] mt-2.5 max-w-[520px]">{c.tagline}</p>
                </div>
                <Link to={c.to} className="group inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-[#7a7fa8] hover:text-white transition-colors whitespace-nowrap shrink-0">
                  Explore {c.category}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </FadeUp>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 items-stretch">
              {c.blueprints.map((b, bi) => (
                <FadeUp key={b.label} delay={bi * 80} className="h-full">
                  <button
                    onClick={() => setActiveForm(b.form)}
                    className="group h-full w-full flex flex-col items-start text-left bg-white/[0.04] border border-white/[0.07] hover:border-[#3b6fe8]/[0.4] hover:bg-white/[0.07] rounded-[14px] p-5 md:p-6 transition-all"
                  >
                    <div className="flex items-center justify-between w-full mb-3.5">
                      <span className="inline-flex items-center gap-1.5 text-[9.5px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] py-1 px-2.5 rounded-full">
                        <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5]" /> Free
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#5b8af5] shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-[16px] font-black text-white tracking-[-0.2px] mb-2">{b.label}</div>
                    <div className="text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.6]">{b.desc}</div>
                    <div className="mt-auto pt-4 text-[11px] font-semibold text-[#5b8af5] tracking-[0.02em]">Get your free profile →</div>
                  </button>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden bg-white/[0.04] border border-[#3b6fe8]/[0.28] rounded-[20px] p-9 md:p-[56px_48px] text-center shadow-[0_0_60px_rgba(59,111,232,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-5">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Ready to go deeper
              </div>
              <h2 className="text-[clamp(24px,4vw,40px)] font-black tracking-[-0.5px] mb-3.5">
                The Blueprint Is Free.<br /><em className="text-[#5b8af5] not-italic">The Edge Is Earned.</em>
              </h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] max-w-[460px] mx-auto mb-7 leading-[1.8]">
                Run any free blueprint above, then book a call to turn the profile into a stabilized, pressure-tested identity system.
              </p>
              <ConsultBtn />
              <div className="text-[11px] text-[#eef0ff]/[0.26] mt-3">No obligation · Built for athletes, teams &amp; legal teams</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FORM MODAL (blueprint assessments) */}
      <FormModal form={activeForm} onClose={() => setActiveForm(null)} />

      {/* FOOTER (same as home) */}
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

export default FreeBlueprints;
