import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { NAV_LINKS } from '../data/navLinks';

/**
 * SiteNav — the announce bar, primary nav and mobile drawer for every page.
 *
 * Previously this markup was copy-pasted into twelve files, so every nav change
 * had to be made twelve times and inevitably drifted. It now lives here only.
 * The component is self-contained (owns its own scroll and drawer state) so a
 * page just renders <SiteNav /> and keeps its own spacer for the fixed bars.
 *
 */
const SiteNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ANNOUNCE BAR — fixed height, matched by the nav's resting offset, so the
          page never shows through a seam between the two. Slides away on scroll. */}
      <div className={`fixed top-0 left-0 w-full h-[36px] md:h-[44px] z-50 flex justify-center items-center gap-2.5 px-4 md:px-6 text-center bg-[#080b1f]/85 backdrop-blur-md border-b border-white/[0.05] transition-transform duration-500 ease-out ${isScrolled ? '-translate-y-full' : 'translate-y-0'}`}>
        <span className="w-[5px] h-[5px] bg-[#5b8af5] rounded-full shadow-[0_0_10px_rgba(91,138,245,0.9)] animate-[pulse_1.6s_ease-in-out_infinite] shrink-0" />
        <span className="font-ui text-[9px] md:text-[10.5px] font-medium uppercase tracking-[0.2em] text-[#a3abd6] leading-none">
          Identity Mapping Sessions | Limited Availability | Book Before Spots Fill
        </span>
      </div>

      {/* NAV — transparent at rest so page backgrounds read through, then
          condenses into a blurred bar on scroll. */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ease-out flex justify-center ${isScrolled ? 'top-0 py-3 md:py-4 bg-[#06081a]/70 backdrop-blur-xl border-b border-white/[0.07]' : 'top-[36px] md:top-[44px] py-3 md:py-5 bg-transparent border-b border-transparent'}`}>
        <div className="w-full max-w-[1180px] px-5 md:px-8 flex justify-between items-center gap-4">

          <Link to="/" className="flex items-center gap-2 md:gap-2.5 z-50 shrink-0 group">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 md:w-8 md:h-8 rounded-lg shrink-0 object-contain transition-transform duration-500 group-hover:scale-105" />
            <div className="font-ui text-[14px] md:text-[15px] font-bold tracking-[-0.2px] text-[#eef0ff]">
              Persona<span className="text-[#5b8af5]">Force™</span>
            </div>
          </Link>

          <div className="hidden lg:flex gap-5 xl:gap-7 items-center">
            {NAV_LINKS.map((item) =>
              item.children ? (
                // group-focus-within keeps this reachable by keyboard, since a
                // hover-only menu is unusable without a pointer.
                <div key={item.label} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="true"
                    className="flex items-center gap-1.5 font-ui text-[12.5px] whitespace-nowrap text-[#8790bb] transition-colors duration-300 group-hover:text-white group-focus-within:text-white"
                  >
                    {item.label}
                    <ChevronDown
                      className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180 group-focus-within:rotate-180"
                      strokeWidth={2}
                    />
                  </button>

                  {/* pt-3 is a hover bridge: without it the cursor crosses a gap
                      between trigger and panel and the menu snaps shut. */}
                  <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="min-w-[190px] translate-y-1 rounded-xl border border-white/[0.1] bg-[#0b0d22]/90 p-1.5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="group/item relative flex items-center rounded-lg px-3.5 py-2.5 font-ui text-[12.5px] whitespace-nowrap text-[#8790bb] transition-colors duration-200 hover:bg-white/[0.05] hover:text-white"
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute left-1.5 h-[12px] w-[2px] rotate-[16deg] rounded-full bg-[#5b8af5] opacity-0 transition-opacity duration-200 group-hover/item:opacity-100"
                          />
                          <span className="transition-transform duration-200 ease-out group-hover/item:translate-x-[3px]">
                            {child.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative font-ui text-[12.5px] whitespace-nowrap text-[#8790bb] hover:text-white transition-colors duration-300"
                >
                  {/* The slash mark slides in from the left on hover */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 left-[-6px] h-[13px] w-[2px] -translate-y-1/2 rotate-[16deg] rounded-full bg-[#5b8af5] opacity-0 scale-y-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-y-100 group-hover:left-[-10px]"
                  />
                  <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
                    {item.label}
                  </span>
                </Link>
              )
            )}
          </div>

          <div className="flex items-center gap-3.5 md:gap-4">
            <Link
              to="/book?source=nav"
              className="group hidden lg:flex items-center overflow-hidden rounded-full border border-[#5b8af5]/35 bg-[#3b6fe8]/[0.12] px-5 py-2.5 font-ui text-[12.5px] font-medium text-[#eef0ff] backdrop-blur-sm transition-all duration-300 hover:border-[#5b8af5]/70 hover:bg-[#3b6fe8]/25 hover:shadow-[0_0_28px_rgba(59,111,232,0.35)]"
            >
              <span className="relative grid overflow-hidden">
                <span className="col-start-1 row-start-1 block transition-transform duration-300 ease-out group-hover:-translate-y-full">Book a Call</span>
                <span className="col-start-1 row-start-1 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">Book a Call</span>
              </span>
            </Link>

            <button aria-label="Open menu" className="lg:hidden text-[#8790bb] hover:text-white transition-colors" onClick={() => setIsMenuOpen(true)}>
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
      <div className={`fixed top-0 right-0 h-full w-[280px] bg-[#0b0d22] border-l border-white/[0.06] z-[60] transform transition-transform duration-300 ease-in-out flex flex-col p-6 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        <div className="flex justify-end mb-8">
          <button aria-label="Close menu" className="text-[#8790bb] hover:text-white" onClick={() => setIsMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* No hover on a phone, so the group is simply always expanded and
              indented rather than hidden behind a tap target. */}
          {NAV_LINKS.map((item) =>
            item.children ? (
              <div key={item.label} className="flex flex-col gap-3.5">
                <span className="font-ui text-[9.5px] font-medium uppercase tracking-[0.26em] text-[#7e88bb]">
                  {item.label}
                </span>
                <div className="flex flex-col gap-4 border-l border-white/[0.1] pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="font-display text-[24px] leading-none text-[#eef0ff] hover:text-[#5b8af5] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="font-display text-[26px] leading-none text-[#eef0ff] hover:text-[#5b8af5] transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}

          <div className="mt-4 pt-6 border-t border-white/[0.06]">
            <Link to="/book?source=nav" className="flex justify-center rounded-full border border-[#5b8af5]/45 bg-[#5b8af5]/[0.1] backdrop-blur-md px-5 py-3.5 font-ui text-[13.5px] font-medium text-[#eef0ff] w-full transition-colors duration-300 hover:border-[#5b8af5]/90" onClick={() => setIsMenuOpen(false)}>
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteNav;
