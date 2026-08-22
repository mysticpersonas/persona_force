/**
 * TjForm — the LeadConnector (GHL) form for one challenge day.
 *
 * `form_embed.js` is already loaded globally from index.html; once the form
 * renders it posts its real content height and writes it to the iframe's inline
 * style, which wins over anything here. Everything below is the fallback for the
 * window before that happens (and for when the script is slow or blocked):
 *
 *  - the height from the embed snippet is a DESKTOP measurement. On a phone the
 *    same form stacks its fields, so it runs materially taller — hence the
 *    multiplier in the media query rather than one fixed number.
 *  - the frame goes full-bleed inside the panel on mobile, because 24px of
 *    padding either side is 13% of a 375px screen and GHL's own layout has no
 *    room to give.
 */
// On mobile the frame goes full-bleed to the viewport edge: -mx-11 (44px) undoes
// the page's px-5 and the panel's p-6. The form's header banner is a fixed-width
// image inside a cross-origin iframe, so width is the only lever we have on it
// from this side — its crop and its spacing above Q1 are GHL-builder settings.
const TjForm = ({ form }) => (
  <div
    className="tj-form -mx-11 md:mx-0 overflow-hidden md:rounded-[14px] md:border md:border-white/[0.08] bg-[#11151d]"
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

export default TjForm;
