import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import FadeUp from '../components/FadeUp';

const LOOM_ID = 'cc3203f67bfb451a9d4c7384f6100a7f';

/**
 * /trader/orientation-replay — private replay of the live orientation.
 * Not linked from nav/footer/sitemap; noindex,nofollow.
 */
const OrientationReplay = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = 'Orientation Replay · PersonaForce Trader™';
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
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased">

      {/* 1 — MINI NAV: logo only */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[860px] mx-auto px-5 md:px-8 py-4 flex items-center gap-2.5">
          <img src="/pf_logo.png" alt="PersonaForce Trader" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
          <span className="text-[14px] md:text-[15px] font-extrabold tracking-[-0.3px]">
            Persona<span className="text-[#5b8af5]">Force Trader™</span>
          </span>
        </div>
      </header>

      <main className="px-4 sm:px-6 md:px-8 py-14 md:py-20">
        <div className="max-w-[760px] mx-auto">

          {/* 2 — HERO */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.3] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite]" />
                Founder Pilot, Orientation Replay
              </span>
              <h1 className="text-[clamp(28px,5vw,46px)] font-black tracking-[-0.8px] leading-[1.12] mt-6 max-w-[640px] mx-auto">
                You Missed Live. Here&rsquo;s the Full Orientation.
              </h1>
              <p className="text-[15px] md:text-[18px] text-[#eef0ff]/[0.58] mt-5">
                Everything we covered, on your own time.
              </p>
            </div>
          </FadeUp>

          {/* 3 — INTRO PARAGRAPH */}
          <FadeUp delay={120}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.85] mt-10 max-w-[620px] mx-auto text-center">
              This is the exact orientation we ran live, covering what PersonaForce Trader™ is, what
              the 5-Day Challenge reveals, and why identity, not strategy, is usually the real thing
              standing between a trader and consistency. Watch it now, then join the challenge below.
            </p>
          </FadeUp>

          {/* 4 — LOOM EMBED in a styled card (16:9 via padding-bottom) */}
          <FadeUp delay={160}>
            <div className="mt-10 md:mt-12 rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)]">
              <div style={{ position: 'relative', paddingBottom: '56.25920471281296%', height: 0 }}>
                <iframe
                  src={`https://www.loom.com/embed/${LOOM_ID}`}
                  frameBorder="0"
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allowFullScreen
                  title="PersonaForce Trader Orientation"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>
            </div>
          </FadeUp>

          {/* 5 — FALLBACK (quiet secondary button) */}
          <FadeUp delay={200}>
            <div className="flex flex-col items-center gap-2.5 mt-5">
              <p className="text-[12.5px] text-[#eef0ff]/[0.4]">Video not loading? Watch it directly here:</p>
              <a
                href={`https://www.loom.com/share/${LOOM_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-[#eef0ff]/[0.85] hover:text-white px-4 py-2 rounded-lg text-[12.5px] font-semibold transition-colors"
              >
                Watch on Loom <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </FadeUp>

          {/* 6 — DIVIDER + READY TO BEGIN */}
          <div className="my-14 md:my-20 flex items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.1]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3b6fe8]/50 shrink-0" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.1]" />
          </div>

          <FadeUp>
            <div className="text-center max-w-[560px] mx-auto">
              <h2 className="text-[clamp(24px,4vw,36px)] font-black tracking-[-0.6px]">Ready to Begin?</h2>
              <p className="text-[15px] md:text-[16px] text-[#eef0ff]/[0.58] mt-4 leading-[1.7]">
                Now that you&rsquo;ve seen what this is, it&rsquo;s time to officially join the
                5-Day Trader Identity Challenge™.
              </p>

              {/* 7 — PRIMARY CTA (internal route → smooth SPA navigation to /opt-in) */}
              <div className="mt-8 flex flex-col items-center">
                <Link
                  to="/opt-in"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-8 py-4 rounded-[10px] text-[15px] font-bold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)]"
                >
                  Join the 5-Day Challenge <ArrowRight className="w-4 h-4" />
                </Link>
                {/* 8 — CTA MICROCOPY */}
                <p className="text-[12px] text-[#eef0ff]/[0.38] mt-4">Takes less than a minute.</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </main>

      {/* 9 — DISCLAIMER */}
      <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11.5px] leading-[1.7] text-[#eef0ff]/[0.3]">
            PersonaForce Trader™ is an educational and identity-development experience. It does not
            provide financial, investment, tax, legal, or trading advice.
          </p>
          <p className="text-[11px] text-[#eef0ff]/[0.2] mt-5">
            © {new Date().getFullYear()} PersonaForce Trader™ · Discover the Trader Behind the Trade™
          </p>
        </div>
      </footer>
    </div>
  );
};

export default OrientationReplay;
