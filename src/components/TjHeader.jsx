/**
 * TjHeader — the masthead for every Trader's Journey page.
 *
 * Deliberately logo-only: these are private funnel pages reached from an email,
 * so a full nav would only offer ways to leave.
 *
 * Uses the supplied /tj_logo.jpeg rather than the reconstructed SVG mark, so the
 * artwork matches the client's brand sheet exactly.
 */
const TjHeader = ({ width = 'max-w-[880px]' }) => (
  <>
    {/* The performance gradient as a hairline: loss to profit, the brand's
        whole thesis in 3px. */}
    <div aria-hidden="true" className="h-[3px] w-full bg-[linear-gradient(90deg,#ff3b30_0%,#ff8a00_34%,#ffd100_62%,#00e676_100%)]" />

    <header className="border-b border-white/[0.07] bg-[#0b0f14]">
      <div className={`${width} mx-auto px-5 md:px-8 py-4 flex items-center gap-3`}>
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
      </div>
    </header>
  </>
);

export default TjHeader;
