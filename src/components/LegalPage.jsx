import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Block = ({ block }) => {
  const [type, val] = block;

  if (type === 'h')
    return <h3 className="text-[15px] md:text-[16px] font-bold text-[#eef0ff] mt-7 mb-3">{val}</h3>;

  if (type === 'ul')
    return (
      <ul className="mb-4 flex flex-col gap-2">
        {val.map((it, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] md:text-[15px] text-[#eef0ff]/[0.62] leading-[1.75]">
            <span className="mt-[10px] w-1 h-1 rounded-full bg-[#3b6fe8] shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    );

  if (type === 'contact')
    return (
      <div className="rounded-xl bg-white/[0.03] border border-white/[0.08] px-5 py-4 my-3 flex flex-col gap-1">
        {val.map((line, i) => (
          <span key={i} className={`text-[14px] leading-[1.7] ${i === 0 ? 'text-[#eef0ff] font-semibold' : 'text-[#eef0ff]/[0.68]'}`}>{line}</span>
        ))}
      </div>
    );

  return <p className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.62] leading-[1.85] mb-4">{val}</p>;
};

/**
 * LegalPage — shared layout for the Privacy Policy and Terms & Conditions.
 * Renders a readable single-column legal document with a meta card, a
 * table-of-contents jump nav, and numbered sections with anchor IDs.
 */
const LegalPage = ({ doc }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `${doc.title} · PersonaForce™`;
    return () => { document.title = prev; };
  }, [doc.title]);

  return (
    <div className="min-h-screen bg-[#06081a] text-[#eef0ff] font-sans overflow-x-hidden selection:bg-[#3b6fe8]/30 selection:text-white antialiased">

      {/* NAV — logo + back to home */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#06081a]/95 backdrop-blur-md">
        <div className="max-w-[820px] mx-auto px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <img src="/pf_logo.png" alt="PersonaForce" className="w-7 h-7 rounded-lg object-contain shrink-0" />
            <span className="text-[14px] font-extrabold tracking-[-0.3px]">
              Persona<span className="text-[#5b8af5]">Force™</span>
            </span>
          </Link>
          <Link to="/" className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-[#7a7fa8] hover:text-white transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </header>

      <main className="px-5 md:px-8 py-12 md:py-16">
        <div className="max-w-[820px] mx-auto">

          {/* TITLE */}
          <h1 className="text-[clamp(30px,5vw,44px)] font-black tracking-[-1px] leading-[1.1]">{doc.title}</h1>
          <p className="text-[13.5px] md:text-[14px] text-[#5b8af5] font-semibold mt-3">{doc.brands}</p>

          {/* META CARD */}
          <div className="mt-6 rounded-xl bg-white/[0.03] border border-white/[0.08] p-5 md:p-6 flex flex-col gap-2 text-[13.5px]">
            <div><span className="text-[#eef0ff]/[0.4]">Effective Date: </span><span className="text-[#eef0ff]/[0.82] font-medium">{doc.effectiveDate}</span></div>
            <div><span className="text-[#eef0ff]/[0.4]">Owner: </span><span className="text-[#eef0ff]/[0.82] font-medium">{doc.owner}</span></div>
            <div><span className="text-[#eef0ff]/[0.4]">Contact: </span><a href={`mailto:${doc.contact}`} className="text-[#5b8af5] hover:text-white transition-colors font-medium">{doc.contact}</a></div>
            {doc.websites && (
              <div className="pt-1 border-t border-white/[0.06] mt-1">
                <span className="text-[#eef0ff]/[0.4]">Websites &amp; Platforms: </span>
                <span className="text-[#eef0ff]/[0.6] leading-[1.7]">{doc.websites}</span>
              </div>
            )}
          </div>

          {/* INTRO */}
          <div className="mt-8">
            {doc.intro.map((t, i) => (
              <p key={i} className="text-[14px] md:text-[15px] text-[#eef0ff]/[0.62] leading-[1.85] mb-4">{t}</p>
            ))}
          </div>

          {/* TABLE OF CONTENTS */}
          <nav className="mt-8 rounded-xl bg-white/[0.02] border border-white/[0.06] p-5 md:p-6">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#5b8af5] mb-4">Contents</div>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
              {doc.sections.map((s) => (
                <a key={s.n} href={`#sec-${s.n}`} className="text-[13px] text-[#eef0ff]/[0.6] hover:text-white transition-colors leading-[1.5]">
                  <span className="text-[#5b8af5] font-semibold">{s.n}.</span> {s.title}
                </a>
              ))}
            </div>
          </nav>

          {/* SECTIONS */}
          <div className="mt-2">
            {doc.sections.map((s) => (
              <section key={s.n} id={`sec-${s.n}`} className="scroll-mt-[80px] pt-10">
                <h2 className="text-[19px] md:text-[22px] font-black tracking-[-0.4px] leading-[1.25] mb-4">
                  <span className="text-[#5b8af5]">{s.n}.</span> {s.title}
                </h2>
                {s.blocks.map((b, i) => <Block key={i} block={b} />)}
              </section>
            ))}
          </div>

          {/* CROSS-LINK + COPYRIGHT */}
          <div className="mt-14 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[12px] text-[#eef0ff]/[0.3]">© {new Date().getFullYear()} MDPP, LLC · All Rights Reserved</p>
            <div className="flex items-center gap-5 text-[13px] font-semibold">
              <Link to={doc.other.to} className="text-[#5b8af5] hover:text-white transition-colors">{doc.other.label}</Link>
              <a href={`mailto:${doc.contact}`} className="text-[#7a7fa8] hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LegalPage;
