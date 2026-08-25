import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import {
  ArrowRight
} from 'lucide-react';
import FadeUp from '../components/FadeUp';

// Every booking CTA on this page carries its source so /book renders
// AI-Manager-specific copy instead of the generic message.
const BOOK_HREF = '/book?source=ai-manager';

// Small check icon — matches the accent checkmarks used across the site.
const Check = ({ className = '' }) => (
  <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 6l3 3 5-5" />
  </svg>
);

const CheckBubble = ({ size = 'w-5 h-5' }) => (
  <span className={`${size} rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5] mt-px`}>
    <Check className="w-2.5 h-2.5" strokeWidth={3} />
  </span>
);

// Primary CTA -> page-aware booking flow.
const ConsultBtn = ({ className = '', label = 'Book a Consultation' }) => (
  <Link
    to={BOOK_HREF}
    className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-7 py-3.5 rounded-[10px] text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    {label}
    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

// What AI Manager helps organizations see.
const SEES = [
  'Communication Drift',
  'Leadership Stress',
  'Sales Friction',
  'Culture Instability',
  'Performance Variability',
];

// The four views that make up the identity map.
const VIEWS = [
  { tag: 'Individual View', title: 'How each person naturally communicates.', desc: 'Every employee receives a PersonaForce profile that maps their natural communication style.' },
  { tag: 'Team View', title: 'How departments interact.', desc: 'See how groups collaborate, where they align, and where they pull against each other.' },
  { tag: 'Leadership View', title: 'Where pressure builds.', desc: 'Surface where conflict, friction, and performance gaps are most likely to emerge.' },
  { tag: 'Organization View', title: 'A complete identity map.', desc: 'Every profile combines into a single, living map of how your company communicates.' },
];

// What the custom implementation delivers today.
const CUSTOM = [
  'Assess employees',
  'Build communication maps',
  'Identify friction points',
  'Create management reports',
  'Deliver strategic recommendations',
];

// What the future AI Manager portal will do.
const FUTURE = [
  'Analyze team dynamics',
  'Track organizational patterns',
  'Surface communication risks',
  'Support leadership decisions',
  'Provide ongoing development insights',
];

// What the strategy call reveals.
const REVEALS = [
  'What AI Manager would reveal about your team',
  'Where communication friction may be hiding',
  'How PersonaForce can be customized for your organization',
];

const AiManager = () => {

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      <SiteNav />

      <div className="pt-[80px] md:pt-[110px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="relative pt-[60px] md:pt-[90px] pb-16 md:pb-20 text-center overflow-hidden px-5 md:px-8">
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_60%_40%,rgba(59,111,232,0.14)_0%,transparent_65%),radial-gradient(ellipse_at_20%_80%,rgba(124,58,237,0.1)_0%,transparent_60%)]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.035)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="relative z-[1] max-w-[880px] mx-auto">
          <FadeUp>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.14em] uppercase py-[7px] px-[18px] rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
              AI Manager
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(32px,5.5vw,56px)] font-display font-normal leading-[1.08] tracking-[-0.015em] text-white mb-[22px] max-w-[800px] mx-auto">
              The Future of Human Performance Is<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">Identity Intelligence™</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[16px] text-[#eef0ff]/60 max-w-[640px] mx-auto mb-3.5 leading-[1.8]">
              See identity patterns before they become performance problems.
            </p>
          </FadeUp>
          <FadeUp delay={300}><ConsultBtn className="mt-4" label="Schedule a Strategy Call" /></FadeUp>
        </div>
      </section>

      <div className="h-px bg-white/[0.07]" />

      {/* WHAT AI MANAGER DOES */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">What It Detects</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-3.5">
              Helps organizations <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">see.</em>
            </h2>
            <p className="text-[15px] text-[#eef0ff]/60 text-center max-w-[580px] mx-auto mb-12 leading-[1.75]">
              The patterns that drive performance are usually invisible. AI Manager makes them visible, across every person, team, and conversation.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SEES.map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div className="flex items-center gap-3 bg-white/[0.04] border border-white/[0.07] rounded-[12px] py-4 px-5 h-full transition-colors hover:border-[#3b6fe8]/[0.28]">
                  <CheckBubble />
                  <div className="text-[14px] text-[#eef0ff]/80 font-medium leading-[1.4]">{item}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px bg-white/[0.07]" />

      {/* IDENTITY MAP — 4 VIEWS */}
      <section className="py-14 md:py-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-2.5 text-center">Your Organization's Identity Map</div>
            <h2 className="text-[clamp(24px,4vw,38px)] font-display font-normal text-center leading-[1.15] tracking-[-0.4px] mb-3.5">
              Every profile combines into<br />one <em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">living map.</em>
            </h2>
            <p className="text-[15px] text-[#eef0ff]/60 text-center max-w-[580px] mx-auto mb-12 leading-[1.75]">
              Every employee receives a PersonaForce profile. Those profiles combine to create four layers of visibility into how your company actually works.
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {VIEWS.map((v, i) => (
              <FadeUp key={i} delay={i * 80}>
                <div className="group bg-white/[0.04] border border-white/[0.07] rounded-[16px] p-6 md:p-7 h-full transition-all duration-200 hover:border-[#3b6fe8]/[0.28] hover:-translate-y-0.5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-full bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5] text-[12px] font-display font-normal">{i + 1}</div>
                    <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#5b8af5]">{v.tag}</div>
                  </div>
                  <div className="text-[17px] font-bold text-white mb-2 leading-[1.3]">{v.title}</div>
                  <div className="text-[13.5px] text-[#eef0ff]/60 leading-[1.65]">{v.desc}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM IMPLEMENTATION + FUTURE VISION */}
      <div className="py-14 md:py-16 bg-white/[0.04] border-y border-white/[0.07] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {/* Today */}
          <FadeUp>
            <div className="bg-[#06081a] border border-white/[0.07] rounded-[18px] p-7 md:p-8 h-full">
              <div className="inline-block bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.12em] uppercase py-[5px] px-3.5 rounded-full mb-4">Available Today</div>
              <h3 className="text-[20px] font-display font-normal text-white mb-2 tracking-[-0.3px]">A Custom Implementation</h3>
              <p className="text-[13.5px] text-[#eef0ff]/60 leading-[1.7] mb-6">Today, AI Manager is delivered as a customized service. Our team works directly with your organization to:</p>
              <div className="flex flex-col gap-3">
                {CUSTOM.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#eef0ff]/70 leading-[1.5]">
                    <CheckBubble />{item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
          {/* Future */}
          <FadeUp delay={120}>
            <div className="bg-[#06081a] border border-[#3b6fe8]/[0.28] rounded-[18px] p-7 md:p-8 h-full">
              <div className="inline-block bg-[#7c3bed]/[0.15] border border-[#7c3bed]/[0.3] text-[#a78bfa] text-[11px] font-bold tracking-[0.12em] uppercase py-[5px] px-3.5 rounded-full mb-4">The Future Vision</div>
              <h3 className="text-[20px] font-display font-normal text-white mb-2 tracking-[-0.3px]">Your Own AI Manager Portal</h3>
              <p className="text-[13.5px] text-[#eef0ff]/60 leading-[1.7] mb-6">Eventually, organizations will have a dedicated portal, an AI trained on the PersonaForce framework that can:</p>
              <div className="flex flex-col gap-3">
                {FUTURE.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#eef0ff]/70 leading-[1.5]">
                    <span className="w-5 h-5 rounded-full bg-[#7c3bed]/[0.15] border border-[#7c3bed]/[0.3] flex items-center justify-center shrink-0 text-[#a78bfa] mt-px">
                      <Check className="w-2.5 h-2.5" strokeWidth={3} />
                    </span>{item}
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* WHY LEADERS LOVE IT */}
      <section className="py-16 md:py-24 text-center px-5 md:px-8">
        <FadeUp>
          <div className="max-w-[760px] mx-auto">
            <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#5b8af5] mb-5">Why Leaders Love It</div>
            <h2 className="text-[clamp(24px,4vw,40px)] font-display font-normal tracking-[-0.015em] leading-[1.15] mb-6">
              Most managers are forced to guess.<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">AI Manager provides visibility.</em>
            </h2>
            <p className="text-[16px] text-[#eef0ff]/60 leading-[1.8] max-w-[600px] mx-auto">
              Not just into performance, into the <strong className="text-white">identities driving performance.</strong> Because when you understand how people communicate under pressure, you can build stronger teams, stronger leaders, and stronger organizations.
            </p>
          </div>
        </FadeUp>
      </section>

      {/* FINAL CTA */}
      <section className="pb-14 md:pb-[72px] px-5 md:px-8">
        <div className="max-w-[880px] mx-auto">
          <FadeUp>
            <div className="bg-white/[0.04] border border-[#3b6fe8]/[0.28] rounded-[20px] p-9 md:p-[56px_48px] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[11px] font-bold tracking-[0.14em] uppercase py-[7px] px-[18px] rounded-full mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
                Schedule a Strategy Call
              </div>
              <h2 className="text-[clamp(24px,4vw,40px)] font-display font-normal tracking-[-0.015em] leading-[1.15] mb-4">
                Curious what your organization's<br /><em className="italic bg-[linear-gradient(102deg,#ffffff_0%,#c3d3ff_40%,#5b8af5_100%)] bg-clip-text text-transparent">identity map looks like?</em>
              </h2>
              <p className="text-[15px] text-[#eef0ff]/60 max-w-[520px] mx-auto mb-7 leading-[1.75]">
                In one call, we'll show you exactly what AI Manager would reveal about your team.
              </p>
              <div className="flex flex-col gap-2.5 max-w-[440px] mx-auto mb-9 text-left">
                {REVEALS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-[14px] text-[#eef0ff]/70 leading-[1.5]">
                    <CheckBubble />{item}
                  </div>
                ))}
              </div>
              <ConsultBtn />
              <div className="text-[12px] text-[#eef0ff]/[0.28] mt-3">No obligation · Built for leaders & organizations</div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
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

export default AiManager;
