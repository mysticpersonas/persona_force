import { useEffect } from 'react';

/**
 * TjForm — the LeadConnector (GHL) form for one challenge day.
 *
 * Sizing is a two-stage handoff:
 *
 *  1. CSS holds the frame (see .tj-form__frame in index.css). It sets the width
 *     to 100% — without that the iframe takes the HTML default of 300px — and a
 *     fallback height from --tj-form-h.
 *  2. form_embed.js measures the rendered form and writes a real px height to
 *     the iframe's inline style, which beats the CSS.
 *
 * The fallback matters more than it looks: the heights in challengeDays.js are
 * DESKTOP measurements, so on a phone the same form stacks its fields and runs
 * materially taller — hence the multiplier in the media query rather than one
 * fixed number.
 *
 * The frame goes full-bleed inside the panel on mobile, because 24px of padding
 * either side is 13% of a 375px screen and GHL's own layout has no room to give.
 */
const TjForm = ({ form }) => {
  // Re-run GHL's embed script on mount so the iframe auto-resizes on this SPA
  // route. The global tag in index.html is async and fires once: on a client-side
  // navigation it never re-scans, and even on a cold load it can run before React
  // has painted this iframe. Either way the form keeps the fallback height and
  // scrolls internally, which is what made these read as cramped. Every other GHL
  // page here (Trader, Book, OptIn, TraderIntake, BlueprintAssessment) already
  // does this; the challenge days were the ones left out.
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://link.msgsndr.com/js/form_embed.js';
    s.async = true;
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, [form.id]);

  return (
    // Mobile gutter: -mx-6 cancels exactly the enclosing panel's p-6, then px-3
    // puts a 12px gutter back, because GHL's form ships no horizontal padding of
    // its own and its labels would otherwise sit flush against the edge.
    //
    // It stops at the panel and no further ON PURPOSE. The panel is overflow-hidden,
    // so a wider bleed (this was -mx-11, reaching for the viewport edge past the
    // page's px-5) does not go full-bleed at all — it gets clipped, silently cutting
    // the form's left and right edges off.
    //
    // The wrapper is white so that gutter reads as the form's own margin rather than
    // as dark bars either side of it. If the form's background is ever changed in
    // GHL, this colour needs to change with it.
    <div
      className="tj-form -mx-6 px-3 md:mx-0 md:px-0 overflow-hidden rounded-[14px] bg-white md:border md:border-white/[0.08]"
      style={{ '--tj-form-h': `${form.height}px` }}
    >
      <iframe
        className="tj-form__frame"
        src={`https://api.leadconnectorhq.com/widget/form/${form.id}`}
        id={`inline-${form.id}`}
        title={form.name}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name={form.name}
        data-height={form.height}
        data-layout-iframe-id={`inline-${form.id}`}
        data-form-id={form.id}
      />
    </div>
  );
};

export default TjForm;
