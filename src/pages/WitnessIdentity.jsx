import PathwayTemplate from '../components/PathwayTemplate';

const cfg = {
  pathwayLabel: "Pathway 02 · Witness Identity",
  hero: {
    img: "/witness/hero.jpg",
    titleA: "Prepare the Witness.",
    titleEm: "Protect the Testimony.",
    secondaryLabel: "Free Profile",
    form: { id: "D2Sc4W1jASxKOOsEt6LA", title: "Witness Pressure Analysis", height: 2075 },
    body: <>Most preparation focuses on what to say. PersonaForce prepares your witness for <strong className="text-white">how they will respond under pressure.</strong> Stabilize emotional reactions, prevent breakdowns, and protect credibility before the deposition or trial begins.</>,
  },
  problem: {
    img: "/witness/problem.jpg",
    titleA: "The Problem With Traditional",
    titleEm: "Witness Preparation.",
    blocks: [
      { heading: "Most witness prep focuses on:", items: ["facts", "timelines", "rehearsed answers", "legal positioning"] },
      { heading: "But testimony breaks down because of:", items: ["emotional triggers", "trauma activation", "pressure response", "fear and defensiveness", "loss of composure"] },
    ],
    callout: <>The real risk isn't incorrect testimony. It's: <strong className="text-white">A triggered witness under pressure.</strong></>,
  },
  intro: {
    titleA: "Introducing Witness Identity",
    titleEm: "Stabilization™",
    lead: "PersonaForce maps how your witness responds under stress so you can prepare them to stay grounded, clear, and controlled.",
    listHeading: "We identify:",
    list: [
      "Emotional triggers and activation points",
      "Trauma response patterns",
      "Pressure-induced communication shifts",
      "Defensiveness vs shutdown behavior",
      "Moments where credibility is most at risk",
    ],
  },
  cards: [
    { img: "/witness/card-1.jpg", title: "Witness Identity Profile", desc: "Understand how your witness processes pressure and questioning." },
    { img: "/witness/card-2.jpg", title: "Trigger Mapping", desc: "Identify exactly what may emotionally activate them." },
    { img: "/witness/card-3.jpg", title: "Response Control Strategy", desc: "Prepare how they can stay grounded and composed." },
    { img: "/witness/card-4.jpg", title: "Credibility Protection", desc: "Reduce behaviors that undermine trust or clarity." },
  ],
  checklist: {
    img: "/witness/prevent-bg.jpg",
    title: "What You Can Prevent Before It Happens",
    lead: "Before trial you receive:",
    items: [
      { title: "Emotional Reactivity", desc: "Where frustration, fear, or overwhelm may surface." },
      { title: "Trigger Points", desc: "Topics or phrasing that activate defensive or emotional responses." },
      { title: "Breakdown Threshold", desc: "When composure begins to weaken." },
      { title: "Communication Disruption", desc: "Moments where clarity turns into confusion, over-explaining, or contradiction." },
    ],
  },
  whyChanges: {
    img: "/witness/why.jpg",
    title: "Why This Changes Outcomes",
    rows: [
      { label: "Most attorneys try to:", value: "prepare what the witness will say" },
      { label: "PersonaForce helps you:", value: "stabilize how the witness will respond" },
    ],
    note: <>Because under pressure, people don't access rehearsed answers — they revert to emotional patterns. And those patterns can be prepared for.</>,
  },
  trauma: {
    img: "/witness/trauma-bg.jpg",
    title: "Trauma-Informed Preparation",
    lead: <>Some witnesses are not just under pressure — they are navigating <strong className="text-white">trauma responses.</strong></>,
    listHeading: "PersonaForce provides:",
    list: [
      "Trauma-aware preparation protocols",
      "Emotional regulation strategies",
      "Coaching for high-stress testimony environments",
      "Guidance to maintain stability under questioning",
    ],
    closing: <>This is not about scripting answers. <strong className="text-white">It's about stabilizing the person giving them.</strong></>,
  },
  finalCta: {
    titleA: "Prepare the witness.",
    titleEm: "Protect the testimony.",
    body: "One call is all it takes to see exactly how identity intelligence protects your witness — and your case — before the pressure ever hits.",
  },
};

const WitnessIdentity = () => <PathwayTemplate cfg={cfg} />;
export default WitnessIdentity;
