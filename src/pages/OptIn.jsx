import { useEffect } from 'react';
import { Clock } from 'lucide-react';
import TjHeader from '../components/TjHeader';
import TjFooter from '../components/TjFooter';
import FadeUp from '../components/FadeUp';

/**
 * /opt-in — private page: formal opt-in to the 5-Day Challenge after
 * orientation. Not linked from nav/footer/sitemap; noindex,nofollow.
 */
const OptIn = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Opt-In · The Trader’s Journey';

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
                Founder Pilot, Final Step
              </span>
              <h1 className="text-[clamp(28px,5vw,44px)] font-tj-display font-black uppercase tracking-[0.02em] leading-[1.12] mt-6">
                You Attended. Now Make It Official.
              </h1>
              <p className="text-[15px] md:text-[18px] text-[#ffffff]/[0.58] mt-5 max-w-[520px] mx-auto leading-[1.65]">
                This is your formal opt-in to the 5-Day Trader Identity Challenge™.
              </p>
            </div>
          </FadeUp>

          {/* 3 — INTRO PARAGRAPH */}
          <FadeUp delay={120}>
            <p className="text-[14px] md:text-[15px] text-[#ffffff]/[0.58] leading-[1.85] mt-10 max-w-[540px] mx-auto text-center">
              The orientation showed you what this is. This step confirms you&rsquo;re ready to
              actually do the work. Once you opt in, your place is held and we&rsquo;ll send
              reminders ahead of the first session.
            </p>
          </FadeUp>

          {/* 4 — GHL FORM CARD */}
          <div className="mt-10 md:mt-12 rounded-2xl bg-white/[0.03] border border-white/[0.09] p-1.5 sm:p-3 md:p-4 shadow-[0_0_60px_rgba(0,230,118,0.1)]">
            {/* GHL FORM EMBED GOES HERE — paste iframe code */}
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/CBQMFffcN1pXFxRAK0Dy"
              style={{ width: '100%', minHeight: '621px', border: 'none', borderRadius: '8px', display: 'block' }}
              id="inline-CBQMFffcN1pXFxRAK0Dy"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="PFT - 5-Day Challenge Opt-In Form"
              data-height="621"
              data-layout-iframe-id="inline-CBQMFffcN1pXFxRAK0Dy"
              data-form-id="CBQMFffcN1pXFxRAK0Dy"
              title="PFT - 5-Day Challenge Opt-In Form"
            />
          </div>

          {/* 5 — REASSURANCE LINE */}
          <div className="flex items-center justify-center gap-2 mt-6 text-center">
            <Clock className="w-3.5 h-3.5 text-[#00e676] shrink-0" />
            <p className="text-[13px] text-[#ffffff]/[0.58]">This takes less than a minute.</p>
          </div>
        </div>
      </main>

      {/* 6 — DISCLAIMER */}
      <TjFooter />
    </div>
  );
};

export default OptIn;
