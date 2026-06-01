import { useEffect } from 'react';
import { X } from 'lucide-react';

/*
 * Renders a GoHighLevel (LeadConnector) inline form inside a centered modal.
 * Pass `form = { id, title, height }`; the embed src + script are derived here.
 */
const FormModal = ({ form, onClose }) => {
  useEffect(() => {
    if (!form) return;
    // form_embed.js is loaded once globally in index.html. Only inject as a
    // fallback if it isn't already on the page (handles iframe resize/submit).
    let injected = null;
    if (!document.querySelector('script[src*="form_embed.js"]')) {
      injected = document.createElement('script');
      injected.src = 'https://link.msgsndr.com/js/form_embed.js';
      injected.async = true;
      document.body.appendChild(injected);
    }

    // Lock background scroll + close on Escape
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);

    return () => {
      if (injected && injected.parentNode) injected.parentNode.removeChild(injected);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [form, onClose]);

  if (!form) return null;

  const src = `https://api.leadconnectorhq.com/widget/form/${form.id}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-[1] w-full max-w-[640px] max-h-[92vh] bg-[#0b0d22] border border-white/[0.1] rounded-[16px] overflow-hidden flex flex-col shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] shrink-0">
          <div className="text-[14px] font-bold text-white">{form.title}</div>
          <button onClick={onClose} aria-label="Close" className="text-[#7a7fa8] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto bg-white">
          <iframe
            key={form.id}
            src={src}
            id={`inline-${form.id}`}
            title={form.title}
            data-layout="{'id':'INLINE'}"
            data-form-id={form.id}
            data-layout-iframe-id={`inline-${form.id}`}
            data-height={form.height}
            style={{ width: '100%', height: `${form.height}px`, border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormModal;
