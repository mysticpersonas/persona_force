import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Mail } from 'lucide-react';
import ParticleField from './ParticleField';
import FadeUp from './FadeUp';

/**
 * ProductPage — shared layout for the private PFT product pages
 * (/trader/pft-30day, -60day, -90day). All unique content comes in via props,
 * so future edits happen in one place. These pages are unlisted: a noindex,nofollow
 * meta tag is injected on mount so search engines don't index them.
 */
const ProductPage = ({
  docTitle,
  headline,
  sub,
  whatIsBold,
  whatIsBody,
  included = [],
  forYou = [],
  notForYou = [],
  price,
  pricingSummary = [],
  paymentLink,
  bookSource = 'pft',
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = docTitle;
    // Private, unlisted page — keep it out of search indexes.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, [docTitle]);

  return (
    <div className="relative min-h-screen bg-[#0A0F1F] text-white font-sans overflow-x-hidden selection:bg-[#00AEEF]/30 selection:text-white antialiased">

      {/* ambient depth — same as the rest of the PFT site */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.5] [background-image:linear-gradient(rgba(0,174,239,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(0,174,239,0.045)_1px,transparent_1px)] [background-size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]" />
        <div className="absolute top-[12%] -left-40 w-[420px] h-[420px] rounded-full bg-[#00AEEF]/[0.05] blur-[120px]" />
        <div className="absolute top-[60%] -right-40 w-[460px] h-[460px] rounded-full bg-[#7A2DFF]/[0.05] blur-[130px]" />
      </div>

      <div className="relative z-10">

        {/* SECTION 1 — MINI NAV (private page: logo + Book a Call only, no links/hamburger) */}
        <nav className="fixed top-0 w-full z-40 flex justify-center border-b border-white/[0.06] bg-[#0A0F1F]/95 backdrop-blur-md py-3 md:py-4">
          <div className="w-full max-w-[1100px] px-5 md:px-8 flex justify-between items-center gap-4">
            <Link to="/trader" className="flex items-center gap-2 md:gap-2.5 shrink-0">
              <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
              <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-white">
                PersonaForce<span className="bg-gradient-to-r from-[#00AEEF] to-[#7A2DFF] bg-clip-text text-transparent"> Trader™</span>
              </div>
            </Link>
            <Link
              to={`/book?source=${bookSource}`}
              className="inline-flex items-center gap-1.5 whitespace-nowrap bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-lg text-[12.5px] sm:text-[13px] font-bold transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </nav>
        <div className="h-[54px] md:h-[64px]" />

        {/* SECTION 2 — HERO (no CTA — let them scroll) */}
        <section className="relative overflow-hidden">
          <ParticleField className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,transparent_0%,#0A0F1F_78%)]" />
          <div className="relative z-10 max-w-[800px] mx-auto px-5 md:px-8 pt-14 pb-20 md:pt-20 md:pb-28 text-center">
            <FadeUp>
              <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-[#00AEEF]/[0.3] text-[#5fd0f5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-7">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00AEEF] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Founder Pilot — Private Access Only
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <h1 className="text-[clamp(28px,5.6vw,54px)] font-black leading-[1.1] tracking-[-1px] max-w-[720px] mx-auto">{headline}</h1>
            </FadeUp>
            <FadeUp delay={200}>
              <p className="text-[15px] md:text-[18px] text-[#aab2cc] mt-6 leading-[1.7] max-w-[600px] mx-auto">{sub}</p>
            </FadeUp>
          </div>
        </section>

        {/* SECTION 3 — WHAT THIS IS */}
        <section className="px-5 md:px-8 py-16 md:py-24 border-t border-white/[0.05]">
          <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <FadeUp>
              <h2 className="text-[clamp(22px,3.4vw,32px)] font-black tracking-[-0.6px] leading-[1.2]">{whatIsBold}</h2>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="md:border-l border-white/[0.08] md:pl-12">
                <p className="text-[15px] md:text-[16px] text-[#aab2cc] leading-[1.8]">{whatIsBody}</p>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* SECTION 4 — WHAT'S INCLUDED */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-[900px] mx-auto">
            <FadeUp>
              <div className="text-center mb-12 md:mb-14">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-3">What&rsquo;s Included</div>
                <h2 className="text-[clamp(24px,4vw,38px)] font-black tracking-[-0.6px]">Everything in this container</h2>
              </div>
            </FadeUp>
            <div className="flex flex-col gap-3.5">
              {included.map((it, i) => (
                <FadeUp key={i} delay={i * 60}>
                  <div className="flex items-start gap-4 rounded-xl bg-white/[0.025] border border-white/[0.07] border-l-2 border-l-[#00AEEF] p-5 md:p-6 hover:bg-white/[0.04] transition-colors">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-[#00AEEF]/[0.12] border border-[#00AEEF]/[0.3] flex items-center justify-center text-[13px] font-black text-[#5fd0f5]">{i + 1}</span>
                    <div>
                      <h3 className="text-[15px] md:text-[16px] font-bold text-white mb-1.5">{it.title}</h3>
                      <p className="text-[13.5px] text-[#9aa1b8] leading-[1.6]">{it.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — WHO THIS IS FOR */}
        <section className="px-5 md:px-8 py-16 md:py-24 border-t border-white/[0.05]">
          <div className="max-w-[1000px] mx-auto grid md:grid-cols-2 gap-6">
            <FadeUp>
              <div className="h-full rounded-2xl bg-white/[0.025] border border-white/[0.07] p-7 md:p-8">
                <h3 className="flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-[#5fd0f5] mb-6"><span className="w-6 h-px bg-[#00AEEF]" /> This is for you if…</h3>
                <div className="flex flex-col gap-4">
                  {forYou.map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#00AEEF]/15 border border-[#00AEEF]/40 flex items-center justify-center"><Check className="w-3 h-3 text-[#00AEEF]" strokeWidth={3} /></span>
                      <p className="text-[14px] text-[#cdd4e6] leading-[1.55]">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={120}>
              <div className="h-full rounded-2xl bg-white/[0.015] border border-white/[0.05] p-7 md:p-8">
                <h3 className="flex items-center gap-2 text-[13px] font-bold tracking-[0.14em] uppercase text-[#828aa3] mb-6"><span className="w-6 h-px bg-white/20" /> This is not for you if…</h3>
                <div className="flex flex-col gap-4">
                  {notForYou.map((line, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/[0.04] border border-white/15 flex items-center justify-center"><X className="w-3 h-3 text-[#828aa3]" strokeWidth={3} /></span>
                      <p className="text-[14px] text-[#8b93ad] leading-[1.55]">{line}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* SECTION 6 — PRICING */}
        <section className="px-5 md:px-8 py-16 md:py-24">
          <div className="max-w-[560px] mx-auto">
            <FadeUp>
              <div className="rounded-2xl bg-gradient-to-b from-[#0e1730] to-[#0A0F1F] border border-[#00AEEF]/25 shadow-[0_0_60px_rgba(0,174,239,0.12)] p-7 md:p-10 text-center">
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5fd0f5] mb-4">The Investment</div>
                <div className="text-[clamp(44px,10vw,64px)] font-black tracking-[-2px] leading-none">{price}</div>
                <div className="text-[13px] text-[#9aa1b8] mt-2">One-time payment</div>

                <div className="my-7 h-px bg-white/[0.08]" />

                <div className="flex flex-col gap-3 text-left">
                  {pricingSummary.map((line, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#00AEEF] mt-0.5 shrink-0" strokeWidth={3} />
                      <span className="text-[13.5px] text-[#cdd4e6] leading-[1.5]">{line}</span>
                    </div>
                  ))}
                </div>

                <p className="text-[12.5px] text-[#8b93ad] mt-7 mb-5">Have a founder discount code? Apply it at checkout.</p>

                <a
                  href={paymentLink}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00AEEF] hover:bg-[#0bb9f8] text-[#04121f] py-4 rounded-xl text-[16px] font-bold transition-colors animate-[pftGlow_3s_ease-in-out_infinite]"
                >
                  Get Started — {price} <ArrowRight className="w-4 h-4" />
                </a>

                <p className="text-[12px] text-[#8b93ad] mt-4">Secure checkout · One-time payment · No subscription</p>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <p className="text-[11.5px] leading-[1.7] text-[#646b85] text-center mt-7 max-w-[480px] mx-auto">
                PersonaForce Trader™ is an educational and identity-development experience. It does not
                provide financial, investment, tax, legal, or trading advice. Results vary. Participants
                are responsible for their own trading decisions.
              </p>
            </FadeUp>
          </div>
        </section>

        {/* SECTION 7 — FINAL REASSURANCE (no nav links) */}
        <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06]">
          <div className="max-w-[680px] mx-auto text-center">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[14px] text-[#cdd4e6]">
              <Mail className="w-4 h-4 text-[#5fd0f5]" />
              Questions? Reply to your email or reach us at
              <a href="mailto:TF@personaforce.co" className="text-[#5fd0f5] hover:text-white font-semibold transition-colors">TF@personaforce.co</a>
            </p>
            <p className="text-[11px] text-[#3f4763] mt-6">
              © {new Date().getFullYear()} PersonaForce Trader™ · Discover the Trader Behind the Trade™
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProductPage;
