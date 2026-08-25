import { useEffect } from 'react';
import { Lock } from 'lucide-react';
import FadeUp from '../components/FadeUp';

/**
 * /blueprintassessment — step 2 of the free Blueprint flow. After the lead-gen
 * form, the visitor completes the full PersonaForce Identity Assessment here;
 * submitting it sends them to /freeblueprintthankyou.
 */
const BlueprintAssessment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Identity Assessment · PersonaForce™';

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
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased">

      {/* MINI NAV: logo only */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[860px] mx-auto px-5 md:px-8 py-4 flex items-center gap-2.5">
          <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
          <span className="text-[14px] md:text-[15px] font-extrabold tracking-[-0.3px]">
            Persona<span className="text-[#5b8af5]">Force™</span>
          </span>
        </div>
      </header>

      <main className="px-4 sm:px-6 md:px-8 py-14 md:py-20">
        <div className="max-w-[720px] mx-auto">

          {/* HERO */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.3] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite]" />
                Free Identity Blueprint, Last Step
              </span>
              <h1 className="text-[clamp(28px,5vw,44px)] font-black tracking-[-0.8px] leading-[1.12] mt-6">
                Complete Your Identity Assessment
              </h1>
              <p className="text-[15px] md:text-[18px] text-[#eef0ff]/[0.58] mt-5 max-w-[540px] mx-auto leading-[1.65]">
                This is the assessment your Blueprint is built from.
              </p>
            </div>
          </FadeUp>

          {/* INTRO */}
          <FadeUp delay={120}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85] mt-10 max-w-[600px] mx-auto text-center">
              Thanks for registering. Your answers here are what actually shape your Blueprint, the
              hidden patterns behind how you perform, decide, and respond under pressure. Answer
              honestly; there are no right or wrong answers. Once you finish, we&rsquo;ll prepare your
              personalised Blueprint and send it to your inbox.
            </p>
          </FadeUp>

          {/* ASSESSMENT FORM CARD */}
          <div className="mt-10 md:mt-12 rounded-2xl bg-white/[0.03] border border-white/[0.09] p-1.5 sm:p-3 md:p-4 shadow-[0_0_60px_rgba(59,111,232,0.1)]">
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/ANOURMbrKibbBx260uYY"
              style={{ width: '100%', minHeight: '900px', border: 'none', borderRadius: '3px', display: 'block' }}
              id="inline-ANOURMbrKibbBx260uYY"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="PersonaForce Identity Assessment"
              data-height="3749"
              data-layout-iframe-id="inline-ANOURMbrKibbBx260uYY"
              data-form-id="ANOURMbrKibbBx260uYY"
              title="PersonaForce Identity Assessment"
            ></iframe>
          </div>

          {/* REASSURANCE LINE */}
          <div className="flex items-center justify-center gap-2 mt-6 text-center">
            <Lock className="w-3.5 h-3.5 text-[#5b8af5] shrink-0" />
            <p className="text-[13px] text-[#eef0ff]/[0.58]">Private. Answer honestly, there are no right or wrong answers.</p>
          </div>
        </div>
      </main>

      {/* DISCLAIMER */}
      <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06] mt-6">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11.5px] leading-[1.7] text-[#eef0ff]/[0.3]">
            PersonaForce™ is an educational and identity-development experience. It does not provide
            financial, investment, tax, legal, or trading advice.
          </p>
          <p className="text-[11px] text-[#eef0ff]/[0.2] mt-5">
            © {new Date().getFullYear()} PersonaForce™ · All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BlueprintAssessment;
