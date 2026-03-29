import { useState } from "react";
import { MetricCard } from "../components/MetricCard";
import { ResultsGallery } from "../components/ResultsGallery";
import { SectionBlock } from "../components/SectionBlock";
import { assetPath, metricGroups } from "../data/siteContent";

type MetricGroupKey = keyof typeof metricGroups;

export function ResultsPage() {
  const [metricView, setMetricView] = useState<MetricGroupKey>("rollout");

  return (
    <>
      <SectionBlock
        eyebrow="Visual explorer"
        title="All key visuals and metrics in one place"
        description="This page is for reviewers who want the evidence organized side by side: previews, overlay plots, downloadable reports, and metric toggles."
      >
        <ResultsGallery />
      </SectionBlock>

      <SectionBlock
        eyebrow="Metric explorer"
        title="Change the metric lens without leaving the evidence page"
        description="The numbers below are sourced from the packaged canonical PASS metrics and grouped by reviewer question."
        action={
          <div className="flex flex-wrap gap-2">
            {Object.keys(metricGroups).map((group) => (
              <button
                key={group}
                onClick={() => setMetricView(group as MetricGroupKey)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  metricView === group
                    ? "bg-paper text-ink"
                    : "border border-white/10 bg-white/[0.03] text-steel hover:text-paper"
                }`}
              >
                {group === "oneStep"
                  ? "One-step"
                  : group === "rollout"
                    ? "Rollout"
                    : "Contact slices"}
              </button>
            ))}
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metricGroups[metricView].map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Reference"
        title="Canonical artifact references"
        description="These references are the main trust anchors for the public proof package."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <a
            href={assetPath("reports/canonical-pass-report.md")}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">Markdown</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
              Canonical PASS report
            </h3>
            <p className="mt-3 text-sm leading-7 text-steel">
              Release-side summary of the selected quantitative and visual PASS anchors.
            </p>
          </a>
          <a
            href={assetPath("reports/metrics-summary.json")}
            className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">JSON</p>
            <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
              Metrics summary
            </h3>
            <p className="mt-3 text-sm leading-7 text-steel">
              Machine-readable canonical metrics for the public site and downstream analysis.
            </p>
          </a>
        </div>
      </SectionBlock>
    </>
  );
}
