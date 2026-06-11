import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Clock, Video, Globe, ChevronLeft } from 'lucide-react';
import { getBookingCopy } from '../bookingCopy';

const Book = () => {
  // The page the visitor came from drives the framing (eyebrow / headline /
  // intro / bullets). Same calendar embed for everyone — only the copy changes.
  const [searchParams] = useSearchParams();
  const copy = getBookingCopy(searchParams.get('source'));

  useEffect(() => {
    // We need to load the GHL script for the embed
    const script = document.createElement('script');
    script.src = "https://link.msgsndr.com/js/form_embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white md:grid md:grid-cols-2">
      {/* LEFT PANEL */}
      <div className="relative p-8 md:p-12 lg:p-[52px] flex flex-col min-h-[500px] md:min-h-screen overflow-hidden">
        {/* Background gradient instead of image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,#080d2a_0%,#06081a_100%)] z-0"></div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.02)_2px,rgba(0,0,0,0.02)_4px)] z-0 pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex flex-col gap-5 mb-16 md:mb-auto">
            {/* Back Button */}
            <Link to="/" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#7a7fa8] hover:text-white transition-colors w-max">
              <ChevronLeft className="w-4 h-4" /> Back to Home
            </Link>

            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity w-max">
              <img src="/pf_logo.png" alt="PersonaForce" className="w-9 h-9 rounded-lg shrink-0 object-contain" />
              <div className="text-[17px] font-extrabold tracking-[-0.3px] text-white">
                Persona<span className="text-[#5b8af5]">Force®</span>
              </div>
            </Link>
          </div>

          <div className="mt-auto pt-16 md:pt-32 pb-8 animate-[fadeUp_0.7s_ease_both]">
            <div className="inline-flex items-center gap-2 bg-[#3b6fe8]/[0.15] border border-[#3b6fe8]/30 text-[#5b8af5] text-[11px] font-bold tracking-[0.12em] uppercase py-1.5 px-3.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-[#5b8af5] rounded-full animate-[pulse_1.6s_ease-in-out_infinite] shrink-0" />
              {copy.eyebrow}
            </div>

            <h1 className="text-[32px] md:text-[40px] lg:text-[46px] font-black leading-[1.08] tracking-[-0.8px] text-white mb-5">
              {copy.title.map((seg, i) =>
                seg.accent
                  ? <em key={i} className="text-[#5b8af5] not-italic">{seg.t}</em>
                  : <span key={i}>{seg.t}</span>
              )}
            </h1>

            <p className="text-[15px] text-[#eef0ff]/60 leading-[1.75] max-w-[400px] mb-9">
              {copy.intro}
            </p>

            <div className="flex flex-col gap-3.5">
              {copy.bullets.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3b6fe8] shrink-0 mt-2" />
                  <div className="text-[14px] text-[#eef0ff]/60 leading-[1.5]">
                    {item.bold && <strong className="text-white font-semibold">{item.bold} </strong>}
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL - CALENDAR */}
      <div className="bg-[#f4f5f8] flex flex-col items-center md:justify-center p-0 md:p-6 lg:p-10 animate-[fadeUp_0.7s_0.15s_ease_both] min-h-screen md:min-h-0 relative">
        
        {/* Floating Calendar Card on Desktop, Full Bleed on Mobile */}
        <div className="w-full h-full md:h-auto md:max-w-[540px] bg-white md:rounded-[24px] md:shadow-[0_20px_40px_rgba(0,0,0,0.06)] md:border border-gray-100 flex flex-col overflow-hidden relative z-10 my-auto">
          
          {/* Card Header */}
          <div className="p-6 md:p-8 border-b border-[#f0f0f4] shrink-0 bg-white z-10">
            <div className="text-[20px] font-black text-[#0a0a1a] mb-4 tracking-tight">PersonaForce®</div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-[13px] text-[#666] font-medium">
                <Clock className="w-4 h-4 text-[#3b6fe8] shrink-0" />
                30 minutes
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#666] font-medium">
                <Video className="w-4 h-4 text-[#3b6fe8] shrink-0" />
                Video call
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#666] font-medium">
                <Globe className="w-4 h-4 text-[#3b6fe8] shrink-0" />
                Your timezone, auto-detected
              </div>
            </div>
          </div>

          {/* GHL Calendar Embed Wrapper */}
          <div className="w-full bg-white relative pb-6 flex-1 md:max-h-[600px] md:overflow-y-auto custom-scrollbar">
            <iframe
              src="https://api.leadconnectorhq.com/widget/booking/BXc6BGPB8tpe8qAtSwyf"
              style={{ width: '100%', minHeight: '550px', border: 'none', display: 'block' }}
              scrolling="no"
              id="BXc6BGPB8tpe8qAtSwyf_1778835771281"
              title="PersonaForce Booking"
            ></iframe>
          </div>

        </div>
      </div>

      {/* FOOTER - MOBILE ONLY */}
      <footer className="col-span-1 md:col-span-2 bg-[#06081a] border-t border-white/[0.07] py-4 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-[12px] text-white/30 font-medium">
        <span>© 2026 PersonaForce® | All Rights Reserved</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
          <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
          <a href="mailto:hello@personaforce.co" className="hover:text-white/60 transition-colors">Contact</a>
        </div>
      </footer>

      {/* Adding some subtle scrollbar styling for the calendar overflow container on desktop */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #c0c0c0; }
      `}} />
    </div>
  );
};

export default Book;
