/* ------------------------------------------------------------------ *
 *  5-Day Trader Identity Challenge™ — copy + video for each day.      *
 *  Each day renders as its OWN standalone page (no scrolling between  *
 *  days, no links between days). Reflection questions are visual UI   *
 *  only — real capture happens on /trader/trader-intake (GHL form).   *
 * ------------------------------------------------------------------ */
export const CHALLENGE_DAYS = [
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
    vsl: { mediaId: '7if2mpulvx', label: 'Watch Day 1', title: 'The Trader Before the Strategy' },
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
    },
    form: { id: '9qDK09IYldsKXHgSkrsu', height: 1195, name: "TJ Day 1 - Who is Trading?" },
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
    vsl: { mediaId: '0eywl46sxr', label: 'Watch Day 2', title: 'The Moment Before the Click' },
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
    },
    form: { id: 'uCuzvgBeZUR6zHclbKqM', height: 1320, name: "TJ Day 2 -BEFORE THE CLICK" },
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
    vsl: { mediaId: 'oopr3asnnu', label: 'Watch Day 3', title: 'The Voice That Makes the Exception' },
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
    },
    form: { id: 'CvAwq56X1Ypk6S3XQWrI', height: 1166, name: "TJ Day 3 -I KNEW… BUT I…" },
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
    vsl: { mediaId: 'hsiaiayi8m', label: 'Watch Day 4', title: 'Which Trader Takes Over Under Pressure' },
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
    },
    form: { id: 'rnQSR176dCERTCj5vVze', height: 1132, name: "TJ Day 4 — PRESSURE REVEALS" },
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
    vsl: { mediaId: 'mebphpeds3', label: 'Watch Day 5', title: 'The Trader You Are Building' },
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
    },
    // Day 5 is the only day that routes onward — into the map intake.
    form: { id: 'qyFcFF2IWGa8slB3OOvT', height: 1468, name: "TJ Day 5 — FUTURE TRADER / FIRST 5%" },
    completion: {
      title: 'You Completed the Challenge',
      body: ['You now have five days of structured evidence about the trader behind your trades.', 'Your answers have been saved.', 'Your pattern is becoming visible.'],
      next: 'One final step remains: review and confirm the information that will be used to prepare your PersonaForce Trader™ Map.',
      final: true,
    },
  },
];

export default CHALLENGE_DAYS;
