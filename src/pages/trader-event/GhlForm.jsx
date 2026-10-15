import { useEffect } from 'react';
import styles from './TraderEvent.module.css';

// GoHighLevel form "Wealth Blueprint Oct 18 RSVP". Submissions go straight
// into GHL; the confirmation message, tags and emails are set up there.
// Field styling lives in the GHL form builder (Custom CSS), not here.
const FORM_ID = 'mIfNY0bFBpmB3Nxty2l3';
const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js';

export default function GhlForm() {
  // GHL's script resizes the iframe to fit the form. The main site already
  // loads it in index.html; the standalone event page needs it added here.
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.src = EMBED_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className={styles.formCard}>
      <div className={styles.formHead}>
        <h2 className={styles.formTitle}>Reserve Your Complimentary Seat</h2>
      </div>
      <p className={styles.formIntro}>Tell us a little about yourself, and we'll send you the event details.</p>

      <div className={styles.ghlWrap}>
        <iframe
          src={`https://api.leadconnectorhq.com/widget/form/${FORM_ID}`}
          className={styles.ghlFrame}
          id={`inline-${FORM_ID}`}
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Wealth Blueprint Oct 18 RSVP"
          data-height="723"
          data-layout-iframe-id={`inline-${FORM_ID}`}
          data-form-id={FORM_ID}
          data-cookie-consent="true"
          data-cookie-consent-provider="auto"
          title="Wealth Blueprint Oct 18 RSVP"
        />
      </div>
    </div>
  );
}
