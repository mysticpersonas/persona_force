/**
 * TjForm — the LeadConnector (GHL) form for one challenge day.
 *
 * `form_embed.js` is already loaded globally from index.html; it finds the
 * iframe by id and takes over height syncing after the form renders. The
 * `height` from the embed snippet is set as the initial height so the page
 * doesn't reflow when the script hands back the real measurement.
 */
const TjForm = ({ form }) => (
  <div className="overflow-hidden rounded-[14px] border border-white/[0.08] bg-[#11151d]">
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${form.id}`}
      id={`inline-${form.id}`}
      title={form.name}
      style={{ width: '100%', height: `${form.height}px`, border: 'none', borderRadius: '10px', display: 'block' }}
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
