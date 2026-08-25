import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import FadeUp from './FadeUp';

/**
 * ChallengeDay — renders ONE day of the 5-Day Trader Identity Challenge™
 * as a completely standalone private page.
 *
 * Deliberately contains: no progress bar, no links to other days, no nav.
 * Reflection inputs are visual UI only — nothing is submitted from here;
 * real capture happens on /trader/trader-intake.
 */

const VslBlock = ({ vsl }) => (
  <div className="max-w-[760px] mx-auto">
    <div className="flex items-center gap-2 justify-center mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#3b6fe8] animate-[pulse_1.5s_ease-in-out_infinite]" />
      <span className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5]">{vsl.label}</span>
    </div>

    <div className="w-full rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)]">
      <wistia-player media-id={vsl.mediaId} aspect="1.7777777777777777"></wistia-player>
    </div>

    <p className="text-center text-[14px] md:text-[16px] font-bold text-[#eef0ff] mt-4">{vsl.title}</p>
  </div>
);

const Question = ({ item, name }) => (
  <div>
    <label className="block text-[14px] md:text-[15px] font-semibold text-[#eef0ff] leading-[1.5]">{item.q}</label>
    {item.hint && <p className="text-[13px] text-[#eef0ff]/[0.45] italic mt-1.5">{item.hint}</p>}

    {item.type === 'radio' ? (
      <div className="grid sm:grid-cols-2 gap-2.5 mt-4">
        {item.options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 rounded-lg bg-white/[0.03] border border-white/[0.07] px-4 py-3 cursor-pointer transition-colors hover:border-[#3b6fe8]/40 has-[:checked]:border-[#3b6fe8] has-[:checked]:bg-[#3b6fe8]/[0.1]"
          >
            <input type="radio" name={name} className="accent-[#3b6fe8] w-4 h-4 shrink-0" />
            <span className="text-[13.5px] text-[#eef0ff]/[0.8]">{opt}</span>
          </label>
        ))}
      </div>
    ) : (
      <textarea
        rows={4}
        placeholder={item.placeholder}
        className="w-full mt-4 rounded-lg bg-white/[0.03] border border-white/[0.07] px-4 py-3 text-[14px] text-[#eef0ff] placeholder:text-[#eef0ff]/[0.25] focus:border-[#3b6fe8] focus:outline-none focus:ring-1 focus:ring-[#3b6fe8]/40 transition-colors resize-y"
      />
    )}
  </div>
);

const CTA_CLASSES =
  'w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-8 py-4 rounded-[10px] text-[15px] font-bold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)]';

// Day 5 routes internally to the intake page; Days 1–4 use placeholder hrefs.
const CtaButton = ({ cta }) =>
  cta.internal ? (
    <Link to={cta.href} className={CTA_CLASSES}>
      {cta.label} <ArrowRight className="w-4 h-4" />
    </Link>
  ) : (
    <a href={cta.href} className={CTA_CLASSES}>
      {cta.label} <ArrowRight className="w-4 h-4" />
    </a>
  );

const ChallengeDay = ({ day }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = `${day.marker}, ${day.headline} · PersonaForce Trader™`;
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
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased">

      {/* 1 — LOGO ONLY. No nav links, no day links. */}
      <header className="border-b border-white/[0.06]">
        <div className="max-w-[860px] mx-auto px-5 md:px-8 py-4 flex items-center gap-2.5">
          <img src="/pf_logo.png" alt="PersonaForce Trader" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
          <span className="text-[14px] md:text-[15px] font-extrabold tracking-[-0.3px]">
            Persona<span className="text-[#5b8af5]">Force Trader™</span>
          </span>
        </div>
      </header>

      <main className="px-5 md:px-8 py-14 md:py-20">
        <div className="max-w-[860px] mx-auto">

          {/* 2–4 — static marker pill + hero */}
          <FadeUp>
            <div className="text-center">
              <span className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.3] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
                <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite]" />
                {day.marker}
              </span>
              <h1 className="text-[clamp(28px,5.5vw,50px)] font-black tracking-[-1px] leading-[1.08] mt-6">{day.headline}</h1>
              <p className="text-[15px] md:text-[18px] text-[#eef0ff]/[0.58] mt-5 max-w-[620px] mx-auto leading-[1.65]">{day.sub}</p>
            </div>
          </FadeUp>

          {/* 5 — opening copy */}
          <FadeUp delay={100}>
            <div className="mt-12 md:mt-14 max-w-[620px] mx-auto flex flex-col gap-5">
              {day.opening.map((para, i) => (
                <p key={i} className="text-[15px] md:text-[16px] text-[#eef0ff]/[0.58] leading-[1.85]">
                  {para.map((line, j) => (
                    <span key={j}>{line}{j < para.length - 1 && <br />}</span>
                  ))}
                </p>
              ))}
            </div>
          </FadeUp>

          {day.pullQuote && (
            <FadeUp delay={140}>
              <p className="max-w-[620px] mx-auto text-[18px] md:text-[24px] font-bold text-[#eef0ff] leading-[1.4] my-8 md:my-10 pl-5 border-l-2 border-[#3b6fe8]">
                {day.pullQuote}
              </p>
            </FadeUp>
          )}

          {day.openingAfter?.length > 0 && (
            <FadeUp delay={160}>
              <div className="max-w-[620px] mx-auto flex flex-col gap-5">
                {day.openingAfter.map((para, i) => (
                  <p key={i} className="text-[15px] md:text-[16px] text-[#eef0ff]/[0.58] leading-[1.85]">
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
            <div className="mt-14 md:mt-20 rounded-[16px] md:rounded-[20px] bg-[#0b0d22] border border-white/[0.06] p-7 md:p-10">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5b8af5] mb-3">Core Teaching</div>
              <h2 className="text-[20px] md:text-[26px] font-black tracking-[-0.4px] leading-[1.25] mb-7">{day.teaching.title}</h2>

              {day.teaching.states ? (
                <div className="grid gap-3.5">
                  {day.teaching.states.map((s) => (
                    <div key={s.name} className="rounded-xl bg-white/[0.03] border border-white/[0.07] border-l-2 border-l-[#3b6fe8] p-5">
                      <div className="text-[15px] md:text-[16px] font-bold text-[#eef0ff] mb-1.5">{s.name}</div>
                      <p className="text-[13.5px] md:text-[14px] text-[#eef0ff]/[0.58] leading-[1.65]">{s.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {day.teaching.groups.map((group, i) => (
                    <div key={i} className="flex flex-col gap-2.5">
                      {group.map((line, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <span className="mt-[9px] w-1.5 h-1.5 rounded-full bg-[#3b6fe8] shrink-0" />
                          <p className="text-[14.5px] md:text-[16px] text-[#eef0ff]/[0.72] leading-[1.7]">{line}</p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {day.teaching.note && (
                <p className="mt-7 pt-6 border-t border-white/[0.06] text-[14.5px] md:text-[16px] font-semibold text-[#eef0ff] leading-[1.65]">
                  {day.teaching.note}
                </p>
              )}
            </div>
          </FadeUp>

          {/* 8–10 — reflection + CTA + microcopy */}
          <FadeUp delay={100}>
            <div className="mt-8 md:mt-10 rounded-[16px] md:rounded-[20px] bg-[#0b0d22] border border-white/[0.06] p-7 md:p-10">
              <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5b8af5] mb-3">Reflection</div>
              <h2 className="text-[20px] md:text-[26px] font-black tracking-[-0.4px] leading-[1.25]">{day.reflection.title}</h2>
              {day.reflection.subtitle && (
                <p className="text-[14px] text-[#eef0ff]/[0.58] mt-3 leading-[1.65]">{day.reflection.subtitle}</p>
              )}

              <div className="flex flex-col gap-8 mt-8">
                {day.reflection.questions.map((item, i) => (
                  <Question key={i} item={item} name={`${day.id}-q${i}`} />
                ))}
              </div>

              <div className="mt-10 flex flex-col items-center">
                <CtaButton cta={day.cta} />
                <p className="text-[12px] text-[#eef0ff]/[0.38] mt-4 text-center max-w-[440px] leading-[1.6]">{day.cta.micro}</p>
              </div>
            </div>
          </FadeUp>

          {/* 11 — completion */}
          <FadeUp delay={100}>
            <div className="mt-8 rounded-[16px] md:rounded-[20px] bg-white/[0.025] border border-white/[0.05] p-7 md:p-9 text-center">
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.35] mb-4">
                <Check className="w-4 h-4 text-[#5b8af5]" strokeWidth={3} />
              </span>
              <h3 className="text-[17px] md:text-[20px] font-bold text-[#eef0ff] mb-3">{day.completion.title}</h3>
              <div className="flex flex-col gap-1.5 max-w-[520px] mx-auto">
                {day.completion.body.map((line, i) => (
                  <p key={i} className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] leading-[1.7]">{line}</p>
                ))}
              </div>
              {day.completion.next && (
                <p className="text-[13.5px] md:text-[14.5px] text-[#5b8af5] font-semibold mt-5 max-w-[520px] mx-auto leading-[1.65]">
                  {day.completion.next}
                </p>
              )}

              {/* Day 5 only — the single onward step, into the map intake */}
              {day.completion.final && (
                <div className="mt-8 pt-7 border-t border-white/[0.07] flex flex-col items-center">
                  <Link
                    to="/trader/trader-intake"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-8 py-4 rounded-[10px] text-[15px] font-bold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)]"
                  >
                    Continue to My Map Confirmation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[12.5px] text-[#eef0ff]/[0.38] mt-5 max-w-[420px] leading-[1.75]">
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

      {/* footer — disclaimer only, no nav links */}
      <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06]">
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[11.5px] leading-[1.7] text-[#eef0ff]/[0.3]">
            PersonaForce Trader™ is an educational and identity-development experience. It does not
            provide financial, investment, tax, legal, or trading advice. Results vary. Participants
            are responsible for their own trading decisions.
          </p>
          <p className="text-[11px] text-[#eef0ff]/[0.2] mt-5">
            © {new Date().getFullYear()} PersonaForce Trader™ · Discover the Trader Behind the Trade™
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ChallengeDay;
