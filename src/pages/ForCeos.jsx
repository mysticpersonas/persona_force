import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight, Quote } from 'lucide-react';
import FadeUp from '../components/FadeUp';

/* ------------------------------------------------------------------ */
/*  For CEOs — executive landing page.                                 */
/*  Same dark identity-intelligence system used across the site:       */
/*  #06081a surface, #3b6fe8 / #5b8af5 brand blue, FadeUp reveals,     */
/*  eyebrow labels, em-highlighted headings, and the same photo        */
/*  treatment used on the lawyer/athlete pages (grayscale -> colour    */
/*  on hover, dark gradient overlays). All imagery lives in /ceo.      */
/* ------------------------------------------------------------------ */

// Hide a broken image gracefully instead of showing the browser's icon.
const imgFallback = (e) => { e.currentTarget.style.opacity = '0'; };

// Primary CTA -> booking flow, with the signature sliding arrow.
const ConsultBtn = ({ label = "Schedule A Consultation", className = "" }) => (
  <Link
    to="/book?source=for-ceos"
    className={`group inline-flex items-center justify-center gap-2 bg-[#3b6fe8] text-white px-6 sm:px-7 py-3.5 rounded-[10px] text-[13.5px] sm:text-[14px] font-semibold shadow-[0_0_28px_rgba(59,111,232,0.28)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_44px_rgba(59,111,232,0.45)] ${className}`}
  >
    {label}
    <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
  </Link>
);

// Small eyebrow label used above every section heading.
const Eyebrow = ({ children }) => (
  <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] text-[#5b8af5] text-[10px] md:text-[11px] font-bold tracking-[0.16em] uppercase py-1.5 px-4 rounded-full">
    <span className="w-[5px] h-[5px] rounded-full bg-[#5b8af5] animate-[pulse_1.5s_ease-in-out_infinite] shrink-0" />
    {children}
  </div>
);

// Full-bleed image band with a dark overlay (mirrors PathwayTemplate's BgSection).
const BgSection = ({ img, children, overlay = "0.86" }) => (
  <section className="relative overflow-hidden py-16 md:py-24 px-5 md:px-8 border-y border-white/[0.06]">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${img})` }} />
    <div className="absolute inset-0" style={{ background: `rgba(6,8,26,${overlay})` }} />
    <div className="relative z-[1] max-w-[1000px] mx-auto w-full">{children}</div>
  </section>
);

const ForCeos = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  // "What PersonaForce reveals" — five identity-level signals.
  const reveals = [
    { num: "01", t: "Leadership Patterns", d: "The recurring ways a leader actually operates when the stakes are real — not the version on the résumé." },
    { num: "02", t: "Execution Breakdowns", d: "The exact point between agreement and action where initiatives quietly stall." },
    { num: "03", t: "Communication Gaps", d: "Why the same message lands with one team and fractures with another." },
    { num: "04", t: "Culture Friction", d: "The hidden identity patterns beneath hesitation, friction, and pushback." },
    { num: "05", t: "Decision Blind Spots", d: "The moments where judgment and presence quietly compound — or erode." },
  ];

  // "Organizational Mapping" — the deliverables that make up the map.
  const orgMapping = [
    "Identity Intelligence Report™",
    "Team Dynamics",
    "Leadership Mapping",
    "Pressure Analysis",
    "Culture Mapping",
  ];

  // "What CEOs actually buy" — the outcomes leadership is really paying for.
  const ceoBuys = [
    "Predictability",
    "Alignment",
    "Visibility",
    "Accountability",
    "Execution",
    "Retention",
    "Leadership Stability",
  ];

  // The PersonaForce Blueprint preview list.
  const blueprint = [
    "Your leadership operating patterns",
    "Pressure-based behavioral tendencies",
    "Communication strengths and vulnerabilities",
    "Hidden performance disruptors",
    "Opportunities for greater alignment and influence",
  ];

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">

      {/* ANNOUNCE BAR */}
      <div className="bg-[#3b6fe8] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 relative z-50 leading-tight">
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV — switches to drawer below lg so 7 links never crowd. */}
      <nav className={`fixed top-[36px] md:top-[44px] w-full z-40 transition-all duration-300 flex justify-center border-b border-white/[0.06] ${isScrolled ? 'bg-[#06081a] md:bg-[#06081a]/95 md:backdrop-blur-md py-3 md:py-4' : 'bg-[#06081a] py-3 md:py-5'}`}>
        <div className="w-full max-w-[1140px] px-5 md:px-8 flex justify-between items-center gap-4">
          <Link to="/" className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force®</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            <Link to="/for-ceos" className="text-[13px] whitespace-nowrap text-[#5b8af5] font-semibold transition-colors">For CEOs</Link>
            <Link to="/ai-manager" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">AI Manager</Link>
            <Link to="/lawyers" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Lawyers</Link>
            <Link to="/sales-identity" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Sales</Link>
            <Link to="/sales-culture" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Organizations</Link>
            <Link to="/athletes" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Athletes</Link>
            <Link to="/free-blueprints" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Free Blueprints</Link>
          </div>

          <div className="flex items-center gap-3.5 md:gap-4">
            <Link to="/book?source=for-ceos" className="hidden lg:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">
              Book a Call
            </Link>
            <button className="lg:hidden text-[#7a7fa8] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu Drawer */}
      <div className={`fixed top-0 right-0 h-full w-[260px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex justify-end mb-8">
          <button className="text-[#7a7fa8] hover:text-white" onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col gap-6">
          <Link to="/for-ceos" className="text-[15px] font-bold text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>For CEOs</Link>
          <Link to="/ai-manager" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>AI Manager</Link>
          <Link to="/lawyers" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Lawyers</Link>
          <Link to="/sales-identity" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Sales</Link>
          <Link to="/sales-culture" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Organizations</Link>
          <Link to="/athletes" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Athletes</Link>
          <Link to="/free-blueprints" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Free Blueprints</Link>
          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book?source=for-ceos" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      <div className="pt-[68px] md:pt-[92px]" /> {/* Spacer for fixed navs */}

      {/* HERO — deep-blue skyline photo behind the dark gradient */}
      <section className="relative text-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/ceo/skyline.jpg)" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#06081a]/[0.78] via-[#06081a]/[0.86] to-[#06081a]" />
        <div className="absolute inset-0 [background-image:linear-gradient(rgba(59,111,232,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,111,232,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] max-w-full h-[240px] [background:radial-gradient(ellipse,rgba(59,111,232,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-[2] max-w-[1000px] mx-auto px-5 md:px-8 py-20 md:py-28">
          <FadeUp>
            <Eyebrow>For CEOs &amp; Executive Teams</Eyebrow>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-[clamp(30px,7vw,60px)] font-black leading-[1.06] tracking-[-1px] text-white mt-6 mb-5 max-w-[820px] mx-auto">
              Why is your team{' '}
              <em className="not-italic bg-gradient-to-br from-[#5b8af5] to-[#a78bfa] bg-clip-text text-transparent">still not executing?</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[16px] text-[#eef0ff]/[0.6] max-w-[620px] mx-auto leading-[1.8]">
              You have talent. You have strategy. You have systems. PersonaForce® reveals what's happening between them.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <div className="flex justify-center mt-9 w-full max-w-[340px] sm:max-w-none mx-auto">
              <ConsultBtn label="Book an Executive Call" className="w-full sm:w-auto" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* THE PROBLEM ISN'T WHAT YOU THINK */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-center"><Eyebrow>The Real Problem</Eyebrow></div>
            <h2 className="text-[clamp(25px,5.5vw,42px)] font-black text-center leading-[1.12] tracking-[-0.5px] mt-5 mb-4">
              The problem isn't <em className="text-[#5b8af5] not-italic">what you think.</em>
            </h2>
            <p className="text-[14px] text-[#eef0ff]/[0.58] text-center max-w-[600px] mx-auto mb-10 md:mb-14 leading-[1.8]">
              Despite new systems, new processes, and new training, the same patterns keep returning. Here's what that actually looks like inside an organization.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5">
            {[
              { t: "Initiatives stall", d: "Momentum builds, then quietly dies somewhere between the decision and the doing." },
              { t: "Communication breaks down", d: "The message is clear in the room — and somehow different the moment people leave it." },
              { t: "High performers become inconsistent", d: "Reliable for months, then unpredictable exactly when it matters most." },
              { t: "Teams execute differently than they agreed", d: "Everyone nods in the meeting, then acts out a different reality afterward." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 90}>
                <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[16px] p-6 md:p-8 h-full transition-all duration-300 hover:bg-[#10132b] hover:border-[#3b6fe8]/[0.32] relative overflow-hidden group">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <h3 className="text-[16px] md:text-[18px] font-bold text-[#eef0ff] mb-2.5">{item.t}</h3>
                  <p className="text-[13px] md:text-[14px] text-[#7a7fa8] leading-[1.65]">{item.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={120}>
            <div className="bg-[#0b0d22] border-l-[3px] border-[#3b6fe8] py-6 px-5 md:py-8 md:px-10 rounded-r-[12px] md:rounded-r-[16px] mt-8 md:mt-10 max-w-[760px] mx-auto">
              <p className="text-[15px] md:text-[18px] text-[#b0b8e8] leading-[1.7] md:leading-[1.75]">
                Because organizations don't execute strategy. <strong className="text-[#eef0ff] font-semibold">People do. And people execute through identity.</strong>
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* THE HIDDEN COST OF LEADERSHIP — executive portrait split */}
      <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0b0d22] border-y border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-center"><Eyebrow>The Hidden Cost of Leadership</Eyebrow></div>
            <h2 className="text-[clamp(25px,5.5vw,42px)] font-black text-center leading-[1.12] tracking-[-0.5px] mt-5 mb-10 md:mb-14">
              Pressure doesn't create behavior.<br className="hidden sm:block" /> <em className="text-[#5b8af5] not-italic">It reveals it.</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <FadeUp>
              <div className="relative rounded-[18px] overflow-hidden aspect-[4/5] sm:aspect-[4/3] md:aspect-[4/5] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550] max-w-[420px] mx-auto md:max-w-none w-full">
                <img src="/ceo/executive.jpg" alt="A leader who looks exceptional on paper" onError={imgFallback} className="w-full h-full object-cover object-top [filter:grayscale(20%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d22]/70 via-transparent to-transparent" />
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <div>
                <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.6] leading-[1.8] mb-6">
                  Every CEO has experienced it. The issue is rarely capability — it's who shows up when pressure arrives. And what gets revealed often determines revenue, culture, retention, innovation, customer experience, and growth.
                </p>
                <div className="flex flex-col gap-3.5">
                  {[
                    { t: "Exceptional on paper", d: "A leader who looks flawless on the résumé — and struggles the moment real pressure lands." },
                    { t: "Suddenly inconsistent", d: "A top performer who becomes unreliable without any clear, nameable reason." },
                    { t: "Knows but doesn't do", d: "A department that understands exactly what to do, yet repeatedly fails to do it." },
                  ].map((item, i) => (
                    <div key={i} className="bg-[#10132b] border border-white/[0.06] rounded-[12px] p-4 md:p-5 hover:border-[#3b6fe8]/[0.32] transition-colors">
                      <h3 className="text-[14px] md:text-[15px] font-bold text-[#eef0ff] mb-1">{item.t}</h3>
                      <p className="text-[12.5px] md:text-[13.5px] text-[#7a7fa8] leading-[1.6]">{item.d}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[13px] md:text-[14px] text-[#7a7fa8] leading-[1.7] mt-5 pl-1">
                  Most organizations never identify the source. They simply treat the symptoms.
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* WHAT PERSONAFORCE REVEALS */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-center"><Eyebrow>The System</Eyebrow></div>
            <h2 className="text-[clamp(25px,5.5vw,42px)] font-black text-center leading-[1.12] tracking-[-0.5px] mt-5 mb-4">
              What PersonaForce® <em className="text-[#5b8af5] not-italic">reveals.</em>
            </h2>
            <p className="text-[14px] text-[#eef0ff]/[0.58] text-center max-w-[640px] mx-auto mb-10 md:mb-14 leading-[1.8]">
              It's not a personality assessment. Not another leadership framework. Not another communication model. It's an Identity Architecture™ system designed to reveal what actually drives behavior under pressure.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4">
            {reveals.map((r, i) => (
              <FadeUp key={i} delay={(i % 3) * 80}>
                <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[16px] p-6 h-full hover:bg-[#10132b] hover:border-[#3b6fe8]/[0.32] transition-all duration-300">
                  <div className="text-[28px] md:text-[34px] font-black text-[#5b8af5] leading-none mb-3">{r.num}</div>
                  <h3 className="text-[15px] font-bold text-[#eef0ff] mb-2 leading-[1.3]">{r.t}</h3>
                  <p className="text-[12.5px] md:text-[13px] text-[#7a7fa8] leading-[1.6]">{r.d}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={120}>
            <div className="bg-[#3b6fe8]/[0.08] border border-[#3b6fe8]/[0.28] rounded-[16px] p-6 md:p-8 mt-8 md:mt-10 text-center max-w-[760px] mx-auto">
              <p className="text-[14px] md:text-[17px] text-[#b0b8e8] leading-[1.7]">
                Most organizations measure behavior. <strong className="text-[#eef0ff] font-semibold">PersonaForce® maps what drives behavior.</strong> The difference is significant — because once you can see the pattern, you can change the outcome.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ORGANIZATIONAL MAPPING — deliverables over a dark boardroom */}
      <BgSection img="/ceo/boardroom.jpg" overlay="0.88">
        <FadeUp>
          <div className="text-center"><Eyebrow>Organizational Mapping</Eyebrow></div>
          <h2 className="text-[clamp(25px,5.5vw,42px)] font-black text-center leading-[1.12] tracking-[-0.5px] mt-5 mb-4 text-white">
            Your organization, <em className="text-[#5b8af5] not-italic">mapped.</em>
          </h2>
          <p className="text-[14px] text-[#eef0ff]/[0.62] text-center max-w-[560px] mx-auto mb-10 md:mb-12 leading-[1.8]">
            Every layer of how your people operate — captured in one living view.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 max-w-[820px] mx-auto">
          {orgMapping.map((m, i) => (
            <FadeUp key={i} delay={(i % 3) * 90}>
              <div className="h-full flex items-center gap-3.5 bg-white/[0.05] backdrop-blur-sm border border-white/[0.1] rounded-[16px] p-5 md:p-6 hover:border-[#3b6fe8]/[0.4] transition-colors">
                <span className="text-[18px] md:text-[22px] font-black text-[#5b8af5] leading-none shrink-0">0{i + 1}</span>
                <p className="text-[14px] md:text-[16px] font-bold text-white leading-[1.3]">{m}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </BgSection>

      {/* BUILT FROM DECADES — lobby photo split */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
              <img src="/ceo/lobby.jpg" alt="Performance in environments where outcomes matter" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(15%)_brightness(0.82)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(0.95)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/55 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <Eyebrow>Built From Decades Of Human Performance</Eyebrow>
              <h2 className="text-[clamp(23px,4.5vw,38px)] font-black leading-[1.14] tracking-[-0.5px] mt-5 mb-4">
                Thirty years studying performance where <em className="text-[#5b8af5] not-italic">outcomes matter.</em>
              </h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] leading-[1.8] mb-7">
                Corporate leadership. Executive teams. Professional athletics. Elite performers. High-pressure organizations. Dr. Travis Fox and Michelle Fox distilled it into the MPHIOS™ and PersonaForce® frameworks — built to map human performance at the identity level. Not who people think they are. Who actually shows up when it matters most.
              </p>
              <div className="flex flex-wrap gap-6 md:gap-10">
                <div><div className="text-[26px] md:text-[34px] font-black text-[#5b8af5] leading-none">30+</div><div className="text-[11px] md:text-[12px] text-[#3a3f60] mt-1.5">Years studying performance</div></div>
                <div><div className="text-[26px] md:text-[34px] font-black text-[#5b8af5] leading-none">5</div><div className="text-[11px] md:text-[12px] text-[#3a3f60] mt-1.5">High-stakes arenas</div></div>
                <div><div className="text-[26px] md:text-[34px] font-black text-[#5b8af5] leading-none">2</div><div className="text-[11px] md:text-[12px] text-[#3a3f60] mt-1.5">Proprietary frameworks</div></div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* WHAT CEOs ACTUALLY BUY */}
      <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0b0d22] border-y border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-center"><Eyebrow>What CEOs Actually Buy</Eyebrow></div>
            <h2 className="text-[clamp(25px,5.5vw,42px)] font-black text-center leading-[1.12] tracking-[-0.5px] mt-5 mb-10 md:mb-12">
              Not a program. <em className="text-[#5b8af5] not-italic">An outcome.</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 md:gap-4 max-w-[860px] mx-auto">
            {ceoBuys.map((b, i) => (
              <FadeUp key={i} delay={(i % 3) * 80}>
                <div className="flex items-center gap-4 bg-[#10132b] border border-white/[0.06] rounded-[14px] p-5 md:p-6 h-full hover:border-[#3b6fe8]/[0.32] transition-colors">
                  <span className="text-[20px] md:text-[24px] font-black text-[#5b8af5] leading-none shrink-0">0{i + 1}</span>
                  <p className="text-[14px] md:text-[16px] font-bold text-[#eef0ff] leading-[1.4]">{b}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* CEO TESTIMONIAL — revealed at the right moment via FadeUp */}
      <section className="py-16 md:py-28 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="text-center mb-10 md:mb-12"><Eyebrow>In A CEO's Words</Eyebrow></div>
          </FadeUp>

          <FadeUp delay={150} threshold={0.25}>
            <figure className="relative overflow-hidden bg-[#0b0d22] border border-[#3b6fe8]/[0.28] rounded-[20px] md:rounded-[24px] shadow-[0_0_60px_rgba(59,111,232,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">

                {/* Photo — ceo1.jpeg */}
                <div className="relative h-[280px] sm:h-[360px] md:h-full md:min-h-[400px] bg-gradient-to-br from-[#101a3a] to-[#1a2550]">
                  <img src="/ceo1.jpeg" alt="Engin Alan" onError={imgFallback} className="w-full h-full object-cover object-center" />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0b0d22] via-[#0b0d22]/10 to-transparent" />
                </div>

                {/* Quote */}
                <div className="p-7 md:p-12 flex flex-col justify-center">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#3b6fe8]/40 mb-4 md:mb-5" />
                  <blockquote className="text-[15px] md:text-[19px] text-[#b0b8e8] leading-[1.7] md:leading-[1.8]">
                    Before working with Travis, I focused on what I wanted to achieve. He helped me uncover something far more important — understanding <em className="text-[#eef0ff] not-italic font-semibold">who I am</em> when I pursue those goals. He has a rare ability to challenge you without breaking you, to reveal blind spots without judgment, and to reconnect you with the strongest version of yourself. Together with Michelle Fox, they built a framework that helped me see myself clearly, think more intentionally, and lead with greater confidence and authenticity.
                  </blockquote>
                  <figcaption className="mt-6 md:mt-8 flex items-center gap-3">
                    <span className="w-8 h-px bg-[#3b6fe8] shrink-0" />
                    <div>
                      <div className="text-[14px] md:text-[15px] font-bold text-[#eef0ff]">Engin Alan</div>
                      <div className="text-[12px] md:text-[13px] text-[#5b8af5] font-semibold">Founder &amp; CEO · Robosme &amp; Binovist</div>
                    </div>
                  </figcaption>
                </div>
              </div>
            </figure>
          </FadeUp>
        </div>
      </section>

      {/* START WITH THE BLUEPRINT — planning photo split */}
      <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0b0d22] border-y border-white/[0.06]">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <FadeUp>
            <div className="relative rounded-[18px] overflow-hidden aspect-[4/3] group shadow-[0_0_40px_rgba(59,111,232,0.1)] bg-gradient-to-br from-[#101a3a] to-[#1a2550] order-1 md:order-none">
              <img src="/ceo/blueprint.jpg" alt="The PersonaForce Blueprint" onError={imgFallback} className="w-full h-full object-cover [filter:grayscale(15%)_brightness(0.85)] transition-all duration-[450ms] group-hover:scale-[1.04] group-hover:[filter:grayscale(0%)_brightness(1)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06081a]/45 to-transparent" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <div>
              <Eyebrow>Start Here</Eyebrow>
              <h2 className="text-[clamp(23px,4.5vw,38px)] font-black leading-[1.14] tracking-[-0.5px] mt-5 mb-4">
                Start with the <em className="text-[#5b8af5] not-italic">Blueprint.</em>
              </h2>
              <p className="text-[14px] text-[#eef0ff]/[0.58] leading-[1.8] mb-6">
                Most leaders never see the patterns driving their results. In just a few minutes, the PersonaForce® Blueprint gives you a personalized starting point — not theory, not generic advice.
              </p>
              <div className="flex flex-col gap-3 mb-7">
                {blueprint.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 text-[13.5px] md:text-[14.5px] text-[#cdd3f0] leading-[1.5]">
                    <span className="w-[20px] h-[20px] rounded-full bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] flex items-center justify-center shrink-0 text-[#5b8af5] text-[11px] font-bold mt-px">{i + 1}</span>
                    {b}
                  </div>
                ))}
              </div>
              <ConsultBtn label="Book a Call" className="w-full sm:w-auto" />
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL THOUGHT / CTA — over dark corporate towers */}
      <section className="py-16 md:py-24 px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto">
          <FadeUp>
            <div className="relative overflow-hidden border border-[#3b6fe8]/[0.28] rounded-[20px] md:rounded-[24px] p-9 md:p-[64px_56px] text-center shadow-[0_0_60px_rgba(59,111,232,0.08)]">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/ceo/towers.jpg)" }} />
              <div className="absolute inset-0 bg-[#06081a]/[0.9]" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              <div className="relative z-[1] flex flex-col items-center">
                <Eyebrow>The Final Thought</Eyebrow>
                <h2 className="text-[clamp(25px,5vw,44px)] font-black tracking-[-0.5px] leading-[1.12] mt-6 mb-5 max-w-[720px] mx-auto text-white">
                  The greatest risk is invisible patterns inside <em className="text-[#5b8af5] not-italic">visible success.</em>
                </h2>
                <p className="text-[14px] md:text-[16px] text-[#eef0ff]/[0.62] max-w-[560px] mx-auto mb-9 leading-[1.8]">
                  The organizations that thrive won't simply have better strategies. They'll have greater awareness of the people executing them. Start by discovering what's currently driving yours.
                </p>
                <ConsultBtn label="Book a Call" className="w-full max-w-[420px] sm:w-auto" />
                <div className="text-[12px] text-[#eef0ff]/[0.45] mt-4 font-medium">See who shows up when it matters most.</div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#7a7fa8]">
        <div className="max-w-[960px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 PersonaForce® | All Rights Reserved</p>
          <div className="flex justify-center gap-4 md:gap-7 flex-wrap font-medium">
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Whitepaper</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#eef0ff] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ForCeos;
