import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import TjHeader from '../components/TjHeader';
import TjFooter from '../components/TjFooter';
import FadeUp from '../components/FadeUp';

/**
 * /trader/intake-thank-you — shown after the Map Intake form is submitted.
 * Short confirmation. Private page (noindex,nofollow), not linked publicly.
 */
const IntakeThankYou = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Thank You · The Trader’s Journey';
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
    <div className="min-h-screen bg-[#0b0f14] text-[#ffffff] font-tj-body overflow-x-hidden selection:bg-[#00e676]/30 selection:text-white antialiased flex flex-col">

      <TjHeader />

      <main className="flex-1 flex items-center justify-center px-5 md:px-8 py-20">
        <FadeUp>
          <div className="max-w-[520px] mx-auto text-center">
            <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00e676]/[0.15] border border-[#00e676]/[0.35] shadow-[0_0_36px_rgba(0,230,118,0.3)] mb-8">
              <Check className="w-7 h-7 text-[#00e676]" strokeWidth={3} />
            </span>

            <h1 className="text-[clamp(30px,6vw,48px)] font-tj-display font-black uppercase tracking-[0.02em] leading-[1.1]">Thank You</h1>

            <p className="text-[15px] md:text-[17px] text-[#ffffff]/[0.58] mt-6 leading-[1.7]">
              Your Map Intake has been received. Dr. Travis Fox will personally review your responses
              and prepare your The Trader’s Journey Blueprint Map.
            </p>

            <p className="text-[13.5px] text-[#ffffff]/[0.4] mt-5 leading-[1.7]">
              Watch your email for the next step.
            </p>

            <Link
              to="/trader"
              className="inline-flex items-center justify-center mt-10 bg-white/[0.05] hover:bg-white/[0.09] border border-white/[0.12] text-white px-6 py-3.5 rounded-[10px] text-[14px] font-semibold transition-colors"
            >
              Back to The Trader’s Journey
            </Link>
          </div>
        </FadeUp>
      </main>

      <TjFooter />
    </div>
  );
};

export default IntakeThankYou;
