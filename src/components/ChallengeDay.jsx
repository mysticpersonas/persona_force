import { useEffect } from 'react';
import { ArrowDown, Check } from 'lucide-react';
import FadeUp from './FadeUp';
import TjHeader from './TjHeader';
import TjFooter from './TjFooter';
import TjForm from './TjForm';

/**
 * ChallengeDay — renders ONE day of The Trader's Journey 5-day challenge
 * as a completely standalone private page.
 *
 * Deliberately contains: no progress bar, no links to other days, no nav.
 * Each day embeds its own LeadConnector form; that form is the only place
 * answers are captured.
 */

const VslBlock = ({ vsl }) => (
  <div className="max-w-[760px] mx-auto">
    <div className="flex items-center gap-2.5 justify-center mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] shadow-[0_0_10px_#00e676] animate-[pulse_1.5s_ease-in-out_infinite]" />
      <span className="font-tj-sub text-[10px] md:text-[11px] font-semibold tracking-[0.24em] uppercase text-[#00e676]">{vsl.label}</span>
    </div>

    <div className="w-full rounded-[14px] md:rounded-[20px] overflow-hidden bg-black border border-white/[0.1] shadow-[0_0_50px_rgba(0,230,118,0.1),0_20px_50px_rgba(0,0,0,0.6)]">
      <wistia-player media-id={vsl.mediaId} aspect="1.7777777777777777"></wistia-player>
    </div>

    <p className="text-center font-tj-sub text-[14px] md:text-[16px] font-semibold tracking-[0.04em] text-white mt-4">{vsl.title}</p>
  </div>
);

/** Section shell — the hairline eyebrow + slab used by every block below the fold. */
const Panel = ({ eyebrow, accent = '#00e676', title, children, className = '' }) => (
  <div className={`overflow-hidden rounded-[16px] md:rounded-[20px] bg-[#11151d] border border-white/[0.07] p-6 md:p-10 ${className}`}>
    <div className="flex items-center gap-2.5 mb-4">
      <span className="h-px w-5 shrink-0" style={{ backgroundColor: accent }} />
      <span className="font-tj-sub text-[9.5px] md:text-[10.5px] font-semibold tracking-[0.26em] uppercase" style={{ color: accent }}>
        {eyebrow}
      </span>
    </div>
    {title && (
      <h2 className="font-tj-display text-[19px] md:text-[26px] font-bold uppercase tracking-[0.02em] leading-[1.28] text-white mb-7">
        {title}
      </h2>
    )}
    {children}
  </div>
);

const ChallengeDay = ({ day }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = `${day.marker}, ${day.headline} · The Trader's Journey`;
    // Private page — keep it out of search indexes.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, [day.id, day.marker, day.headline]);

  return (
    <div className="min-h-screen bg-[#0b0f14] text-white font-tj-body overflow-x-hidden antialiased selection:bg-[#00e676]/25 selection:text-white">

      <TjHeader />

      <main className="px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-[880px] mx-auto">

          {/* 2–4 — static marker pill + hero */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2.5 bg-white/[0.04] border border-white/[0.12] font-tj-sub text-[10px] md:text-[11px] font-semibold tracking-[0.26em] uppercase py-2 px-4 rounded-full text-white/70">
                <span className="w-[5px] h-[5px] rounded-full bg-[#00e676] shadow-[0_0_8px_#00e676] animate-[pulse_1.5s_ease-in-out_infinite]" />
                {day.marker}
              </span>
              <h1 className="font-tj-display text-[clamp(26px,5vw,46px)] font-black uppercase tracking-[0.01em] leading-[1.12] mt-7 text-white">
                {day.headline}
              </h1>
              <p className="font-tj-body text-[15px] md:text-[17px] text-white/55 mt-5 max-w-[620px] mx-auto leading-[1.7]">{day.sub}</p>

              {/* Signposts the one action on the page. The emails may or may not have
                  made it clear, so the page states it before anyone has to scroll. */}
              <a
                href="#reflection"
                className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-[#00e676]/40 bg-[#00e676]/[0.07] px-5 py-3 font-tj-sub text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em] text-[#00e676] transition-all duration-300 hover:border-[#00e676] hover:bg-[#00e676]/[0.14] hover:shadow-[0_0_28px_rgba(0,230,118,0.3)]"
              >
                Complete Today&rsquo;s Reflection
                <ArrowDown className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.5} />
              </a>
              <p className="font-tj-body text-[12.5px] md:text-[13px] text-white/35 mt-3.5">
                Watch the video, then fill in your daily reflection below.
              </p>
            </div>
          </FadeUp>

          {/* 5 — opening copy */}
          <FadeUp delay={100}>
            <div className="mt-12 md:mt-14 max-w-[620px] mx-auto flex flex-col gap-5">
              {day.opening.map((para, i) => (
                <p key={i} className="text-[15px] md:text-[16px] text-white/55 leading-[1.85]">
                  {para.map((line, j) => (
                    <span key={j}>{line}{j < para.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>
          </FadeUp>

          {day.pullQuote && (
            <FadeUp delay={140}>
              <p className="max-w-[620px] mx-auto font-tj-sub text-[19px] md:text-[26px] font-semibold text-white leading-[1.4] my-9 md:my-11 pl-5 border-l-2 border-[#00e676]">
                {day.pullQuote}
              </p>
            </FadeUp>
          )}

          {day.openingAfter?.length > 0 && (
            <FadeUp delay={160}>
              <div className="max-w-[620px] mx-auto flex flex-col gap-5">
                {day.openingAfter.map((para, i) => (
                  <p key={i} className="text-[15px] md:text-[16px] text-white/55 leading-[1.85]">
                    {para.map((line, j) => (
                      <span key={j}>{line}{j < para.length - 1 && <br />}</span>
                    ))}
                  </p>
                ))}
              </div>
            </FadeUp>
          )}

          {/* 6 — VSL */}
          <FadeUp delay={100}>
            <div className="mt-12 md:mt-16">
              <VslBlock vsl={day.vsl} />
            </div>
          </FadeUp>

          {/* 7 — core teaching */}
          <FadeUp delay={100}>
            <div className="mt-14 md:mt-20">
              <Panel eyebrow="Core Teaching" accent="#00a3ff" title={day.teaching.title}>
                {day.teaching.states ? (
                  <div className="grid gap-3">
                    {day.teaching.states.map((s) => (
                      <div key={s.name} className="rounded-xl bg-[#161b22] border border-white/[0.07] border-l-2 border-l-[#00a3ff] p-5">
                        <div className="font-tj-sub text-[15px] md:text-[16px] font-semibold tracking-[0.03em] text-white mb-1.5">{s.name}</div>
                        <p className="text-[13.5px] md:text-[14px] text-white/55 leading-[1.7]">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    {day.teaching.groups.map((group, i) => (
                      <div key={i} className="flex flex-col gap-2.5">
                        {group.map((line, j) => (
                          <div key={j} className="flex items-start gap-3">
                            <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#00a3ff] shrink-0" />
                            <p className="text-[14.5px] md:text-[16px] text-white/70 leading-[1.7]">{line}</p>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}

                {day.teaching.note && (
                  <p className="mt-7 pt-6 border-t border-white/[0.07] font-tj-sub text-[14.5px] md:text-[16px] font-semibold tracking-[0.02em] text-white leading-[1.65]">
                    {day.teaching.note}
                  </p>
                )}
              </Panel>
            </div>
          </FadeUp>

          {/* 8 — the day's real capture. Nothing above this submits anything. */}
          <FadeUp delay={100}>
            <div id="reflection" className="mt-8 md:mt-10 scroll-mt-6">
              <Panel eyebrow="Your Reflection" accent="#00e676" title={day.reflection.title}>
                {day.reflection.subtitle && (
                  <p className="-mt-4 mb-7 text-[14px] md:text-[15px] text-white/55 leading-[1.7]">{day.reflection.subtitle}</p>
                )}
                <TjForm form={day.form} />
              </Panel>
            </div>
          </FadeUp>

          {/* 9 — completion */}
          <FadeUp delay={100}>
            <div className="mt-8 rounded-[16px] md:rounded-[20px] bg-[#11151d]/60 border border-white/[0.06] p-7 md:p-9 text-center">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#00e676]/[0.12] border border-[#00e676]/40 mb-4">
                <Check className="w-4 h-4 text-[#00e676]" strokeWidth={3} />
              </span>
              <h3 className="font-tj-display text-[16px] md:text-[19px] font-bold uppercase tracking-[0.04em] text-white mb-4">{day.completion.title}</h3>
              <div className="flex flex-col gap-1.5 max-w-[520px] mx-auto">
                {day.completion.body.map((line, i) => (
                  <p key={i} className="text-[14px] md:text-[15px] text-white/55 leading-[1.7]">{line}</p>
                ))}
              </div>
              {day.completion.next && (
                <p className="font-tj-sub text-[13.5px] md:text-[14.5px] font-semibold tracking-[0.03em] text-[#00e676] mt-5 max-w-[520px] mx-auto leading-[1.65]">
                  {day.completion.next}
                </p>
              )}

              {/* Day 5 only — the closing note that ends the challenge.
                  There is deliberately no CTA here: the five daily reflections
                  ARE the map input, so an extra intake form would only ask the
                  trader to re-submit what they have already given us. */}
              {day.completion.final && (
                <div className="mt-8 pt-7 border-t border-white/[0.07]">
                  <p className="text-[12.5px] text-white/40 max-w-[420px] mx-auto leading-[1.75]">
                    The market does not create your identity.<br />
                    It reveals it.<br />
                    Now we begin mapping what it revealed.
                  </p>
                </div>
              )}
            </div>
          </FadeUp>
        </div>
      </main>

      <TjFooter />
    </div>
  );
};

export default ChallengeDay;
