import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import FadeUp from '../components/FadeUp';

/* ------------------------------------------------------------------ *
 *  All five days live in this data array so copy edits happen in one  *
 *  place. Reflection questions are visual UI only — nothing submits;  *
 *  real capture happens on /trader/trader-intake (GHL form).          *
 * ------------------------------------------------------------------ */
const DAYS = [
  {
    id: 'day1',
    marker: 'Day 1 of 5',
    headline: 'Who Is the Trader?',
    sub: 'Before you study another trade, meet the version of you that has been placing them.',
    opening: [
      ['Before you ever placed a trade, you had an identity.', 'A way of responding to pressure.', 'A pattern under uncertainty.', 'A version of yourself that becomes louder when money is on the line.'],
      ['Most traders study charts, systems, entries, exits, timing, and risk.'],
      ['Very few stop to ask:'],
    ],
    pullQuote: 'Who is actually placing the trade?',
    openingAfter: [
      ['Today is not about correcting anything.', 'It is not about judging your performance.', 'It is about seeing clearly.'],
    ],
    vsl: { mediaId: '7if2mpulvx', label: 'Watch Day 1', title: 'The Trader Before the Strategy', thumb: 'Who has been placing your trades?' },
    teaching: {
      title: 'Strategy Matters. Identity Executes Strategy.',
      groups: [
        ['You can understand the setup and still hesitate.', 'You can know the rule and still break it.', 'You can have a plan and still abandon it.'],
        ['The Steady Trader follows the plan.', 'The Triggered Trader reacts under pressure.', 'The Future Trader is the version you are building.'],
      ],
      note: 'Today establishes your baseline.',
    },
    reflection: {
      title: 'Build Your Day 1 Baseline',
      subtitle: 'Answer from what is true. Not from the trader you think you should be.',
      questions: [
        { q: 'How long have you actively traded?', type: 'radio', options: ['Less than 6 months', '6–12 months', '1–3 years', '3–5 years', 'More than 5 years'] },
        { q: 'What is your primary trading market?', type: 'radio', options: ['Stocks', 'Options', 'Forex', 'Futures', 'Crypto', 'Commodities', 'Multiple markets', 'Other'] },
        { q: 'Which recurring pattern appears most often in your trading?', type: 'radio', options: ['I enter too early', 'I exit too early', 'I hold too long', 'I move stops', 'I overtrade', 'I hesitate', 'I force trades', 'I revenge trade', 'I abandon the plan', 'Other'] },
        { q: 'What most often changes after you win?', type: 'radio', options: ['I stay steady', 'I increase risk', 'I trade more frequently', 'I become overconfident', 'I protect too aggressively', 'I stop following my normal process'] },
        { q: 'What most often changes after you lose?', type: 'radio', options: ['I stay steady', 'I try to recover immediately', 'I reduce risk excessively', 'I freeze', 'I avoid the next setup', 'I question the entire strategy'] },
        { q: 'Complete this sentence honestly:', type: 'text', hint: 'The trading pattern I am most tired of repeating is…', placeholder: 'The trading pattern I am most tired of repeating is…' },
      ],
    },
    cta: { label: 'Save My Day 1 Baseline', href: 'DAY1_SUBMISSION_LINK', micro: 'Private. Approximately 2–3 minutes. Your answers are saved to your personal PersonaForce Trader™ record.' },
    completion: {
      title: 'Day 1 Complete',
      body: ['You have established the first honest baseline of the trader behind your trades.', 'Do not fix it yet.', 'Do not judge it.', 'Notice it.'],
      next: 'Tomorrow: The trade that happens before the visible trade.',
    },
  },

  {
    id: 'day2',
    marker: 'Day 2 of 5',
    headline: 'The Invisible Trade',
    sub: 'Every visible trade has an invisible decision running underneath it.',
    opening: [
      ['The chart shows the entry.', 'The platform records the order.', 'Your account reflects the result.'],
      ['But none of those reveals what happened inside you before the decision.'],
      ['The emotion.', 'The pressure.', 'The self-talk.', 'The hesitation.', 'The impulse.'],
    ],
    pullQuote: 'The Invisible Trade is the trade before the trade.',
    openingAfter: [['Today, you begin seeing it.']],
    vsl: { mediaId: '0eywl46sxr', label: 'Watch Day 2', title: 'The Moment Before the Click', thumb: 'What happened inside you first?' },
    teaching: {
      title: 'Emotion Often Helps Choose the Trade',
      groups: [
        ['Fear may make you freeze.', 'Greed may make you stretch the setup.', 'Doubt may make you exit.', 'Urgency may make you enter.', 'Overconfidence may make the plan feel optional.'],
      ],
      note: 'The goal is not to eliminate emotion. The goal is to notice when emotion becomes the decision-maker.',
    },
    reflection: {
      title: 'Identify Your Invisible Trade',
      subtitle: 'Think about a recent poor, reactive, or emotionally distorted trading decision.',
      questions: [
        { q: 'Which emotion appeared first?', type: 'radio', options: ['Fear', 'Urgency', 'Greed', 'Frustration', 'Doubt', 'Excitement', 'Overconfidence', 'Need for control', 'Other'] },
        { q: 'What did that emotion make you do?', type: 'radio', options: ['Force', 'Freeze', 'Chase', 'Avoid', 'Exit', 'Hold', 'Move the stop', 'Increase size', 'Break the plan'] },
        { q: 'When did you first notice the emotion?', type: 'radio', options: ['Before the market opened', 'While watching the setup', 'Immediately before entry', 'After entry', 'After the trade moved against me', 'After the trade moved in my favor', 'I did not notice it until afterward'] },
        { q: 'Where did you feel it first?', type: 'radio', options: ['Chest', 'Stomach', 'Jaw', 'Shoulders', 'Breathing', 'Hands', 'Racing thoughts', 'I did not notice a physical signal'] },
        { q: 'Complete the sentence:', type: 'text', hint: 'When I felt __________, I told myself __________.', placeholder: 'When I felt …, I told myself …' },
      ],
    },
    cta: { label: 'Reveal My Invisible Trade', href: 'DAY2_SUBMISSION_LINK', micro: 'Your answer becomes part of the private data used to build your PersonaForce Trader™ Map.' },
    completion: {
      title: 'Day 2 Complete',
      body: ['You identified what entered the trade before the order did.', 'That is the Invisible Trade.'],
      next: 'Tomorrow: The distance between what you know and what you do under pressure.',
    },
  },

  {
    id: 'day3',
    marker: 'Day 3 of 5',
    headline: 'The Identity Gap',
    sub: 'Between what you know and what you do under pressure.',
    opening: [
      ['Most traders try to close that distance with more information.', 'More strategy.', 'More indicators.', 'More rules.'],
      ['But information alone does not create discipline.'],
    ],
    pullQuote: 'Today, you listen for the internal sentence that gives you permission to make the exception.',
    openingAfter: [],
    vsl: { mediaId: 'oopr3asnnu', label: 'Watch Day 3', title: 'The Voice That Makes the Exception', thumb: 'What do you say before you break the rule?' },
    teaching: {
      title: 'The Rule Is Rarely Broken Without an Argument First',
      groups: [
        ['“This trade is different.”', '“I cannot miss this move.”', '“I will manage it manually.”', '“I only need to recover the last loss.”', '“It will come back.”'],
      ],
      note: '',
    },
    reflection: {
      title: 'Name Your Identity Gap',
      subtitle: '',
      questions: [
        { q: 'Which rule do you break most often?', type: 'text', placeholder: 'Write the rule…' },
        { q: 'Right before I break my rule, the voice in my head says…', type: 'text', placeholder: 'Write the real sentence…' },
      ],
    },
    cta: { label: 'Name My Identity Gap', href: 'DAY3_SUBMISSION_LINK', micro: 'Do not make the answer sound professional. Write the real sentence.' },
    completion: {
      title: 'Day 3 Complete',
      body: ['You did not only identify the rule.', 'You identified the voice that negotiates with it.'],
      next: 'Tomorrow: Pressure reveals the pattern that voice belongs to.',
    },
  },

  {
    id: 'day4',
    marker: 'Day 4 of 5',
    headline: 'Pressure Reveals Identity',
    sub: 'Pressure does not create the trader. It reveals which trader takes control.',
    opening: [
      ['Under normal conditions most traders perform reasonably well.', 'The plan is followed.', 'The rules hold.', 'The emotions stay manageable.'],
      ['Then pressure arrives.', 'A losing streak.', 'A missed move.', 'A fast market.', 'A position moving against you.'],
      ['And a different version of you shows up.'],
    ],
    pullQuote: 'The version that did not plan to appear.',
    openingAfter: [['Today you identify that version by name.']],
    vsl: { mediaId: 'hsiaiayi8m', label: 'Watch Day 4', title: 'Which Trader Takes Over Under Pressure', thumb: 'The version that shows up when it counts' },
    teaching: {
      title: 'Three Trader States',
      states: [
        { name: 'The Steady Trader', desc: 'Follows the plan, processes loss without collapse, executes without emotional distortion.' },
        { name: 'The Triggered Trader', desc: 'Reacts to pressure, abandons the plan, makes decisions from fear, frustration, or urgency.' },
        { name: 'The Future Trader', desc: 'The version you are actively building through this challenge.' },
      ],
    },
    reflection: {
      title: 'Identify Your Pressure Pattern',
      subtitle: '',
      questions: [
        { q: 'Under pressure, which response appears most often?', type: 'radio', options: ['Force', 'Freeze', 'Avoid', 'Revenge trade', 'Overanalyse', 'Move stops', 'Oversize', 'Abandon the plan entirely'] },
        { q: 'How quickly does the shift happen?', type: 'radio', options: ['Immediately', 'Within minutes', 'After several losses', 'Only under extended drawdown', 'I do not notice until after'] },
        { q: 'After the pressure passes, what do you typically do?', type: 'radio', options: ['Return to the plan immediately', 'Take a break', 'Review the trades', 'Try to recover the loss', 'Question the strategy entirely', 'Shut down for the day'] },
        { q: 'Complete this sentence:', type: 'text', hint: 'When pressure hits, the version of me that takes over usually…', placeholder: 'When pressure hits, the version of me that takes over usually…' },
      ],
    },
    cta: { label: 'Identify My Pressure Pattern', href: 'DAY4_SUBMISSION_LINK', micro: 'This becomes one of the most important data points in your PersonaForce Trader™ Map.' },
    completion: {
      title: 'Day 4 Complete',
      body: ['You have named the trader that pressure reveals.', 'Tomorrow is the final day.'],
      next: 'You will meet the trader built to replace it.',
    },
  },

  {
    id: 'day5',
    marker: 'Day 5 of 5',
    headline: 'Meet Your Future Trader',
    sub: 'You have seen the pattern. Today, you define the trader built to interrupt it.',
    opening: [
      ['Your Future Trader is not perfect.', 'Not emotionless.', 'Not imaginary.'],
      ['It is the version of you that can feel pressure without handing pressure the controls.'],
      ['The version that pauses.', 'Assesses.', 'Waits.', 'Follows the plan.', 'Recovers.'],
    ],
    pullQuote: 'Today you give that version a direction.',
    openingAfter: [],
    vsl: { mediaId: 'mebphpeds3', label: 'Watch Day 5', title: 'The Trader You Are Building', thumb: 'The version that leads next' },
    teaching: {
      title: 'Identity Shifts Before Behavior Shifts',
      groups: [
        ['You cannot consistently trade like a disciplined trader while still operating from a triggered identity.'],
        ['The Future Trader is not built through willpower.', 'It is built through identity-level work.'],
      ],
      note: 'That is what your PersonaForce Trader™ Map is designed to begin.',
    },
    reflection: {
      title: 'Define Your Future Trader',
      subtitle: '',
      questions: [
        { q: 'The trading behavior I most want to stabilize is…', type: 'text', placeholder: 'Write your answer…' },
        { q: 'The triggered pattern I most want to interrupt is…', type: 'text', placeholder: 'Write your answer…' },
        { q: 'My Future Trader handles pressure by…', type: 'text', placeholder: 'Write your answer…' },
        { q: 'Complete this statement:', type: 'text', hint: 'For the next 90 days, I am becoming the trader who…', placeholder: 'For the next 90 days, I am becoming the trader who…' },
        { q: 'Complete your first interruption plan:', type: 'text', hint: 'When I notice my old pattern beginning, I will first…', placeholder: 'When I notice my old pattern beginning, I will first…' },
      ],
    },
    cta: { label: 'Complete My 5-Day Challenge', href: 'TRADER_INTAKE_LINK', micro: 'Your five days of responses will now be brought together into one private identity-performance record.' },
    completion: {
      title: 'You Completed the Challenge',
      body: ['You now have five days of structured evidence about the trader behind your trades.', 'Your answers have been saved.', 'Your pattern is becoming visible.'],
      next: 'One final step remains: review and confirm the information that will be used to prepare your PersonaForce Trader™ Map.',
      final: true,
    },
  },
];

/* ---------------------------- sub-blocks ---------------------------- */

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

const DaySection = ({ day }) => (
  <section id={day.id} className="scroll-mt-[86px] px-5 md:px-8 py-16 md:py-24">
    <div className="max-w-[860px] mx-auto">

      {/* marker + hero */}
      <FadeUp>
        <div className="text-center">
          <span className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.3] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase py-1.5 px-4 rounded-full">
            <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite]" />
            {day.marker}
          </span>
          <h2 className="text-[clamp(28px,5.5vw,50px)] font-black tracking-[-1px] leading-[1.08] mt-6">{day.headline}</h2>
          <p className="text-[15px] md:text-[18px] text-[#eef0ff]/[0.58] mt-5 max-w-[620px] mx-auto leading-[1.65]">{day.sub}</p>
        </div>
      </FadeUp>

      {/* opening copy */}
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

      {/* pull quote */}
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

      {/* VSL placeholder */}
      <FadeUp delay={100}>
        <div className="mt-12 md:mt-16">
          <VslBlock vsl={day.vsl} />
        </div>
      </FadeUp>

      {/* core teaching */}
      <FadeUp delay={100}>
        <div className="mt-14 md:mt-20 rounded-[16px] md:rounded-[20px] bg-[#0b0d22] border border-white/[0.06] p-7 md:p-10">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5b8af5] mb-3">Core Teaching</div>
          <h3 className="text-[20px] md:text-[26px] font-black tracking-[-0.4px] leading-[1.25] mb-7">{day.teaching.title}</h3>

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

      {/* reflection */}
      <FadeUp delay={100}>
        <div className="mt-8 md:mt-10 rounded-[16px] md:rounded-[20px] bg-[#0b0d22] border border-white/[0.06] p-7 md:p-10">
          <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5b8af5] mb-3">Reflection</div>
          <h3 className="text-[20px] md:text-[26px] font-black tracking-[-0.4px] leading-[1.25]">{day.reflection.title}</h3>
          {day.reflection.subtitle && (
            <p className="text-[14px] text-[#eef0ff]/[0.58] mt-3 leading-[1.65]">{day.reflection.subtitle}</p>
          )}

          <div className="flex flex-col gap-8 mt-8">
            {day.reflection.questions.map((item, i) => (
              <Question key={i} item={item} name={`${day.id}-q${i}`} />
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center">
            <a
              href={day.cta.href}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-8 py-4 rounded-[10px] text-[15px] font-bold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)]"
            >
              {day.cta.label} <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-[12px] text-[#eef0ff]/[0.38] mt-4 text-center max-w-[440px] leading-[1.6]">{day.cta.micro}</p>
          </div>
        </div>
      </FadeUp>

      {/* completion */}
      <FadeUp delay={100}>
        <div className="mt-8 rounded-[16px] md:rounded-[20px] bg-white/[0.025] border border-white/[0.05] p-7 md:p-9 text-center">
          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.35] mb-4">
            <Check className="w-4 h-4 text-[#5b8af5]" strokeWidth={3} />
          </span>
          <h4 className="text-[17px] md:text-[20px] font-bold text-[#eef0ff] mb-3">{day.completion.title}</h4>
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

          {/* Day 5 only — final step into the map intake */}
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
  </section>
);

/* ------------------------------- page ------------------------------- */

const TraderChallenge = () => {
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    const prevTitle = document.title;
    document.title = '5-Day Trader Identity Challenge™ · PersonaForce Trader™';
    // Private page — keep it out of search indexes.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => {
      document.title = prevTitle;
      document.head.removeChild(meta);
    };
  }, []);

  // Which day is currently in view (drives the sticky dot indicator)
  useEffect(() => {
    const handleScroll = () => {
      const offset = 140;
      let current = 1;
      DAYS.forEach((d, i) => {
        const el = document.getElementById(d.id);
        if (el && el.getBoundingClientRect().top <= offset) current = i + 1;
      });
      setActiveDay(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToDay = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased">

      {/* STICKY PROGRESS BAR */}
      <div className="sticky top-0 z-50 bg-[#06081a]/95 backdrop-blur-md border-b border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto px-5 md:px-8 py-3 flex items-center justify-between gap-4">
          <Link to="/trader" className="flex items-center gap-2 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-6 h-6 md:w-7 md:h-7 rounded-md object-contain shrink-0" />
            <span className="hidden sm:block text-[13px] font-extrabold tracking-[-0.3px]">
              Persona<span className="text-[#5b8af5]">Force™</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            {DAYS.map((d, i) => {
              const n = i + 1;
              const active = activeDay === n;
              const done = activeDay > n;
              return (
                <button
                  key={d.id}
                  onClick={() => goToDay(d.id)}
                  aria-label={`Go to Day ${n}`}
                  aria-current={active ? 'step' : undefined}
                  className="group flex items-center gap-1.5 md:gap-2 cursor-pointer"
                >
                  <span
                    className={`rounded-full transition-all duration-300 ${
                      active
                        ? 'w-2.5 h-2.5 bg-[#3b6fe8] shadow-[0_0_12px_rgba(59,111,232,0.9)]'
                        : done
                        ? 'w-2 h-2 bg-[#3b6fe8]/60'
                        : 'w-2 h-2 bg-white/20 group-hover:bg-white/40'
                    }`}
                  />
                  <span className={`hidden md:inline text-[11px] font-semibold transition-colors ${active ? 'text-[#eef0ff]' : 'text-[#eef0ff]/40 group-hover:text-[#eef0ff]/70'}`}>
                    Day {n}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* PAGE INTRO */}
      <div className="px-5 md:px-8 pt-14 md:pt-20 pb-2 text-center">
        <FadeUp>
          <div className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase text-[#5b8af5]">PersonaForce Trader™</div>
          <h1 className="text-[clamp(24px,4.5vw,38px)] font-black tracking-[-0.8px] mt-3">The 5-Day Trader Identity Challenge™</h1>
          <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] mt-4 max-w-[520px] mx-auto leading-[1.7]">
            Five short sessions. One question: who is placing the trade?
          </p>
        </FadeUp>
      </div>

      {/* DAY SECTIONS with dividers between */}
      {DAYS.map((day, i) => (
        <div key={day.id}>
          <DaySection day={day} />
          {i < DAYS.length - 1 && (
            <div className="px-5 md:px-8">
              <div className="max-w-[860px] mx-auto flex items-center gap-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.1]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#3b6fe8]/50 shrink-0" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.1]" />
              </div>
            </div>
          )}
        </div>
      ))}

      {/* FOOTER — private page, no nav links */}
      <footer className="px-5 md:px-8 py-12 border-t border-white/[0.06] mt-8">
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

export default TraderChallenge;
