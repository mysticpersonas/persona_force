// ---------------------------------------------------------------------------
// Page-aware booking copy.
//
// WHY THIS EXISTS:
// The /book page used to show one generic message no matter where the visitor
// came from. That kills relevance — a sales leader and a trial attorney are not
// booking the same conversation. This map lets every CTA carry a `?source=`
// tag, and the booking page renders copy that matches the context the visitor
// was just reading. Same calendar embed for all — only the framing changes.
//
// HOW TO USE:
//   <Link to="/book?source=sales-identity"> ... </Link>
// Book.jsx reads the param and looks up the entry below (falling back to
// `default` for unknown / missing sources, e.g. someone landing on /book cold).
//
// SHAPE of each entry:
//   eyebrow  – small uppercase badge label
//   title    – array of segments; { accent: true } renders in brand blue
//   intro    – supporting paragraph under the headline
//   bullets  – trust / value points; `bold` is highlighted, `text` follows
// ---------------------------------------------------------------------------

// Universal trust signals — reused where the visitor is booking for themselves.
const personBullets = [
  { bold: '30 minutes.', text: 'No pitch. No pressure. Pure intelligence.' },
  { bold: 'With Travis Fox or Michelle Fox', text: 'directly, not a sales rep.' },
  { bold: 'Limited to 6 sessions per month.', text: 'Spots fill fast.' },
  { bold: '', text: "You'll leave knowing something about your identity architecture you've never seen before." },
];

// Team / organization framing — for leaders booking on behalf of a company.
const orgBullets = [
  { bold: '30 minutes.', text: 'No pitch. No pressure. Pure intelligence.' },
  { bold: 'With Travis Fox or Michelle Fox', text: 'directly, not a sales rep.' },
  { bold: 'Limited to 6 sessions per month.', text: 'Spots fill fast.' },
  { bold: '', text: "You'll leave seeing your organization's identity map in a way you never have before." },
];

const bookingCopy = {
  // ---- Default / Home -----------------------------------------------------
  default: {
    eyebrow: 'Identity mapping session',
    title: [{ t: "Let's see who you become " }, { t: 'under pressure.', accent: true }],
    intro:
      "In 30 minutes, we'll map the identity architecture beneath your performance — the drivers, the shadow patterns, the exact points where pressure causes collapse, and a clear path to stabilise it.",
    bullets: personBullets,
  },
  home: {
    eyebrow: 'Identity mapping session',
    title: [{ t: "Let's see who you become " }, { t: 'under pressure.', accent: true }],
    intro:
      "In 30 minutes, we'll map the identity architecture beneath your performance — the drivers, the shadow patterns, the exact points where pressure causes collapse, and a clear path to stabilise it.",
    bullets: personBullets,
  },

  // ---- AI Manager ---------------------------------------------------------
  'ai-manager': {
    eyebrow: 'Strategy call',
    title: [{ t: "See your organization's " }, { t: 'identity map.', accent: true }],
    intro:
      "In 30 minutes, we'll show you what AI Manager would reveal about your team — where communication friction is hiding, how your people perform under pressure, and how PersonaForce can be customised for your organization.",
    bullets: [
      { bold: 'What AI Manager reveals', text: 'about how your team communicates, collaborates, and performs.' },
      { bold: 'Where friction is hiding', text: 'across leadership, departments, and customer-facing roles.' },
      { bold: 'With Travis Fox or Michelle Fox', text: 'directly, not a sales rep.' },
      { bold: '', text: "You'll leave with a clear picture of your organization's identity map." },
    ],
  },

  // ---- For CEOs -----------------------------------------------------------
  'for-ceos': {
    eyebrow: 'Leadership strategy call',
    title: [{ t: 'See the identities ' }, { t: 'driving your company.', accent: true }],
    intro:
      "In 30 minutes, we'll map where pressure, conflict, and performance gaps are most likely to emerge across your leadership and teams — and the leverage points to get ahead of them.",
    bullets: orgBullets,
  },

  // ---- Sales Identity -----------------------------------------------------
  'sales-identity': {
    eyebrow: 'Sales identity session',
    title: [{ t: 'See the identity patterns ' }, { t: 'holding your team back.', accent: true }],
    intro:
      "In 30 minutes, we'll map what shows up when your sellers hit pressure — the persona that closes, the shadow patterns that sabotage deals, and the path to stabilising performance on every call.",
    bullets: personBullets,
  },

  // ---- Sales & Culture ----------------------------------------------------
  'sales-culture': {
    eyebrow: 'Culture mapping session',
    title: [{ t: 'See how your team ' }, { t: 'really communicates.', accent: true }],
    intro:
      "In 30 minutes, we'll map your team's communication dynamics — how departments interact, where culture erodes under pressure, and how to install standards that actually hold.",
    bullets: orgBullets,
  },

  // ---- Athletes -----------------------------------------------------------
  athletes: {
    eyebrow: 'Performance session',
    title: [{ t: 'See who you become ' }, { t: 'on game day.', accent: true }],
    intro:
      "In 30 minutes, we'll map the identity architecture beneath your performance — what drives you, what collapses under pressure, and the path to performing when everything's on the line.",
    bullets: personBullets,
  },

  // ---- Lawyers (hub) ------------------------------------------------------
  lawyers: {
    eyebrow: 'Case strategy session',
    title: [{ t: 'See the behavior ' }, { t: 'behind the testimony.', accent: true }],
    intro:
      "In 30 minutes, we'll show you how identity mapping sharpens jury selection, witness prep, and deposition strategy — so you read the room before it reads you.",
    bullets: personBullets,
  },
  'jury-analysis': {
    eyebrow: 'Jury strategy session',
    title: [{ t: 'Read the jury ' }, { t: 'before they decide.', accent: true }],
    intro:
      "In 30 minutes, we'll show you how PersonaForce maps juror identity — how they process, persuade, and pressure each other — so you shape the room instead of guessing at it.",
    bullets: personBullets,
  },
  'witness-identity': {
    eyebrow: 'Witness prep session',
    title: [{ t: 'Know how your witness ' }, { t: 'holds under pressure.', accent: true }],
    intro:
      "In 30 minutes, we'll show you how identity mapping reveals how a witness performs on the stand — where they crack, where they convince, and how to prepare them for cross.",
    bullets: personBullets,
  },
  'deposition-identity': {
    eyebrow: 'Deposition strategy session',
    title: [{ t: 'See who shows up ' }, { t: 'in the room.', accent: true }],
    intro:
      "In 30 minutes, we'll show you how PersonaForce maps deposition behavior — how identity shifts under questioning, and how to use it to control the record.",
    bullets: personBullets,
  },

  // ---- Free Blueprints (lead-gen FORM, not a booking) ---------------------
  // NOTE: this is the only source Book.jsx renders as a form instead of the
  // calendar. Keep the framing about entering details / receiving a Blueprint.
  'free-blueprints': {
    eyebrow: 'Free Identity Blueprint',
    title: [{ t: 'Get your free ' }, { t: 'Identity Blueprint.', accent: true }],
    intro:
      "Enter your details and we'll build your free PersonaForce™ Identity Blueprint — a first look at the drivers, the shadow patterns, and the exact points where pressure causes collapse. Delivered straight to your inbox.",
    bullets: [
      { bold: 'Free.', text: 'Takes under two minutes to request.' },
      { bold: 'Built on the PersonaForce framework', text: 'by Travis Fox and Michelle Fox.' },
      { bold: 'Delivered privately to your inbox.', text: 'No pitch. No pressure.' },
      { bold: '', text: "You'll see something about your identity architecture you've never seen before." },
    ],
  },
};

// Resolve a `?source=` value to a copy entry, always returning something safe.
export const getBookingCopy = (source) =>
  (source && bookingCopy[source]) || bookingCopy.default;

export default bookingCopy;
