import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';
import FadeUp from '../components/FadeUp';

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleComingSoon = (e) => {
    e.preventDefault();
    if (isMenuOpen) setIsMenuOpen(false);
    setToastMessage("Coming Soon!");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const testimonials = [
    {
      quote: "First program that gave me a system, not just a framework. Understanding my shadow personas and how to shift out of pressure in real time changed how I handle every high stakes negotiation.",
      author: "Marcus T., VP of Sales"
    },
    {
      quote: "Tone, persona, structure, three days in and I see every conversation differently. This isn't training. It's a completely different way of operating.",
      author: "James R., Sales Director"
    },
    {
      quote: "The energy kept the entire room locked in. Learning to recognise my dark personas and control them under pressure was the most practical self awareness work I've ever done.",
      author: "Leila K., Executive Coach"
    }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white">
      
      {/* ANNOUNCE BAR — fixed at top; slides up out of view once scrolled so the nav can take its place with no blank gap */}
      <div className={`fixed top-0 left-0 w-full bg-[#3b6fe8] text-white text-center py-2.5 px-4 md:px-6 text-[10.5px] md:text-[13px] font-semibold tracking-wide flex justify-center items-center gap-2 z-50 leading-tight transition-transform duration-300 ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full animate-[pulse_1.4s_ease-in-out_infinite] shrink-0" />
        Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
      </div>

      {/* NAV — sits below the announce bar at rest, then slides up to top-0 on scroll as the bar leaves */}
      <nav className={`fixed w-full z-40 transition-all duration-300 flex justify-center border-b border-white/[0.06] ${isScrolled ? 'top-0 bg-[#06081a] md:bg-[#06081a]/95 md:backdrop-blur-md py-3 md:py-4' : 'top-[36px] md:top-[44px] bg-[#06081a] py-3 md:py-5'}`}>
        <div className="w-full max-w-[1140px] px-5 md:px-8 flex justify-between items-center gap-4">

          <div className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain" />
            <div className="text-[14px] md:text-base font-extrabold tracking-[-0.3px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force™</span>
            </div>
          </div>

          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            <Link to="/for-ceos" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">For CEOs</Link>
            <Link to="/ai-manager" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">AI Manager</Link>
            <Link to="/lawyers" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Lawyers</Link>
            <Link to="/sales-identity" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Sales</Link>
            <Link to="/sales-culture" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Organizations</Link>
            <Link to="/athletes" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Athletes</Link>
            <Link to="/trader" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Traders</Link>
            <Link to="/free-blueprints" className="text-[13px] whitespace-nowrap text-[#7a7fa8] hover:text-white transition-colors">Free Blueprints</Link>
          </div>

          <div className="flex items-center gap-3.5 md:gap-4">
            <Link to="/book?source=home" className="hidden lg:block bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-colors">
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
          <Link to="/for-ceos" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>For CEOs</Link>
          <Link to="/ai-manager" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>AI Manager</Link>
          <Link to="/lawyers" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Lawyers</Link>
          <Link to="/sales-identity" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Sales</Link>
          <Link to="/sales-culture" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Organizations</Link>
          <Link to="/athletes" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Athletes</Link>
          <Link to="/trader" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Traders</Link>
          <Link to="/free-blueprints" className="text-[15px] font-bold text-[#eef0ff] hover:text-[#5b8af5]" onClick={() => setIsMenuOpen(false)}>Free Blueprints</Link>

          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book?source=home" className="flex justify-center bg-[#3b6fe8] text-white px-5 py-2.5 rounded-lg text-[13px] font-bold w-full" onClick={() => setIsMenuOpen(false)}>
              Book a Call
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#3b6fe8] text-white px-5 py-2.5 rounded-full text-[13px] md:text-sm font-bold shadow-[0_0_20px_rgba(59,111,232,0.4)] z-50 animate-[fadeUp_0.3s_ease_both]">
          {toastMessage}
        </div>
      )}

      <div className="pt-[80px] md:pt-[110px]" /> {/* Spacer for fixed navs */}

      {/* HERO */}
      <section className="pt-8 md:pt-16 pb-10 md:pb-12 text-center px-5 md:px-8">
        <div className="max-w-[1000px] mx-auto flex flex-col items-center">
          <FadeUp delay={0}>
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.18] border border-[#3b6fe8]/[0.32] text-[#5b8af5] text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase py-1.5 md:py-2 px-3.5 md:px-5 rounded-full mb-5 md:mb-8">
              Identity Intelligence™ System
            </div>
          </FadeUp>
          
          <FadeUp delay={100}>
            <h1 className="text-[34px] sm:text-[46px] md:text-[68px] lg:text-[76px] font-black leading-[1.05] tracking-[-1px] md:tracking-[-1.5px] text-[#eef0ff] max-w-[900px] mx-auto mb-4 md:mb-6">
              You don't have a<br/>performance problem.<br/>
              <em className="text-[#5b8af5] not-italic">You have an identity problem.</em>
            </h1>
          </FadeUp>
          
          <FadeUp delay={200}>
            <p className="text-[14px] md:text-[19px] text-[#7a7fa8] max-w-[640px] mx-auto leading-[1.6] mt-1 md:mt-4">
              PersonaForce™ reveals who shows up under pressure—so leaders, teams, athletes and organizations can perform with clarity, consistency and confidence.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* VSL */}
      <section className="pb-8 md:pb-12 px-5 md:px-8">
        <div className="max-w-[900px] mx-auto">
          <FadeUp delay={300}>
            <div className="w-full max-w-[760px] mx-auto rounded-[14px] md:rounded-[24px] overflow-hidden bg-black border border-[#3b6fe8]/[0.32] shadow-[0_0_40px_rgba(59,111,232,0.12),0_15px_30px_rgba(0,0,0,0.4)] md:shadow-[0_0_80px_rgba(59,111,232,0.22),0_32px_80px_rgba(0,0,0,0.7)] relative">
              <wistia-player media-id="ey25sbhvm4" aspect="1.7777777777777777"></wistia-player>
            </div>
          </FadeUp>

          <FadeUp delay={400}>
            <p className="text-center text-[11px] md:text-[13px] text-[#3a3f60] mt-3 md:mt-5">
              Watch free · No email required · 12 minutes
            </p>
          </FadeUp>
          
          <FadeUp delay={500}>
            <div className="flex justify-center mt-5 md:mt-8">
              <Link to="/book?source=home" className="bg-[#3b6fe8] hover:bg-[#3b6fe8]/90 text-white px-6 py-3 md:px-8 md:py-4 rounded-[10px] md:rounded-xl text-[14px] md:text-[16px] font-bold shadow-[0_0_24px_rgba(59,111,232,0.15)] md:shadow-[0_0_30px_rgba(59,111,232,0.2)] transition-all hover:scale-[1.02]">
                Book My Mapping Session
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-2.5 bg-[#10132b] border border-white/[0.06] rounded-lg md:rounded-[10px] py-3 px-5 md:py-3.5 md:px-6 mx-auto mt-5 md:mt-8 max-w-[480px] text-[12px] md:text-sm font-semibold text-center sm:text-left">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3b6fe8] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shrink-0 hidden sm:block" />
              <p className="text-[#eef0ff]">Mapping sessions this month: <span className="text-[#5b8af5]">6 spots remaining</span></p>
            </div>
          </FadeUp>
        </div>
      </section>

      <div className="max-w-[1000px] mx-auto px-5 md:px-8"><div className="h-px bg-white/[0.06] mt-8 md:mt-16" /></div>

      {/* WHAT IS COSTING YOU RESULTS */}
      <section className="pt-12 md:pt-20 pb-12 md:pb-16 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black text-center mb-8 md:mb-14 tracking-[-0.5px] leading-[1.15]">
              What is costing you <em className="text-[#5b8af5] not-italic block sm:inline">results?</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-5">
            {[
              { role: "Leaders", q: "Why is my team still not executing?" },
              { role: "Sales", q: "Why are deals stalling?" },
              { role: "Athletes", q: "Why does performance change under pressure?" },
              { role: "Organizations", q: "Why does culture break down despite training?" }
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[14px] md:rounded-[16px] p-6 md:p-8 relative overflow-hidden transition-all duration-300 hover:bg-[#10132b] hover:border-[#3b6fe8]/[0.32] group h-full flex flex-col">
                  <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#5b8af5] mb-3 md:mb-4">{item.role}</div>
                  <h3 className="text-[18px] md:text-[24px] font-bold text-[#eef0ff] leading-[1.3]">{item.q}</h3>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SEE WHAT OTHERS MISS */}
      <section className="py-12 md:py-24 px-5 md:px-8 bg-[#0b0d22] border-y border-white/[0.06] flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black text-center mb-8 md:mb-16 tracking-[-0.5px] leading-[1.15]">
              See what others <em className="text-[#5b8af5] not-italic block sm:inline">miss.</em>
            </h2>
          </FadeUp>

          <div className="flex flex-col">
            {[
              { most: "Most systems train behavior.", pf: "PersonaForce™ maps identity." },
              { most: "Most systems teach communication.", pf: "PersonaForce™ reveals who is communicating." },
              { most: "Most systems improve skills.", pf: "PersonaForce™ identifies who takes over when pressure arrives." }
            ].map((row, i) => (
              <FadeUp key={i} delay={i * 100}>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 items-center py-6 md:py-8 border-b border-white/[0.06] last:border-0">
                  <p className="text-[15px] md:text-[19px] text-[#7a7fa8] leading-[1.5] text-center md:text-right">{row.most}</p>
                  <div className="hidden md:flex w-9 h-9 rounded-full bg-[#3b6fe8]/[0.12] border border-[#3b6fe8]/[0.28] items-center justify-center shrink-0 mx-auto">
                    <ArrowRight className="w-4 h-4 text-[#5b8af5]" />
                  </div>
                  <p className="text-[16px] md:text-[21px] font-bold text-[#eef0ff] leading-[1.4] text-center md:text-left">{row.pf}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* POWERED BY MINDPERSONAS */}
      <section className="py-12 md:py-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full flex flex-col items-center">
          <FadeUp>
            <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black text-center mb-6 md:mb-8 tracking-[-0.5px] leading-[1.15] max-w-[820px] mx-auto">
              Powered by the MindPersonas<sup className="text-[0.55em] font-bold align-super">™</sup> <em className="text-[#5b8af5] not-italic">Human Identity Operating System<sup className="text-[0.55em] font-bold align-super">™</sup></em>
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="flex flex-col items-center mb-8 md:mb-12">
              <div className="text-[48px] md:text-[72px] font-black text-[#5b8af5] leading-none">30+</div>
              <div className="text-[11px] md:text-[13px] font-bold tracking-[2px] uppercase text-[#7a7fa8] mt-2">Years</div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="flex flex-wrap justify-center gap-2.5 md:gap-3 max-w-[760px] mx-auto">
              {["Corporate", "Athletics", "Leadership", "Sales", "Performance", "Identity Architecture™"].map((tag, i) => (
                <span key={i} className="bg-[#0b0d22] border border-white/[0.08] hover:border-[#3b6fe8]/[0.32] transition-colors text-[#b0b8e8] text-[13px] md:text-[15px] font-semibold py-2.5 px-5 md:py-3 md:px-6 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* HOSTS */}
      <section className="py-12 md:py-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <div className="text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#5b8af5] mb-2.5 md:mb-3 text-center">The People Behind It</div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black text-center mb-8 md:mb-16 tracking-[-0.5px] leading-[1.15]">
              Built by people who've <em className="text-[#5b8af5] not-italic block sm:inline">lived this work.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[16px] md:rounded-[20px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-5 md:gap-10 items-start mb-5 md:mb-6 hover:border-[#3b6fe8]/[0.32] transition-colors">
              <div className="w-20 h-20 md:w-[140px] md:h-[140px] rounded-full bg-[#161933] border-2 border-[#3b6fe8]/[0.32] flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_24px_rgba(59,111,232,0.1)]">
                <img src="/tf.jpg" alt="Dr. Travis Fox" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#5b8af5] mb-1.5 md:mb-2">Creator & Lead Architect</div>
                <h3 className="text-[24px] md:text-[30px] font-black mb-1 md:mb-2 text-[#eef0ff]">Dr. Travis Fox</h3>
                <div className="text-[12px] md:text-[14px] text-[#5b8af5] font-semibold mb-3 md:mb-5 leading-tight">PhD in Psychology · Emmy Award Winning Producer · Clinical Hypnotherapist</div>
                <p className="text-[13.5px] md:text-[15px] text-[#7a7fa8] leading-[1.65] md:leading-[1.7] mb-3 md:mb-4">With over 30 years of experience guiding more than a million individuals, Dr. Travis Fox is the mastermind behind the Identity Architecture™ that powers PersonaForce™. He specializes in decoding how the human nervous system, identity, and decision making function when placed under extreme pressure.</p>
                <p className="text-[13.5px] md:text-[15px] text-[#7a7fa8] leading-[1.65] md:leading-[1.7]">Drawing from his extensive background in psychology, he translates subconscious processing into field usable frameworks. He doesn't just analyze behavior he engineers the precise system architecture that allows leaders to predict, stabilize, and redirect their responses in real time.</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mt-5 md:mt-6">
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">30+</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Years of experience</div></div>
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">1M+</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Individuals guided</div></div>
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">25+</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Years in pressure fields</div></div>
                </div>
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[16px] md:rounded-[20px] p-6 md:p-10 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-5 md:gap-10 items-start hover:border-[#3b6fe8]/[0.32] transition-colors">
              <div className="w-20 h-20 md:w-[140px] md:h-[140px] rounded-full bg-[#161933] border-2 border-[#3b6fe8]/[0.32] flex items-center justify-center shrink-0 mx-auto md:mx-0 overflow-hidden shadow-[0_0_24px_rgba(59,111,232,0.1)]">
                <img src="/mf.jpg" alt="Michelle Fox" className="w-full h-full object-cover" />
              </div>
              <div className="text-center md:text-left">
                <div className="text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#5b8af5] mb-1.5 md:mb-2">Co Creator & Integration Lead</div>
                <h3 className="text-[24px] md:text-[30px] font-black mb-1 md:mb-2 text-[#eef0ff]">Michelle Fox</h3>
                <div className="text-[12px] md:text-[14px] text-[#5b8af5] font-semibold mb-3 md:mb-5 leading-tight">Somatic Hypnotherapist · Expert Trauma Navigator · Mapping Practitioner</div>
                <p className="text-[13.5px] md:text-[15px] text-[#7a7fa8] leading-[1.65] md:leading-[1.7] mb-3 md:mb-4">As the Co Creator of PersonaForce™, Michelle Fox is the Lead Alchemist who integrates Human Identity Architecture™ into practical application. Her rare expertise in somatic and subconscious pattern work allows her to decode the quiet, dangerous state shifts that derail performance under pressure.</p>
                <p className="text-[13.5px] md:text-[15px] text-[#7a7fa8] leading-[1.65] md:leading-[1.7]">Michelle specializes in translating complex behavioral loops into clear, actionable frameworks. She trains leaders and teams to recognize subtle signs of hypervigilance and collapse ensuring they can navigate high stakes moments without escalating or retreating, while maintaining complete operational control.</p>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8 mt-5 md:mt-6">
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">15+</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Years in pattern work</div></div>
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">200+</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Organisations served</div></div>
                  <div><div className="text-[20px] md:text-[28px] font-black text-[#eef0ff] leading-none">98%</div><div className="text-[10px] md:text-[12px] text-[#3a3f60] mt-1 md:mt-1.5">Client retention rate</div></div>
                </div>
              </div>
            </div>
          </FadeUp>

        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="py-10 md:py-16 px-5 md:px-8 bg-[#0b0d22] border-y border-white/[0.06] flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <p className="text-center text-[12px] md:text-[14px] text-[#7a7fa8] mb-6 md:mb-10 max-w-[500px] mx-auto leading-relaxed">
              Across industries, environments, and pressure levels, the results speak the same language
            </p>
          </FadeUp>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-3">
            {[
              { num: "91%", lbl: "Leaders stable within 30 days" },
              { num: "3x", lbl: "Follow Through improvement" },
              { num: "100+", lbl: "Leaders mapped" },
              { num: "98%", lbl: "Client retention" }
            ].map((stat, i) => (
              <FadeUp key={i} delay={i * 100} className="w-full md:w-auto">
                <div className="py-5 px-3 md:py-6 md:px-8 text-center bg-[#10132b] rounded-[10px] md:rounded-[12px] md:flex-1 md:min-w-[180px] flex flex-col justify-center border border-white/[0.02] h-full">
                  <div className="text-[24px] md:text-[36px] font-black text-[#5b8af5] leading-tight mb-1">{stat.num}</div>
                  <div className="text-[10.5px] md:text-[13px] text-[#7a7fa8] leading-tight px-1 md:px-2">{stat.lbl}</div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS (Slider) */}
      <section className="py-12 md:py-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full flex flex-col items-center">
          <FadeUp>
            <div className="text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase text-[#5b8af5] mb-2.5 md:mb-3 text-center">In Their Words</div>
            <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black text-center mb-8 md:mb-16 tracking-[-0.5px] leading-[1.15]">
              Identity level change is <em className="text-[#5b8af5] not-italic block sm:inline">impossible to ignore.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={100} className="w-full">
            <div className="relative w-full overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out w-full"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testi, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-1 md:px-2">
                    <div className="bg-[#0b0d22] border border-white/[0.06] rounded-[14px] md:rounded-[20px] p-6 md:p-14 relative flex flex-col h-full items-center text-center mx-auto max-w-[800px]">
                      <p className="text-[14px] md:text-[19px] text-[#b0b8e8] leading-[1.65] md:leading-[1.8] mb-6 md:mb-8">
                        "{testi.quote}"
                      </p>
                      <div className="text-[11.5px] md:text-[13px] font-semibold text-[#7a7fa8] flex items-center gap-2 mt-auto">
                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#3b6fe8]" />
                        {testi.author}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slider Controls */}
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-6 md:mt-10">
                <button 
                  onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
                  className="p-2 md:p-2.5 rounded-full border border-white/[0.08] hover:bg-white/5 transition-colors text-[#7a7fa8] hover:text-white bg-[#0b0d22]"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                </button>
                <div className="flex gap-2 md:gap-2.5">
                  {testimonials.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setCurrentTestimonial(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1 md:h-1.5 rounded-full transition-all duration-300 ${currentTestimonial === i ? 'bg-[#5b8af5] w-6 md:w-8' : 'bg-white/10 hover:bg-white/30 w-1.5 md:w-2'}`}
                    />
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
                  className="p-2 md:p-2.5 rounded-full border border-white/[0.08] hover:bg-white/5 transition-colors text-[#7a7fa8] hover:text-white bg-[#0b0d22]"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="pt-6 pb-12 md:pb-24 px-5 md:px-8 flex flex-col items-center">
        <div className="max-w-[960px] mx-auto w-full">
          <FadeUp>
            <div className="bg-[#0b0d22] border border-[#3b6fe8]/[0.32] rounded-[20px] md:rounded-[24px] p-7 md:p-[64px_56px] text-center shadow-[0_0_60px_rgba(59,111,232,0.06)] relative overflow-hidden flex flex-col items-center">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#3b6fe8] to-transparent" />
              
              <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.18] border border-[#3b6fe8]/[0.32] text-[#5b8af5] text-[9.5px] md:text-[11px] font-bold tracking-[2px] uppercase py-1.5 px-3.5 md:py-2 md:px-5 rounded-full mb-5 md:mb-8">
                Run Your Mapping
              </div>
              
              <h2 className="text-[28px] sm:text-[36px] md:text-[46px] font-black mb-3 md:mb-6 tracking-[-0.5px] leading-[1.15] text-[#eef0ff]">
                See who you become<br className="hidden md:block"/> under pressure before pressure decides.
              </h2>
              <p className="text-[14px] md:text-[17px] text-[#7a7fa8] max-w-[580px] mx-auto mb-6 md:mb-10 leading-[1.65] md:leading-[1.7]">
                In one call, you'll see the exact architecture beneath your team's performance. The identity drivers, the shadow patterns, the predictable collapse points and a clear path to install the stability that makes performance predictable.
              </p>
              
              <ul className="list-none max-w-[460px] mx-auto mb-8 md:mb-12 text-left flex flex-col gap-3 w-full">
                {[
                  "Full Identity Architecture™ overview for your context",
                  "Shadow interference pattern identification",
                  "Recommended PersonaForce™ solution path",
                  "No pitch. No pressure. Pure intelligence."
                ].map((feature, i) => (
                  <li key={i} className="text-[13px] md:text-[15px] font-medium text-[#b0b8e8] flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3b6fe8] shrink-0 mt-1.5" />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/book?source=home" className="bg-[#3b6fe8] hover:scale-[1.02] transition-transform duration-200 text-white text-center py-3.5 px-5 md:py-5 md:px-12 rounded-[10px] md:rounded-[12px] text-[14.5px] md:text-[17px] font-bold shadow-[0_0_30px_rgba(59,111,232,0.2)] w-full max-w-[340px] sm:w-auto inline-block mx-auto">
                Book My PersonaForce™ Mapping Call
              </Link>
              <div className="text-[11.5px] md:text-[13px] text-[#7a7fa8] mt-4 md:mt-5 font-medium">
                45 minutes · No cost · Limited to 6 sessions per month
              </div>
            </div>
          </FadeUp>

          <FadeUp delay={150}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-2.5 bg-[#10132b] border border-white/[0.06] rounded-[8px] md:rounded-[10px] py-3 px-5 md:py-4 md:px-6 mx-auto mt-5 md:mt-8 max-w-[500px] text-[12px] md:text-sm font-semibold text-center sm:text-left text-[#eef0ff]">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#3b6fe8] rounded-full animate-[pulse_1.5s_ease-in-out_infinite] shrink-0 hidden sm:block" />
              <p>This month: <span className="text-[#5b8af5]">6 mapping sessions remaining</span>. Next availability in June</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 md:py-10 px-5 md:px-8 border-t border-white/[0.06] text-center text-[11.5px] md:text-[13px] text-[#7a7fa8]">
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

export default Landing;
