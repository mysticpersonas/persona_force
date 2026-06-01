import PathwayTemplate from '../components/PathwayTemplate';

const cfg = {
  pathwayLabel: "Pathway 03 · Deposition Identity",
  hero: {
    img: "/deposition/hero.jpg",
    titleA: "Win the Deposition",
    titleEm: "Before Trial Begins.",
    secondaryLabel: "Free Blueprint",
    body: <>Traditional preparation focuses on questions. PersonaForce prepares you for the person answering them. Map how a witness thinks, reacts, deflects, and <strong className="text-white">breaks under pressure</strong> before you ever depose them.</>,
  },
  problem: {
    img: "/deposition/problem.jpg",
    titleA: "The Problem With Traditional",
    titleEm: "Deposition Strategy.",
    blocks: [
      { heading: "Most attorneys prepare for:", items: ["facts", "timelines", "contradictions", "legal positioning"] },
      { heading: "But depositions are decided by:", items: ["emotional triggers", "pressure response", "communication patterns", "defensiveness vs control", "cognitive fatigue"] },
    ],
    callout: <>The real question isn't: <strong className="text-white">What will they say?</strong> It's: <strong className="text-white">How will they behave when pressure is applied?</strong></>,
  },
  intro: {
    titleA: "Introducing Deposition Identity",
    titleEm: "Mapping™",
    lead: "PersonaForce analyzes how an individual operates under questioning.",
    listHeading: "We map:",
    list: [
      "Decision patterns under pressure",
      "Emotional triggers and defensiveness",
      "Evasion vs over-explanation tendencies",
      "Control vs collapse behavior",
      "Communication style under stress",
    ],
  },
  cards: [
    { img: "/deposition/card-1.jpg", title: "Identity Profile", desc: "Understand how the individual thinks, reacts, and responds under questioning." },
    { img: "/deposition/card-2.jpg", title: "Emotional Trigger Mapping", desc: "Identify what topics create pressure, defensiveness, or instability." },
    { img: "/deposition/card-3.jpg", title: "Response Pattern Analysis", desc: "Predict when they will deflect, over-explain, or contradict themselves." },
    { img: "/deposition/card-4.jpg", title: "Pressure Breakdown Points", desc: "Know where composure weakens and leverage becomes available." },
  ],
  checklist: {
    img: "/deposition/predict-bg.jpg",
    title: "What You Can Predict Before the Deposition",
    lead: "Before trial you receive:",
    items: [
      { title: "Response Patterns", desc: "How they answer when confident vs when exposed." },
      { title: "Emotional Activation", desc: "What topics trigger defensiveness, frustration, or overreaction." },
      { title: "Pressure Threshold", desc: "When composure starts to break." },
      { title: "Communication Shifts", desc: "When they become evasive, verbose, or contradictory." },
    ],
  },
  whyChanges: {
    img: "/deposition/why.jpg",
    title: "Why This Changes Depositions",
    rows: [
      { label: "Most attorneys try to:", value: "control the questions" },
      { label: "PersonaForce helps you:", value: "control which persona answers the questions" },
    ],
    note: <>Because people don't respond logically under pressure — they respond predictably. And predictable behavior can be prepared for.</>,
  },
  builtFor: {
    img: "/deposition/builtfor-bg.jpg",
    title: "Built for High-Stakes Depositions",
    lead: "Used for:",
    items: ["corporate disputes", "medical malpractice", "personal injury", "executive depositions", "high exposure litigation"],
    closing: "When millions are on the line, guesswork costs the case.",
  },
  thisIsNot: {
    img: "/deposition/thisisnot.jpg",
    titleA: "This Is Not Deposition Prep.",
    titleEm: "It Is Deposition Psychology.",
    rows: ["Traditional preparation focuses on content.", "PersonaForce focuses on behavior."],
    note: <>Because the strongest leverage in a deposition is not what is said — it's how it is said under pressure.</>,
  },
  finalCta: {
    titleA: "Win the deposition.",
    titleEm: "Before trial begins.",
    body: "One call is all it takes to see exactly how identity intelligence turns the deposition into your advantage — before the first question is asked.",
  },
};

const DepositionIdentity = () => <PathwayTemplate cfg={cfg} />;
export default DepositionIdentity;
