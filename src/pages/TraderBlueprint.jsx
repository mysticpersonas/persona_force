import { useEffect } from 'react';
import { Check, Lock } from 'lucide-react';
import TjHeader from '../components/TjHeader';
import TjFooter from '../components/TjFooter';
import FadeUp from '../components/FadeUp';

const VALUE = [
  'A snapshot of your dominant trader identity pattern',
  'The pressure response most likely to hijack your decisions',
  'The first interruption point to start working on',
  'Delivered privately to your inbox',
];

/**
 * /trader/blueprint — free lead-gen page: request the free Trader Blueprint.
 * Private (noindex,nofollow), not linked from nav/footer/sitemap.
 */
const TraderBlueprint = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Free Trader Blueprint · The Trader’s Journey';

    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);

    // Re-run GHL's embed script so the inline form auto-resizes on this SPA route.
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
        <div className="max-w-[600px] mx-auto">

          {/* 2 — HERO */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-[#00e676]/[0.12] border border-[#00e676]/[0.3] text-[#00e676] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00e676] animate-[pulse_1.5s_ease-in-out_infinite]" />
                Free Trader Blueprint
              </span>
              <h1 className="text-[clamp(28px,5vw,44px)] font-tj-display font-black uppercase tracking-[0.02em] leading-[1.12] mt-6">
                See the Trader Behind Your Trades
              </h1>
              <p className="text-[15px] md:text-[18px] text-[#ffffff]/[0.58] mt-5 max-w-[520px] mx-auto leading-[1.65]">
                A free snapshot of the identity patterns quietly shaping your trading decisions.
              </p>
            </div>
          </FadeUp>

          {/* 3 — DESCRIPTION */}
          <FadeUp delay={120}>
            <p className="text-[14px] md:text-[15px] text-[#ffffff]/[0.58] leading-[1.85] mt-10 max-w-[540px] mx-auto text-center">
              Most traders never see the pattern underneath their decisions. Your free Blueprint gives
              you a first look at the version of you that shows up under pressure, the loops that keep
              repeating, and where discipline tends to break, built on the same identity framework
              behind the full The Trader’s Journey Map.
            </p>
          </FadeUp>

          {/* value list */}
          <FadeUp delay={160}>
            <div className="mt-9 max-w-[440px] mx-auto flex flex-col gap-3.5">
              {VALUE.map((line) => (
                <div key={line} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#00e676]/15 border border-[#00e676]/40 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#00e676]" strokeWidth={3} />
                  </span>
                  <p className="text-[14px] text-[#ffffff]/[0.8] leading-[1.55]">{line}</p>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* 4 — FORM CARD */}
          <div className="mt-10 md:mt-12 rounded-2xl bg-white/[0.03] border border-white/[0.09] p-1.5 sm:p-3 md:p-4 shadow-[0_0_60px_rgba(0,230,118,0.1)]">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/MOrE94PHZZ8RrjrbpRGV"
              style={{ width: '100%', minHeight: '624px', border: 'none', borderRadius: '8px', display: 'block' }}
              id="inline-MOrE94PHZZ8RrjrbpRGV"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="PFT Free Blueprint"
              data-height="624"
              data-layout-iframe-id="inline-MOrE94PHZZ8RrjrbpRGV"
              data-form-id="MOrE94PHZZ8RrjrbpRGV"
              title="PFT Free Blueprint"
            />
          </div>

          {/* 5 — REASSURANCE LINE */}
          <div className="flex items-center justify-center gap-2 mt-6 text-center">
            <Lock className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
            <p className="text-[13px] text-[#ffffff]/[0.58]">Free. Takes under two minutes. No spam.</p>
          </div>
        </div>
      </main>

      {/* 6 — DISCLAIMER */}
      <TjFooter />
    </div>
  );
};

export default TraderBlueprint;
