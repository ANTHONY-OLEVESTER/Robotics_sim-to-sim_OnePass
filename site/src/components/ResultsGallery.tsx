import { useState } from "react";
import { downloadLinks, resultGallery } from "../data/siteContent";

export function ResultsGallery() {
  const [active, setActive] = useState<(typeof resultGallery)[number] | null>(null);

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="grid gap-5 md:grid-cols-2">
          {resultGallery.map((item) => (
            <button
              key={item.title}
              onClick={() => setActive(item)}
              className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] text-left shadow-glow transition hover:-translate-y-0.5 hover:border-cyan/30"
            >
              <img src={item.path} alt={item.title} className="aspect-[4/3] w-full object-cover" />
              <div className="p-4">
                <h3 className="font-display text-xl font-semibold text-paper">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-steel">{item.caption}</p>
              </div>
            </button>
          ))}
        </div>

        <aside className="rounded-[1.75rem] border border-white/10 bg-slate/70 p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-cyan">Downloads</p>
          <div className="mt-5 space-y-3">
            {downloadLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-paper transition hover:border-cyan/40 hover:bg-cyan/10"
              >
                {item.label}
              </a>
            ))}
          </div>
        </aside>
      </div>

      {active ? (
        <button
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050b]/90 p-5"
          onClick={() => setActive(null)}
        >
          <div className="max-h-[92vh] max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate shadow-glow">
            <img src={active.path} alt={active.title} className="max-h-[70vh] w-full object-contain bg-black" />
            <div className="border-t border-white/10 p-5 text-left">
              <p className="font-display text-2xl font-semibold text-paper">{active.title}</p>
              <p className="mt-2 text-sm leading-7 text-steel">{active.caption}</p>
            </div>
          </div>
        </button>
      ) : null}
    </>
  );
}
