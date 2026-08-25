import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import {
  ArrowRight,
  Scale,
  Target,
  FileText
} from 'lucide-react';
import FadeUp from '../components/FadeUp';

const IMG = {
  hero: "/lawyers/hero.jpg",
};

const PATHS = [
  { key: "jury", label: "Jury Analysis", Icon: Scale, to: "/lawyers/jury-analysis" },
  { key: "witness", label: "Witness Identity", Icon: Target, to: "/lawyers/witness-identity" },
  { key: "deposition", label: "Deposition Identity", Icon: FileText, to: "/lawyers/deposition-identity" },
];

// Reusable primary CTA -> booking flow, with the sliding arrow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book?source=lawyers"
    className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

const Lawyers = () => {
  const [activePath, setActivePath] = useState("jury");
  const navigate = useNavigate();

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      <SiteNav />

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
            <h1 className="text-[clamp(30px,5.5vw,54px)] font-display font-normal leading-[1.06] tracking-[-0.015em] text-white mb-6 max-w-[720px] mx-auto">
              Win the Room Before<br />
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">You Enter It.</em>
            </h1>
          </FadeUp>

          {/* VSL */}
          <FadeUp delay={150}>
            <div className="w-full max-w-[760px] mx-auto mb-8 md:mb-10 rounded-[14px] md:rounded-[20px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_70px_rgba(59,111,232,0.2),0_28px_70px_rgba(0,0,0,0.6)]">
              <wistia-player media-id="e4ij9uaujk" aspect="1.7777777777777777"></wistia-player>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="max-w-[620px] mx-auto flex flex-col gap-3">
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                Verdicts aren't decided by facts alone. They're decided by how people respond under pressure, and most attorneys are walking in blind.
              </p>
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                Traditional trial strategy focuses on arguments, evidence, and sequencing. But outcomes are shaped inside the room, through emotional reactions, influence patterns, and identity under stress.
              </p>
              <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85]">
                PersonaForce maps how jurors, witnesses, and opposing parties <em className="italic text-[#eef0ff]/[0.75]">behave when pressure hits</em>, so you don't just present your case... you control how it's received.
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
                      <Icon className={`w-4 h-4 ${active ? 'text-[#5b8af5]' : 'text-[#8790bb]'}`} />
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
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#8790bb]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PersonaForce™ | All Rights Reserved</p>
          <div className="flex justify-center gap-4 md:gap-7 flex-wrap font-medium">
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Whitepaper</a>
            <a href="/privacy" className="hover:text-[#eef0ff] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#eef0ff] transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Lawyers;
