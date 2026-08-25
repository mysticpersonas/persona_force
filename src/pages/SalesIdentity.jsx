import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';

import FadeUp from '../components/FadeUp';

// Small check icon used throughout the page (matches the doc's accent checkmarks)
const Check = ({ className = "" }) => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6l3 3 5-5" />
  </svg>
);

const PERSONAS = [
  { img: "/sales/persona-win.jpg", title: "Desire to Win", desc: "The competitive drive that pushes for results and achievement." },
  { img: "/sales/persona-approval.jpg", title: "Need for Approval", desc: "The part seeking validation and acceptance from others." },
  { img: "/sales/persona-safety.jpg", title: "Safety Mechanism", desc: "The protective instinct that avoids risk and confrontation." },
  { img: "/sales/persona-shutdown.jpg", title: "Shutdown Response", desc: "The freeze state that emerges under extreme pressure." },
];

const COLLAPSE = [
  ["Confidence fragments", " into doubt"],
  ["Messaging shifts", " from clear to confused"],
  ["Tone collapses", " from authoritative to uncertain"],
  ["Follow-up weakens", " from consistent to sporadic"],
  ["Culture erodes", " from strong to fragile"],
];

const STEPS = [
  { title: "1) Identify Who Is Currently Driving Behavior", desc: "Build awareness of which internal persona is in control during sales interactions." },
  { title: "2) Recognize Shadow Personas That Sabotage Outcomes", desc: "Spot destructive patterns that undermine performance and derail deals." },
  { title: "3) Activate the Optimal Persona in Real Time", desc: "Learn how to shift into the most effective persona for each sales moment." },
  { title: "4) Maintain Internal Alignment Under Pressure", desc: "Keep the right persona stable even when stress peaks and stakes rise." },
];

const OUTCOMES = [
  { title: "Decisions Speed Up", desc: "Identity eliminates hesitation and internal debate." },
  { title: "Messaging Stays Clean", desc: "Communication remains consistent and compelling." },
  { title: "Authority Holds on Calls", desc: "Presence stays strong throughout the conversation." },
  { title: "Follow-Through Becomes Automatic", desc: "Execution happens without constant willpower." },
  { title: "Leaders Model Consistency", desc: "Management sets a stable tone that builds trust." },
];

const DAY1 = [
  "Sales identity architecture (how internal personas are structured)",
  "Persona mapping under pressure (what shows up when it counts)",
  "Shadow pattern interruption (stop sabotage in real time)",
  "Live application to real sales scenarios from your business",
];

const DAY2 = [
  "Persona activation protocols (systematic persona switching)",
  "Deal-stage identity alignment (right persona for each phase)",
  "Leadership embodiment (authority + presence that holds)",
  "Cultural enforcement principles (team identity standards that last)",
];

const PHASE_INCLUDES = [
  ["Live calibration", " using real challenges"],
  ["Reinforcement of identity standards", ""],
  ["Correction of early drift", " before old habits return"],
  ["Leadership confidence installation", " so your company runs the system without us"],
];

// Reusable primary CTA -> booking flow
const ConsultBtn = ({ className = "" }) => (
  <Link
    to="/book?source=sales-identity"
    className={`inline-block bg-[#3b6fe8] hover:scale-[1.02] transition-transform duration-200 text-white px-8 py-4 rounded-[10px] text-[15px] font-semibold shadow-[0_0_40px_rgba(59,111,232,0.3)] ${className}`}
  >
    Schedule A Consultation
  </Link>
);

const SalesIdentity = () => {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      <SiteNav />

      <div className="pt-[80px] md:pt-[110px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="relative pt-[60px] md:pt-[90px] pb-16 md:pb-20 text-center overflow-hidden px-5 md:px-8">
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_60%_40%,rgba(59,111,232,0.14)_0%,transparent_65%),radial-gradient(ellipse_at_20%_80%,rgba(124,58,237,0.1)_0%,transparent_60%)]" />
        <div className="relative z-[1] max-w-[880px] mx-auto">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.14em] uppercase py-[7px] px-[18px] rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              Sales Identity Training
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(32px,5.5vw,56px)] font-display font-normal leading-[1.08] tracking-[-0.015em] text-white mb-[22px] max-w-[760px] mx-auto">
              Find What's Killing <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">The Sale.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[16px] text-[#eef0ff]/60 max-w-[620px] mx-auto mb-3.5 leading-[1.75]">
              Most sales teams don't lose deals because they lack skill.<br />
              They lose deals because <strong className="text-white">the wrong identity shows up.</strong>
            </p>
          </FadeUp>
          <FadeUp delay={300}><ConsultBtn className="mt-4" /></FadeUp>
        </div>
      </section>

      <div className="h-px bg-white/[0.07]" />

      {/* PERSONA CARDS */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">The 4 Internal Personas</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-3.5">
              What shows up when<br />pressure <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">hits.</em>
            </h2>
            <p className="text-[15px] text-[#eef0ff]/60 text-center max-w-[580px] mx-auto mb-12 leading-[1.75]">
              Inside every salesperson, four identity states compete for control. Knowing which one is driving, and when, is the difference between closing and collapsing.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PERSONAS.map((p, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="group bg-white/[0.04] border border-white/[0.07] rounded-[14px] overflow-hidden transition-all duration-200 hover:border-[#3b6fe8]/[0.28] hover:-translate-y-0.5 h-full">
                  <div className="w-full h-[160px] relative overflow-hidden bg-gradient-to-br from-[#0d1635] to-[#1a2550]">
                    <img src={p.img} alt={p.title} onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="w-full h-full object-cover object-center [filter:grayscale(25%)_brightness(0.78)] transition-all duration-[450ms] group-hover:scale-[1.05] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06081a] via-[#06081a]/30 to-transparent" />
                  </div>
                  <div className="py-[18px] px-4">
                    <div className="text-[15px] font-bold text-white mb-[7px]">{p.title}</div>
                    <div className="text-[13px] text-[#eef0ff]/60 leading-[1.6]">{p.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.07]" />

      {/* SPLIT — Traditional Training */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
            <FadeUp>
              <div className="group relative rounded-[14px] overflow-hidden border border-white/[0.07] aspect-[4/3] bg-gradient-to-br from-[#0d1635] to-[#1a2550]">
                <img src="/sales/traditional.jpg" alt="Traditional sales training" onError={(e) => { e.currentTarget.style.opacity = '0'; }} className="w-full h-full object-cover [filter:grayscale(20%)_brightness(0.8)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/60 to-transparent" />
              </div>
            </FadeUp>
            <FadeUp delay={100}>
              <div>
                <h2 className="text-[clamp(22px,3.5vw,32px)] font-display font-normal leading-[1.2] tracking-[-0.4px] mb-4">
                  Traditional Sales Training<br />Assumes <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">One Person.</em>
                </h2>
                <p className="text-[14px] text-[#eef0ff]/60 leading-[1.75] mb-2.5">
                  High performers are not single state operators.<br />They are <strong className="text-white">multi-person systems</strong> and that's why most sales training creates short-term improvement that fades under real-world pressure.
                </p>
                <p className="text-[14px] text-[#eef0ff]/60 leading-[1.75] mb-2.5">When pressure rises, everything changes:</p>
                <div className="flex flex-col gap-2.5 my-5">
                  {COLLAPSE.map(([b, rest], i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#eef0ff]/60 leading-[1.5]">
                      <div className="w-5 h-5 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 mt-px text-[#5b8af5]">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <div><strong className="text-white">{b}</strong>{rest}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[14px] text-[#eef0ff]/60 mt-3.5">Motivation doesn't fix this.<br /><strong className="text-white text-[15px]">Identity stabilization does.</strong></div>
                <ConsultBtn className="mt-6" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* BANNER */}
      <div className="bg-white/[0.04] border-y border-white/[0.07] py-14 text-center px-5 md:px-8">
        <FadeUp>
          <div className="max-w-[880px] mx-auto">
            <h2 className="text-[clamp(22px,4vw,36px)] font-display font-normal tracking-[-0.4px] mb-5">
              When testimony matters, <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">behavior matters more.</em>
            </h2>
            <ConsultBtn />
          </div>
        </FadeUp>
      </div>

      {/* WHAT PERSONAFORCE IS */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">What PersonaForce Is</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-3.5">
              A Human Identity<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Architecture System.</em>
            </h2>
            <div className="text-[14px] text-[#eef0ff]/60 leading-[1.75] max-w-[680px] mx-auto mb-2 text-center">
              PersonaForce trains individuals and teams to master the mechanics of identity.<br />This isn't motivational speaking.<br />This isn't surface-level mindset work.<br />This is identity mechanics applied to sales, a systematic approach to controlling who shows up in high-stakes moments.
            </div>
          </FadeUp>
          <div className="flex flex-col max-w-[680px] mx-auto mt-6">
            {STEPS.map((s, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className={`flex gap-4 py-5 ${i < STEPS.length - 1 ? 'border-b border-white/[0.07]' : ''}`}>
                  <div className="w-6 h-6 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 mt-0.5 text-[#5b8af5]">
                    <Check className="w-[11px] h-[11px]" />
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-white mb-[5px]">{s.title}</div>
                    <div className="text-[13px] text-[#eef0ff]/60 leading-[1.65]">{s.desc}</div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOME STRIP */}
      <div className="py-14 md:py-16 bg-white/[0.04] border-y border-white/[0.07] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">When Identity Stabilizes</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-3.5">
              When Identity Stabilizes,<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Revenue Follows.</em>
            </h2>
            <div className="text-[15px] text-[#eef0ff]/60 max-w-[640px] mx-auto mb-10 text-center leading-[1.75]">
              When the right persona stays online, performance becomes predictable. Execution becomes consistent. Results become scalable. This isn't about working harder, it's about operating from a stable identity foundation that doesn't collapse under pressure.
            </div>
          </FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {OUTCOMES.map((o, i) => (
              <FadeUp key={i} delay={i * 70}>
                <div className="bg-[#06081a] border border-[#3b6fe8]/[0.28] rounded-[14px] py-5 px-4 text-center h-full">
                  <div className="text-[13px] font-bold text-white mb-2 leading-[1.3]">{o.title}</div>
                  <div className="text-[12px] text-[#eef0ff]/[0.28] leading-[1.5]">{o.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp>
            <div className="text-center mt-10"><ConsultBtn /></div>
          </FadeUp>
        </div>
      </div>

      {/* THE INTENSIVE */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">The Programme</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-10">
              The PersonaForce<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Sales Identity Intensive</em>
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <div className="bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-7 md:p-10">
              <div className="inline-block bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.12em] uppercase py-[5px] px-3.5 rounded-full mb-4">2-Day Training Programme</div>
              <div className="text-[clamp(20px,3vw,28px)] font-display font-normal text-white mb-2.5 tracking-[-0.3px]">A comprehensive 2-day training program</div>
              <div className="text-[14px] text-[#eef0ff]/60 mb-8 leading-[1.7]">Available <strong className="text-white">onsite or virtually</strong> where identity becomes operational and results become repeatable.</div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-7">
                {[{ label: "Day 1", title: "Foundation & Framework", items: DAY1 }, { label: "Day 2", title: "Application & Integration", items: DAY2 }].map((day, di) => (
                  <div key={di} className="bg-white/[0.03] border border-white/[0.07] rounded-[12px] py-6 px-5">
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#5b8af5] mb-2.5">{day.label}</div>
                    <div className="text-[14px] font-bold text-white mb-3.5">{day.title}</div>
                    <div className="flex flex-col gap-[7px]">
                      {day.items.map((it, ii) => (
                        <div key={ii} className="text-[13px] text-[#eef0ff]/60 flex gap-2 items-start leading-[1.5]">
                          <span className="text-[#3b6fe8] shrink-0 text-[12px] mt-px">›</span>{it}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[12px] py-6 px-5 mb-6">
                <div className="text-[14px] font-bold text-white mb-2">4–8 Weeks to Internal Ownership</div>
                <div className="text-[13px] text-[#eef0ff]/60 leading-[1.7]">After the intensive, we guide leadership through a structured transition period designed to ensure the system takes root permanently. <strong className="text-white">1 hour per week for 4–8 weeks</strong>, using real scenarios from your business for live calibration.</div>
              </div>

              <div className="text-[13px] font-bold text-white mb-3.5">This Phase Includes:</div>
              <div className="flex flex-col gap-2">
                {PHASE_INCLUDES.map(([b, rest], i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[14px] text-[#eef0ff]/60 leading-[1.5]">
                    <div className="w-5 h-5 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 mt-px text-[#5b8af5]">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <div><strong className="text-white">{b}</strong>{rest}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pb-14 md:pb-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="bg-white/[0.04] border border-[#3b6fe8]/[0.28] rounded-[20px] p-9 md:p-[56px_48px] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.14em] uppercase py-[7px] px-[18px] rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Ready to begin
              </div>
              <h2 className="text-[clamp(26px,4vw,42px)] font-display font-normal tracking-[-0.015em] mb-4">
                Identity Stabilizes.<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Revenue Follows.</em>
              </h2>
              <p className="text-[15px] text-[#eef0ff]/60 max-w-[480px] mx-auto mb-8 leading-[1.75]">
                One call is all it takes to see the exact identity patterns holding your team back, and the path to installing stability that performs under pressure.
              </p>
              <ConsultBtn />
              <div className="text-[12px] text-[#eef0ff]/[0.28] mt-3">No obligation · Built for sales leaders & teams</div>
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

export default SalesIdentity;
