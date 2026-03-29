import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImageCompare } from "../components/ImageCompare";
import { MetricCard } from "../components/MetricCard";
import { PipelineDiagram } from "../components/PipelineDiagram";
import { SectionBlock } from "../components/SectionBlock";
import { VideoPanel } from "../components/VideoPanel";
import {
  assetPath,
  evidenceCards,
  heroMetrics,
  limitations,
  metricGroups,
  pypiUrl,
  repoUrl
} from "../data/siteContent";

type MetricGroupKey = keyof typeof metricGroups;

export function ShowcasePage() {
  const [metricView, setMetricView] = useState<MetricGroupKey>("oneStep");

  function scrollToVisualProof() {
    document.getElementById("visual-proof")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-surface opacity-30" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan">
              Visual proof first
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-5xl font-semibold leading-[0.95] tracking-tight text-paper md:text-7xl">
              Deterministic Bullet-to-MuJoCo correction, shown before it is explained.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-steel md:text-xl">
              Sim2Sim-OnePass is a robotics sim-to-sim research artifact. It packages
              the canonical PASS evidence so reviewers can watch the behavior, inspect
              the metrics, and see how the claim is gated.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={scrollToVisualProof}
                className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:opacity-90"
              >
                Watch the comparison
              </button>
              <NavLink
                to="/docs"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper transition hover:border-cyan/40 hover:bg-cyan/10"
              >
                Open documentation
              </NavLink>
              <a
                href={pypiUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper transition hover:border-cyan/40 hover:bg-cyan/10"
              >
                Install from PyPI
              </a>
              <a
                href={repoUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-paper transition hover:border-cyan/40 hover:bg-cyan/10"
              >
                GitHub repository
              </a>
            </div>
          </div>

          <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5 shadow-glow">
            <div className="grid gap-4 sm:grid-cols-2">
              {heroMetrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionBlock
        eyebrow="Companion package"
        title="Install the lightweight CLI without cloning the full repo"
        description="The published package is intentionally narrow. It gives users docs access, results navigation, environment checks, and selected curated utilities without pretending to ship the full simulator stack."
      >
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mint">
              Published package
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-paper">
              sim2sim-onepass
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-steel">
              Use the companion package when you want the CLI, embedded markdown docs,
              results navigation, environment checks, and the tiny quick-sanity demo.
              Use the repo when you need the full curated evidence bundle and source-workspace references.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={pypiUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:opacity-90"
              >
                Open PyPI package
              </a>
              <code className="rounded-full border border-white/10 bg-black/20 px-4 py-3 text-sm text-paper">
                pip install sim2sim-onepass
              </code>
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-mint/25 bg-mint/10 p-6 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mint">
              Scope
            </p>
            <p className="mt-4 text-sm leading-7 text-paper">
              The package does not ship full simulator environments, full datasets, or the full visual media payload.
              It is a companion interface for the public research release, not a standalone robotics simulator framework.
            </p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Main evidence"
        title="One triptych, one minute, no scavenger hunt"
        description="The site leads with the actual synchronized comparison video because this project lives or dies on visible cross-simulator behavior, not on decorative frontend motion."
      >
        <div id="visual-proof">
          <VideoPanel />
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Why it matters"
        title="Trust comes from gating, not presentation"
        description="The public claim is intentionally narrow. The model is not replacing simulator physics. It is correcting measured next-state discrepancy under deterministic pairing and explicit validation checks."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {evidenceCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-glow"
            >
              <h3 className="font-display text-2xl font-semibold text-paper">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-steel">{card.body}</p>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Before vs after"
        title="Use interaction only where it clarifies the evidence"
        description="The current artifact does not include a standalone corrected-only frame export, so this slider honestly compares the raw Bullet frame with the triptych still that exposes the corrected panel in context."
      >
        <ImageCompare
          beforeSrc={assetPath("images/bullet-raw-frame0.png")}
          afterSrc={assetPath("images/triptych-frame0.png")}
          beforeLabel="Bullet raw"
          afterLabel="Triptych context"
          note="Move the slider to compare the standalone raw Bullet render against the triptych still. The corrected rollout is visible as the right-hand panel inside the triptych image. Add /public/assets/videos/bullet-corrected.mp4 later if you want a corrected-only card."
        />
      </SectionBlock>

      <SectionBlock
        eyebrow="Metrics"
        title="Switch between one-step, rollout, and contact views"
        description="The canonical PASS story is stronger when the viewer can change the lens without leaving the page. These cards use the packaged PASS metrics, not invented numbers."
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
        eyebrow="How it works"
        title="Watch the system flow and inspect each stage"
        description="This section is the interactive remake of the paper pipeline figure. The board auto-scales to the viewport, the pass animates through the pipeline, and clicking a block explains how deterministic pairing, gating, residual correction, projection, and validation connect."
      >
        <PipelineDiagram />
      </SectionBlock>

      <SectionBlock
        eyebrow="Canonical PASS"
        title="The public artifact is anchored on one quantitative PASS and one visual PASS"
        description="The hard-mode stress PASS is the quantitative anchor. The behavioral acceptance PASS is the visual anchor. They are packaged together because they answer different reviewer questions."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <article className="rounded-[1.75rem] border border-cyan/25 bg-cyan/10 p-6 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
              Quantitative anchor
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-paper">
              Hard-mode stress PASS
            </h3>
            <p className="mt-4 text-sm leading-7 text-paper">
              Final verdict PASS. One-step physical error drops from 0.1196 p95 to
              0.0207 p95, and teacher-forced rollout remains stable through horizon 500
              at 0.0222 p95.
            </p>
            <a
              href={assetPath("reports/source-stress-report.md")}
              className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-paper transition hover:border-cyan/40 hover:bg-white/5"
            >
              Open stress report
            </a>
          </article>
          <article className="rounded-[1.75rem] border border-mint/25 bg-mint/10 p-6 shadow-glow">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-mint">
              Visual anchor
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold text-paper">
              Behavioral PASS
            </h3>
            <p className="mt-4 text-sm leading-7 text-paper">
              Motion, cross-sim agreement, correction visibility, correction rollout
              improvement, and acrobatics all pass in the selected public demonstration run.
            </p>
            <a
              href={assetPath("reports/source-behavioral-report.md")}
              className="mt-6 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-paper transition hover:border-mint/40 hover:bg-white/5"
            >
              Open behavioral report
            </a>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Scope"
        title="What this site does not claim"
        description="The strongest public-facing research artifacts are clear about boundaries. This section is intentionally plain."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {limitations.map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-steel">
              {item}
            </div>
          ))}
        </div>
      </SectionBlock>
    </>
  );
}
