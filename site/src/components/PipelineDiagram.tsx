import { useState } from "react";
import { assetPath, pipelineSteps } from "../data/siteContent";

export function PipelineDiagram() {
  const [open, setOpen] = useState(0);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="grid gap-4">
        {pipelineSteps.map((step, index) => (
          <button
            key={step.title}
            type="button"
            onClick={() => setOpen(index)}
            className={`rounded-[1.75rem] border p-5 text-left transition ${
              open === index
                ? "border-cyan/40 bg-cyan/10 shadow-glow"
                : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-semibold text-paper">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-steel">{step.summary}</p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-steel">
                {open === index ? "open" : "expand"}
              </span>
            </div>
            {open === index ? (
              <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-paper">
                {step.detail}
              </p>
            ) : null}
          </button>
        ))}
      </div>
      <aside className="grid-surface rounded-[2rem] border border-white/10 bg-slate/60 p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
          Evidence path
        </p>
        <div className="mt-6 space-y-5">
          {["Plans", "Alignment", "Residual", "Stress", "Visual PASS"].map((label, idx) => (
            <div key={label} className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan/30 bg-cyan/10 font-display text-lg font-semibold text-cyan">
                {idx + 1}
              </div>
              <div className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-paper">
                {label}
              </div>
            </div>
          ))}
        </div>
        <a
          href={assetPath("reports/pipeline.pdf")}
          className="mt-8 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-paper transition hover:border-cyan/50 hover:bg-cyan/10"
        >
          Open canonical pipeline PDF
        </a>
      </aside>
    </div>
  );
}
