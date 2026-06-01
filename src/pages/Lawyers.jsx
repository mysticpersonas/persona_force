import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight, Scale, Target, FileText } from 'lucide-react';
import FadeUp from '../components/FadeUp';

const IMG = {
  hero: "/lawyers/hero.jpg",
};

const PATHS = [
  { key: "jury", label: "Jury Analysis", Icon: Scale, to: "/lawyers/jury-analysis" },
  { key: "witness", label: "Witness Identity", Icon: Target, to: "/lawyers/witness-identity" },
  { key: "deposition", label: "Deposition Identity", Icon: FileText, to: "/lawyers/deposition-identity" },
];

const NAV_LINKS = [
  { label: "AI Manager", type: "soon" },
  { label: "Lawyers", to: "/lawyers", active: true },
  { label: "Sales Identity", to: "/sales-identity" },
  { label: "Sales & Culture", to: "/sales-culture" },
  { label: "Athletes", to: "/athletes" },
];

// Reusable primary CTA -> booking flow, with the sliding arrow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book"
    className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

const Lawyers = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [activePath, setActivePath] = useState("jury");
  const navigate = useNavigate();

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
          {NAV_LINKS.map((l) => l.to ? (
            <Link key={l.label} to={l.to} className={`text-[15px] font-bold ${l.active ? 'text-[#5b8af5]' : 'text-[#eef0ff] hover:text-[#5b8af5]'}`} onClick={() => setIsMenuOpen(false)}>{l.label}</Link>
          ) : (
            <a key={l.label} href="#" onClick={showToast} className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]">{l.label}</a>
          ))}
          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3b6fe8] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold shadow-[0_0_20px_rgba(59,111,232,0.4)] z-50 animate-[fadeUp_0.3s_ease_both]">
          {toastMessage}
        </div>
      )}

      <div className="pt-[68px] md:pt-[92px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06081a]/[0.82] via-[#06081a]/[0.66] to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.04)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              Legal Performance
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,54px)] font-black leading-[1.06] tracking-[-1px] text-white mb-5 max-w-[720px] mx-auto">
              Win the Room Before<br />
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">You Enter It.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="max-w-[620px] mx-auto flex flex-col gap-3">
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                Verdicts aren't decided by facts alone. They're decided by how people respond under pressure — and most attorneys are walking in blind.
              </p>
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                Traditional trial strategy focuses on arguments, evidence, and sequencing. But outcomes are shaped inside the room — through emotional reactions, influence patterns, and identity under stress.
              </p>
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                PersonaForce maps how jurors, witnesses, and opposing parties <em className="italic text-[#eef0ff]/[0.75]">behave when pressure hits</em> — so you don't just present your case... you control how it's received.
              </p>
            </div>
          </FadeUp>

          {/* PATH SELECTOR */}
          <FadeUp delay={300}>
            <div className="mt-9 flex flex-col items-center gap-3">
              <div className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#eef0ff]/[0.26]">Choose your focus area</div>
              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto max-w-[320px] sm:max-w-none">
                {PATHS.map(({ key, label, Icon, to }) => {
                  const active = activePath === key;
                  return (
                    <button
                      key={key}
                      onClick={() => to ? navigate(to) : setActivePath(key)}
                      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-[13px] font-semibold border-[1.5px] transition-all duration-200 ${active
                        ? 'bg-[#3b6fe8]/[0.18] border-[#5b8af5] text-white shadow-[0_0_24px_rgba(59,111,232,0.2)]'
                        : 'bg-white/[0.04] border-white/[0.16] text-[#eef0ff] hover:bg-[#3b6fe8]/[0.12] hover:border-[#3b6fe8]/[0.28]'}`}
                    >
                      <Icon className={`w-4 h-4 ${active ? 'text-[#5b8af5]' : 'text-[#7a7fa8]'}`} />
                      {label}
                      {to && <ArrowRight className="w-3.5 h-3.5 text-[#5b8af5]" />}
                    </button>
                  );
                })}
              </div>
              <ConsultBtn className="mt-2" />
            </div>
          </FadeUp>
        </div>
      </section>

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

export default Lawyers;
