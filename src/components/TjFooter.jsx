/**
 * TjFooter — tagline plus the compliance disclaimer, shared by every
 * Trader's Journey page so the legal wording can never drift between them.
 */
const TjFooter = ({ className = '' }) => (
  <footer className={`px-5 md:px-8 py-12 border-t border-white/[0.07] ${className}`}>
    <div className="max-w-[680px] mx-auto text-center">
      <p className="font-tj-sub text-[10px] font-semibold uppercase tracking-[0.3em] text-white/25 mb-5">
        Cut Losses. Stack Wins.
      </p>
      <p className="text-[11.5px] leading-[1.75] text-white/30">
        The Trader&rsquo;s Journey is an educational and identity-development experience. It does not
        provide financial, investment, tax, legal, or trading advice. Results vary. Participants
        are responsible for their own trading decisions.
      </p>
      <p className="text-[11px] text-white/20 mt-5">
        © {new Date().getFullYear()} The Trader&rsquo;s Journey
      </p>
    </div>
  </footer>
);

export default TjFooter;
