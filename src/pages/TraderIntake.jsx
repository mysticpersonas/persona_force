import { useEffect } from 'react';
import { Lock } from 'lucide-react';
import TjHeader from '../components/TjHeader';
import TjFooter from '../components/TjFooter';
import FadeUp from '../components/FadeUp';

/**
 * /trader/trader-intake — private page where the trader submits all five
 * days of observations in one GHL form. Not linked from nav/footer/sitemap;
 * noindex,nofollow injected on mount.
 */
const TraderIntake = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Map Intake · The Trader’s Journey';

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    // Re-run GHL's embed script so the inline form auto-resizes on this SPA
    // route (otherwise the iframe keeps a fixed height and scrolls internally).
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-[#ffffff] font-tj-body overflow-x-hidden selection:bg-[#00e676]/30 selection:text-white antialiased">

      <TjHeader />

      <main className="px-4 sm:px-6 md:px-8 py-14 md:py-20">
        <div className="max-w-[700px] mx-auto">

          {/* 2 — HERO */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-[#00e676]/[0.12] border border-[#00e676]/[0.3] text-[#00e676] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00e676] animate-[pulse_1.5s_ease-in-out_infinite]" />
                Founder Pilot, Map Intake
              </span>
              <h1 className="text-[clamp(26px,4.6vw,42px)] font-tj-display font-black uppercase tracking-[0.02em] leading-[1.12] mt-6">
                Complete Your The Trader’s Journey Map Intake
              </h1>
              <p className="text-[15px] md:text-[18px] text-[#ffffff]/[0.58] mt-5 max-w-[560px] mx-auto leading-[1.65]">
                You completed all five days. Now bring your observations together in one place.
              </p>
            </div>
          </FadeUp>

          {/* 3 — INTRO PARAGRAPH */}
          <FadeUp delay={120}>
            <p className="text-[14px] md:text-[15px] text-[#ffffff]/[0.58] leading-[1.85] mt-10 max-w-[600px] mx-auto text-center">
              Over the last five days you collected honest answers about the trader behind your
              trades. This form brings those observations together so Dr. Travis Fox can personally
              review them and prepare your Blueprint Map. Take your time. Answer from what actually
              happened, not what you think should have happened.
            </p>
          </FadeUp>

          {/* 4 — GHL FORM CARD (no entrance animation on the form itself) */}
          <div className="mt-10 md:mt-12 rounded-2xl bg-white/[0.03] border border-white/[0.09] p-1.5 sm:p-3 md:p-4 shadow-[0_0_60px_rgba(0,230,118,0.1)]">
            {/* GHL FORM EMBED GOES HERE — paste iframe code */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/cDjsEv0yfkBmMHqvXX8E"
              style={{ width: '100%', minHeight: '700px', border: 'none', borderRadius: '8px', display: 'block' }}
              id="inline-cDjsEv0yfkBmMHqvXX8E"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="PFT - Final Intake Form 2 "
              data-height="undefined"
              data-layout-iframe-id="inline-cDjsEv0yfkBmMHqvXX8E"
              data-form-id="cDjsEv0yfkBmMHqvXX8E"
              title="PFT - Final Intake Form 2"
            />
          </div>

          {/* 5 — REASSURANCE LINE */}
          <div className="flex items-center justify-center gap-2 mt-6 text-center">
            <Lock className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
            <p className="text-[13px] text-[#ffffff]/[0.58]">
              Your responses are private and reviewed only by Dr. Travis Fox.
            </p>
          </div>
        </div>
      </main>

      {/* 6 — DISCLAIMER */}
      <TjFooter />
    </div>
  );
};

export default TraderIntake;
