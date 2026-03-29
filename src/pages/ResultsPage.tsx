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
        eyebrow="3D overlays"
        title="The 3D correction plots are here"
        description="The end-effector and object 3D overlays are part of the packaged public evidence. They are surfaced explicitly here so they are not buried inside the larger gallery."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <a
            href={assetPath("images/ee-traj-3d.png")}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] text-left shadow-glow transition hover:border-cyan/30"
          >
            <img
              src={assetPath("images/ee-traj-3d.png")}
              alt="End-effector 3D correction overlay"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan">3D overlay</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
                End-effector 3D correction
              </h3>
              <p className="mt-3 text-sm leading-7 text-steel">
                Spatial overlay for raw Bullet, MuJoCo reference, and corrected Bullet end-effector trajectories.
              </p>
            </div>
          </a>
          <a
            href={assetPath("images/obj-traj-3d.png")}
            className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] text-left shadow-glow transition hover:border-cyan/30"
          >
            <img
              src={assetPath("images/obj-traj-3d.png")}
              alt="Object 3D correction overlay"
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.22em] text-cyan">3D overlay</p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
                Object 3D correction
              </h3>
              <p className="mt-3 text-sm leading-7 text-steel">
                3D object-motion overlay showing how closely the corrected rollout tracks the MuJoCo reference.
              </p>
            </div>
          </a>
        </div>
      </SectionBlock>

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
