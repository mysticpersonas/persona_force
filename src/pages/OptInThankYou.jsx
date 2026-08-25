import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import FadeUp from '../components/FadeUp';

/**
 * /opt-in-thank-you — shown after the 5-Day Challenge opt-in form is submitted.
 * Short confirmation. Private page (noindex,nofollow), not linked publicly.
 */
const OptInThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'You’re In · PersonaForce Trader™';
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased flex flex-col">

      {/* mini nav — logo only */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[860px] mx-auto px-5 md:px-8 py-4 flex items-center gap-2.5">
          <img src="/pf_logo.png" alt="PersonaForce Trader" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
          <span className="text-[14px] md:text-[15px] font-extrabold tracking-[-0.3px]">
            Persona<span className="text-[#5b8af5]">Force Trader™</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 md:px-8 py-20">
        <FadeUp>
          <div className="max-w-[520px] mx-auto text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.35] shadow-[0_0_36px_rgba(59,111,232,0.3)] mb-8">
              <Check className="w-7 h-7 text-[#5b8af5]" strokeWidth={3} />
            </span>

            <h1 className="text-[clamp(30px,6vw,48px)] font-display font-normal tracking-[-0.015em] leading-[1.1]">You&rsquo;re In</h1>

            <p className="text-[15px] md:text-[17px] text-[#eef0ff]/[0.58] mt-6 leading-[1.7]">
              Your opt-in is confirmed. The 5-Day Trader Identity Challenge™ has begun, your Day 1
              session is on its way.
            </p>

            <p className="text-[13.5px] text-[#eef0ff]/[0.4] mt-5 leading-[1.7]">
              Check your email for your Day 1 access.
            </p>

            <Link
              to="/trader"
              className="inline-flex items-center justify-center mt-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] text-white px-6 py-3.5 rounded-[10px] text-[14px] font-semibold transition-colors"
            >
              Back to PersonaForce Trader™
            </Link>
          </div>
        </FadeUp>
      </main>

      <footer className="px-5 md:px-8 py-10 border-t border-white/[0.06]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11px] text-[#eef0ff]/[0.2]">
            © {new Date().getFullYear()} PersonaForce Trader™ · Discover the Trader Behind the Trade™
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OptInThankYou;
