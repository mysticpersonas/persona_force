import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/navLinks';

/**
 * TjHeader — the masthead for every Trader's Journey page.
 *
 * Logo-only by default: the day pages, intake and thank-you pages are private
 * funnel steps reached from an email, so a full nav would only offer ways to
 * leave mid-sequence.
 *
 * Pass `nav` on the public entry page (/trader). That one is a landing page
 * people arrive at cold — often from the main site's "Traders" link — and with
 * no nav it was a dead end: no way back to PersonaForce without the back button.
 *
 * The nav borrows SiteNav's structure and NAV_LINKS data, but wears the Trader's
 * Journey palette: the #00e676 green marks the accent, the type is the same
 * black uppercase tj-display, and the CTA stays inside the funnel (it scrolls to
 * the form) so unlocking the page doesn't cost the conversion.
 *
 * Uses the supplied /tj_logo.jpeg rather than the reconstructed SVG mark, so the
 * artwork matches the client's brand sheet exactly.
 */
const TjHeader = ({ width = 'max-w-[880px]', nav = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Flattened: the TJ header has no room for a hover dropdown, and "Organizations"
  // as a group label reads as PersonaForce's taxonomy, not this page's. The
  // children become peers, with the group name kept only in the mobile drawer.
  const flatLinks = NAV_LINKS.flatMap((item) => item.children ?? [item]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      {/* The performance gradient as a hairline: loss to profit, the brand's
          whole thesis in 3px. */}
      <div aria-hidden="true" className="h-[3px] w-full bg-[linear-gradient(90deg,#ff3b30_0%,#ff8a00_34%,#ffd100_62%,#00e676_100%)]" />

      <header className="border-b border-white/[0.07] bg-[#0b0f14]">
        <div className={`${width} mx-auto px-5 md:px-8 py-4 flex items-center gap-3`}>
          {/* Only the nav variant makes the mark clickable — on a funnel step
              there is nowhere it should send you. */}
          <Wordmark asLink={nav} />

          {nav && (
            <>
              <div className="ml-auto hidden lg:flex items-center gap-6 xl:gap-7">
                {flatLinks.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className="group relative font-tj-sub text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap text-[#8a93a3] transition-colors duration-300 hover:text-white"
                  >
                    {/* The accent tick slides in from the left, same gesture as
                        SiteNav — recoloured to the TJ green. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute top-1/2 left-[-6px] h-[12px] w-[2px] -translate-y-1/2 rotate-[16deg] rounded-full bg-[#00e676] opacity-0 scale-y-0 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-y-100 group-hover:left-[-10px]"
                    />
                    <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[3px]">
                      {item.label}
                    </span>
                  </Link>
                ))}

                {/* Stays in-page: the nav unlocks the exit without advertising it. */}
                <a
                  href="#register"
                  className="rounded-full bg-[#00e676] px-5 py-2.5 font-tj-sub text-[11px] font-bold uppercase tracking-[0.12em] text-[#0b0f14] transition-all duration-300 hover:bg-[#3bff9b] hover:shadow-[0_0_24px_rgba(0,230,118,0.4)]"
                >
                  Apply Now
                </a>
              </div>

              <button
                aria-label="Open menu"
                className="ml-auto lg:hidden text-[#8a93a3] transition-colors hover:text-white"
                onClick={() => setIsMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </header>

      {nav && (
        <>
          <div
            className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={closeMenu}
          />

          <div
            className={`fixed top-0 right-0 z-[60] flex h-full w-[280px] transform flex-col overflow-y-auto border-l border-white/[0.07] bg-[#0b0f14] p-6 transition-transform duration-300 ease-in-out lg:hidden ${
              isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* The same 3px gradient down the drawer's edge, so the panel reads
                as part of the masthead rather than a generic overlay. */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[3px] bg-[linear-gradient(180deg,#ff3b30_0%,#ff8a00_34%,#ffd100_62%,#00e676_100%)]"
            />

            <div className="mb-8 flex justify-end">
              <button aria-label="Close menu" className="text-[#8a93a3] hover:text-white" onClick={closeMenu}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-5">
              {/* No hover on a phone, so a group is always expanded and indented
                  rather than hidden behind a tap target. */}
              {NAV_LINKS.map((item) =>
                item.children ? (
                  <div key={item.label} className="flex flex-col gap-3.5">
                    <span className="font-tj-sub text-[9.5px] font-semibold uppercase tracking-[0.3em] text-[#00e676]">
                      {item.label}
                    </span>
                    <div className="flex flex-col gap-4 border-l border-white/[0.1] pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          onClick={closeMenu}
                          className="font-tj-display text-[21px] font-black uppercase leading-none tracking-[0.02em] text-white transition-colors hover:text-[#00e676]"
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
                    onClick={closeMenu}
                    className="font-tj-display text-[23px] font-black uppercase leading-none tracking-[0.02em] text-white transition-colors hover:text-[#00e676]"
                  >
                    {item.label}
                  </Link>
                )
              )}

              <div className="mt-4 border-t border-white/[0.07] pt-6">
                <a
                  href="#register"
                  onClick={closeMenu}
                  className="flex w-full justify-center rounded-xl bg-[#00e676] px-5 py-3.5 font-tj-sub text-[12px] font-bold uppercase tracking-[0.12em] text-[#0b0f14] shadow-[0_0_24px_rgba(0,230,118,0.3)] transition-colors duration-300 hover:bg-[#3bff9b]"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Wordmark = ({ asLink }) => {
  const inner = (
    <>
      <img
        src="/tj_logo.jpeg"
        alt="The Trader's Journey"
        className="w-9 h-9 md:w-10 md:h-10 rounded-lg shrink-0 object-cover"
      />
      <div className="leading-none">
        <div className="font-tj-display text-[13px] md:text-[15px] font-black uppercase tracking-[0.06em] text-white">
          The Trader&rsquo;s
        </div>
        <div className="font-tj-sub text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.42em] text-[#00e676] mt-1">
          Journey
        </div>
      </div>
    </>
  );

  return asLink ? (
    <Link to="/trader" className="flex shrink-0 items-center gap-3">
      {inner}
    </Link>
  ) : (
    <div className="flex shrink-0 items-center gap-3">{inner}</div>
  );
};

export default TjHeader;
