import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import FadeUp from '../components/FadeUp';

/**
 * /freeblueprintthankyou — shown after the free Identity Blueprint form
 * is submitted. Short "your blueprint is on the way" confirmation.
 */
const FreeBlueprintThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Your Blueprint Is On Its Way · PersonaForce™';
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
          <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
          <span className="text-[14px] md:text-[15px] font-extrabold tracking-[-0.3px]">
            Persona<span className="text-[#5b8af5]">Force™</span>
          </span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-5 md:px-8 py-20">
        <FadeUp>
          <div className="max-w-[520px] mx-auto text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.35] shadow-[0_0_36px_rgba(59,111,232,0.3)] mb-8">
              <MailCheck className="w-7 h-7 text-[#5b8af5]" strokeWidth={2.5} />
            </span>

            <h1 className="text-[clamp(30px,6vw,48px)] font-black tracking-[-1px] leading-[1.1]">
              We&rsquo;ve Got Your Details
            </h1>

            <p className="text-[15px] md:text-[17px] text-[#eef0ff]/[0.58] mt-6 leading-[1.7]">
              Thank you. Your responses are in, and our team is preparing your personalised
              PersonaForce™ Identity Blueprint now. We&rsquo;ll send it to your inbox soon.
            </p>

            <p className="text-[13.5px] text-[#eef0ff]/[0.4] mt-5 leading-[1.7]">
              Keep an eye on your email over the next little while — and if you don&rsquo;t see it,
              check your promotions, spam, or updates folder.
            </p>

            <Link
              to="/"
              className="inline-flex items-center justify-center mt-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] text-white px-6 py-3.5 rounded-[10px] text-[14px] font-semibold transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </FadeUp>
      </main>

      <footer className="px-5 md:px-8 py-10 border-t border-white/[0.06]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11px] text-[#eef0ff]/[0.2]">
            © {new Date().getFullYear()} PersonaForce™ · All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FreeBlueprintThankYou;
