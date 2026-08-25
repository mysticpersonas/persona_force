import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import {
  ArrowRight,
  Check
} from 'lucide-react';
import FadeUp from '../components/FadeUp';

/* ------------------------------------------------------------------ */
/*  IMAGES — local copies in /public/culture.                         */
/*  Swap with real assets by overwriting files (keep the same names). */
/* ------------------------------------------------------------------ */
const IMG = {
  hero: "/culture/hero.jpg",
  split: "/culture/split.jpg",
  changesBg: "/culture/changes-bg.jpg",
  final: "/culture/final.jpg",
};

const CARDS = [
  { img: "/culture/card-standards.jpg", title: "Sales Standards", desc: "Install a repeatable sales system your team can execute daily." },
  { img: "/culture/card-pressure.jpg", title: "Culture Under Pressure", desc: "Train performance and communication when stakes rise." },
  { img: "/culture/card-leadership.jpg", title: "Leadership Coaching", desc: "Equip managers to coach, correct, and lead consistently." },
  { img: "/culture/card-accountability.jpg", title: "Accountability Rhythm", desc: "Build ownership and follow-through without micromanaging." },
];

const LAYERS = [
  {
    num: "01",
    title: "Map the Breakdown",
    what: <><strong className="text-white">What we do:</strong> We identify <em className="italic text-[#eef0ff]/70">where performance actually collapses</em> inside your sales environment. This isn't "more scripts." This is finding the real friction points that destroy consistency.</>,
    groups: [{ heading: "We uncover:", items: [
      "Where reps lose confidence mid-call",
      "Where managers overcorrect, rescue, or micromanage",
      "Where pipeline stalls due to hesitation, avoidance, or emotional resistance",
      "Where culture becomes reactive under quota pressure",
    ] }],
    outcome: "You stop guessing what's wrong, and start training what's real.",
  },
  {
    num: "02",
    title: "Install a Repeatable Sales Standard",
    what: <><strong className="text-white">What we do:</strong> We replace inconsistency with a shared execution framework. PersonaForce creates one clear operating standard your team can run every day:</>,
    groups: [
      { heading: null, items: ["Before calls", "During objections", "After rejection", "In high-pressure weeks", "When momentum drops"] },
      { heading: "This creates:", items: ["Consistent follow-through", "Predictable pipeline behavior", "Stronger sales conversations", "Fewer emotional swings across the team"] },
    ],
    outcome: "Sales becomes repeatable, not personality-dependent.",
  },
  {
    num: "03",
    title: "Installing the System",
    what: <><strong className="text-white">What we do:</strong> Identify the moment where most teams fail: <em className="italic text-[#eef0ff]/70">pressure.</em> Pressure doesn't just reduce skill, it changes decision-making.</>,
    groups: [{ heading: "PersonaForce trains your team to perform when:", items: [
      "The prospect pushes back",
      "The rep feels rejected",
      "The leader feels urgency",
      "The team feels quota pressure",
      "The culture gets tense",
    ] }],
    outcome: "Your team stays sharp and confident when it matters most.",
  },
  {
    num: "04",
    title: "Reinforce Culture Through Leadership",
    what: <><strong className="text-white">What we do:</strong> We make the system stick through leadership behavior. Because sales culture is not built by values on a wall, it's built by what leaders tolerate, reward, and reinforce daily.</>,
    groups: [{ heading: "PersonaForce trains leaders to:", items: [
      "Coach without control",
      "Correct without shame",
      "Set standards without emotional escalation",
      "Lead consistently even under pressure",
    ] }],
    outcome: "Your culture becomes stable, and your sales team stops cycling through burnout, inconsistency, and turnover.",
  },
];

const YOULL_SEE = [
  "More confident sales conversations",
  "Cleaner follow-up + pipeline discipline",
  "Less blame, more ownership",
  "Stronger leadership presence in the room",
  "Faster coaching, fewer repeated mistakes",
  "A culture that holds under quota pressure",
];

// Reusable primary CTA -> booking flow, with the sliding arrow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book?source=sales-culture"
    className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    Schedule A Consultation
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

const CheckBubble = () => (
  <span className="w-[18px] h-[18px] rounded-full bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5] mt-px">
    <Check className="w-2.5 h-2.5" strokeWidth={3} />
  </span>
);

// Small accent dash used in the layer lists
const Dash = () => <span className="w-[6px] h-[2px] rounded-full bg-[#3b6fe8] shrink-0 mt-[9px]" />;

const imgFallback = (e) => { e.currentTarget.style.opacity = '0'; };

const SalesCulture = () => {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      <SiteNav />

      <div className="pt-[68px] md:pt-[92px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.hero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06081a]/[0.84] via-[#06081a]/[0.7] to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full mb-6">
              <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              Sales &amp; Culture Training
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,5.5vw,54px)] font-display font-normal leading-[1.06] tracking-[-0.015em] text-white mb-4 max-w-[720px] mx-auto">
              Culture Is the Sum of<br />
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">Repeated Identities.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.58] max-w-[600px] mx-auto leading-[1.8] mb-7">
              Culture isn't what you say. It's who consistently shows up.
            </p>
          </FadeUp>
          <FadeUp delay={300}><ConsultBtn /></FadeUp>
        </div>
      </section>

      {/* SPLIT — Pressure Reveals Culture */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src={IMG.split} alt="Sales team under pressure" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(10%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/40 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <h2 className="text-[clamp(20px,2.8vw,28px)] font-display font-normal leading-[1.18] tracking-[-0.4px] mb-4">
                Pressure Reveals Culture.<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Identity Determines Results.</em>
              </h2>
              <p className="text-[13.5px] md:text-[14px] text-[#eef0ff]/[0.58] leading-[1.8]">
                PersonaForce™ trains the internal operating system behind performance so sales teams stay consistent, communicate cleanly, and execute with confidence when it matters most.
              </p>
              <ConsultBtn className="mt-6" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* BANNER */}
      <div className="relative overflow-hidden border-y border-[#3b6fe8]/[0.28] bg-gradient-to-br from-[#3b6fe8]/[0.08] to-[#7c3bed]/[0.06] py-14 md:py-16 text-center px-5 md:px-8">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[160px] [background:radial-gradient(ellipse,rgba(59,111,232,0.1)_0%,transparent_70%)] pointer-events-none" />
        <FadeUp>
          <div className="relative z-[1] max-w-[1000px] mx-auto">
            <h2 className="text-[clamp(20px,3vw,30px)] font-display font-normal tracking-[-0.3px] mb-5">
              When testimony matters, <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">behavior matters more.</em>
            </h2>
            <ConsultBtn />
          </div>
        </FadeUp>
      </div>

      {/* MPHIAS — 4 LAYER SYSTEM */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2 text-center">How Real Change Actually Happens</div>
            <h2 className="text-[clamp(22px,3.5vw,34px)] font-display font-normal text-center leading-[1.12] tracking-[-0.015em] mb-3">
              MPHIAS™, A <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">4-Layer System</em>
            </h2>
            <p className="text-[14px] text-[#eef0ff]/[0.58] text-center max-w-[560px] mx-auto mb-10 leading-[1.8]">
              PersonaForce is a 4-layer system that stabilizes performance under pressure by training execution, leadership, and culture, not just tactics.
            </p>
          </FadeUp>

          <div className="flex flex-col gap-3 max-w-[820px] mx-auto">
            {LAYERS.map((layer, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="bg-white/[0.04] border border-white/[0.07] rounded-[16px] overflow-hidden transition-colors hover:border-[#3b6fe8]/[0.28]">
                  {/* Header */}
                  <div className="flex items-center gap-3.5 p-5 md:p-6 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-[9px] bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] flex items-center justify-center text-[12px] font-bold text-[#5b8af5] shrink-0">{layer.num}</div>
                    <div className="text-[14px] md:text-[15px] font-bold text-white">{layer.title}</div>
                  </div>
                  {/* Body */}
                  <div className="p-5 md:p-6 md:pt-5">
                    <p className="text-[13px] text-[#eef0ff]/[0.58] leading-[1.75] mb-4">{layer.what}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                      {layer.groups.map((g, gi) => (
                        <div key={gi}>
                          {g.heading && <div className="text-[12px] font-bold text-white mb-2.5">{g.heading}</div>}
                          <div className="flex flex-col gap-2">
                            {g.items.map((it, ii) => (
                              <div key={ii} className="flex items-start gap-2.5 text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.5]">
                                <Dash />{it}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="inline-flex items-start gap-2 bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[10px] py-2.5 px-3.5 mt-5 text-[12.5px] text-[#eef0ff]/[0.58] leading-[1.55]">
                      <strong className="text-white shrink-0">Outcome:</strong> {layer.outcome}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <div className="text-center mt-9"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* 4 PHOTO CARDS */}
      <section className="pb-16 md:pb-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {CARDS.map((c, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="relative rounded-[14px] overflow-hidden aspect-[3/4] group bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                  <img src={c.img} alt={c.title} onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(25%)_brightness(0.8)] transition-all duration-[450ms] group-hover:scale-[1.05] group-hover:[filter:grayscale(0%)_brightness(1)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06081a] via-[#06081a]/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="text-[13px] md:text-[14px] font-bold text-white mb-1.5 leading-[1.3]">{c.title}</div>
                    <div className="text-[11px] md:text-[11.5px] text-[#eef0ff]/[0.6] leading-[1.5]">{c.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT THIS TRAINING CHANGES */}
      <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${IMG.changesBg})` }} />
        <div className="absolute inset-0 bg-[#06081a]/[0.86]" />
        <div className="relative z-[1] max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-[10px] md:text-[11px] font-bold tracking-[0.18em] uppercase text-[#5b8af5] mb-2">Results</div>
            <h2 className="text-[clamp(20px,3.5vw,32px)] font-display font-normal leading-[1.12] tracking-[-0.015em] mb-3">
              What This Training Changes
            </h2>
            <p className="text-[13.5px] text-[#eef0ff]/[0.58] max-w-[680px] leading-[1.8]">
              PersonaForce Sales &amp; Culture Training aligns your team around one standard of execution so performance stays consistent even when pressure rises.
            </p>
            <p className="text-[11px] text-[#eef0ff]/[0.26] font-bold uppercase tracking-[0.1em] mt-6 mb-3.5">You'll See:</p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[680px]">
            {YOULL_SEE.map((y, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div className="flex items-start gap-3 text-[13px] text-[#eef0ff]/[0.58] leading-[1.5]">
                  <CheckBubble />{y}
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={120}>
            <div className="mt-8"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL SPLIT CTA */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550] order-2 md:order-1">
              <img src={IMG.final} alt="A team that holds under pressure" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(10%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/40 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100} className="order-1 md:order-2">
            <div>
              <h2 className="text-[clamp(20px,3vw,30px)] font-display font-normal leading-[1.18] tracking-[-0.4px] mb-3.5">
                Ready to Build a Team That<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Holds Under Pressure?</em>
              </h2>
              <p className="text-[13.5px] md:text-[14px] text-[#eef0ff]/[0.58] leading-[1.8] mb-5">
                PersonaForce Sales &amp; Culture Training installs the standards, coaching, and accountability your team needs to perform consistently, without burnout or breakdown.
              </p>
              <ConsultBtn />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER (same as home) */}
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#8790bb]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PersonaForce™ | All Rights Reserved</p>
          <div className="flex justify-center gap-4 md:gap-7 flex-wrap font-medium">
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Whitepaper</a>
            <a href="/privacy" className="hover:text-[#eef0ff] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#eef0ff] transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SalesCulture;
