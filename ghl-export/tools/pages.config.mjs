// Every Trader's Journey page being moved to GoHighLevel.
//
//   key      id used by the exporter (matches ssr-entry.jsx)
//   route    where the page lives on personaforce.co today
//   slug     the GHL page path to create (yourdomain.com/<slug>)
//   title    GHL page settings > SEO title
//   index    false = tick "noindex" in GHL page settings (private funnel step)
//
// Change a slug here and re-run the exporter: every link between the pages is
// rewritten from this table, so they stay in sync.

export const PAGES = [
  { key: 'trader', route: '/trader', slug: 'trader', title: "The Trader's Journey · Private 5-Day Identity Pilot", index: true },
  { key: 'traderThankYou', route: '/trader/thank-you', slug: 'trader-thank-you', title: "You're In · The Trader's Journey", index: false },
  { key: 'traderChallenge', route: '/trader/trader-challenge', slug: 'trader-challenge', title: "The Trader's Journey · 5-Day Challenge", index: false },
  { key: 'day1', route: '/trader/day1', slug: 'trader-day1', title: "Day 1 of 5, Who Is the Trader? · The Trader's Journey", index: false },
  { key: 'day2', route: '/trader/day2', slug: 'trader-day2', title: "Day 2 of 5, The Invisible Trade · The Trader's Journey", index: false },
  { key: 'day3', route: '/trader/day3', slug: 'trader-day3', title: null, index: false },
  { key: 'day4', route: '/trader/day4', slug: 'trader-day4', title: null, index: false },
  { key: 'day5', route: '/trader/day5', slug: 'trader-day5', title: null, index: false },
  { key: 'traderIntake', route: '/trader/trader-intake', slug: 'trader-intake', title: "Map Intake · The Trader's Journey", index: false },
  { key: 'intakeThankYou', route: '/trader/intake-thank-you', slug: 'trader-intake-thank-you', title: 'Thank You · PersonaForce Trader™', index: false },
  { key: 'orientationReplay', route: '/trader/orientation-replay', slug: 'trader-orientation-replay', title: 'Orientation Replay · PersonaForce Trader™', index: false },
  { key: 'traderBlueprint', route: '/trader/blueprint', slug: 'trader-blueprint', title: "Free Trader Blueprint · The Trader's Journey", index: false },
  { key: 'traderBlueprintThankYou', route: '/trader/blueprintthankyou', slug: 'trader-blueprint-thank-you', title: "Thank You · The Trader's Journey", index: false },
  { key: 'pft30', route: '/trader/pft-30day', slug: 'trader-pft-30day', title: '30-Day Mapping · PersonaForce Trader™', index: false },
  { key: 'pft60', route: '/trader/pft-60day', slug: 'trader-pft-60day', title: '60-Day Mapping · PersonaForce Trader™', index: false },
  { key: 'pft90', route: '/trader/pft-90day', slug: 'trader-pft-90day', title: '90-Day Deep Identity Mapping · PersonaForce Trader™', index: false },
  { key: 'optIn', route: '/opt-in', slug: 'opt-in', title: 'Opt-In · PersonaForce Trader™', index: false },
  { key: 'optInThankYou', route: '/opt-in-thank-you', slug: 'opt-in-thank-you', title: 'You’re In · PersonaForce Trader™', index: false },
];

// Links to pages that are NOT moving stay on the main site.
export const MAIN_SITE = 'https://www.personaforce.co';
