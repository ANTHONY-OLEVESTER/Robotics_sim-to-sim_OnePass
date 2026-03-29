import { SectionBlock } from "../components/SectionBlock";
import { codeSnippets, docsSections, pypiUrl } from "../data/siteContent";

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto rounded-[1.5rem] border border-white/10 bg-[#03070d] p-5 text-sm leading-7 text-paper">
      <code>{code}</code>
    </pre>
  );
}

export function DocsPage() {
  return (
    <>
      <SectionBlock
        eyebrow="Technical page"
        title="Reproduction notes, command references, and repo logic"
        description="This page stays technical on purpose. It explains how the evidence was produced, what to run first, and how the curated artifact maps back to the original source workspace."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {docsSections.map((section) => (
            <article key={section.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-glow">
              <h3 className="font-display text-2xl font-semibold text-paper">{section.title}</h3>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-steel">
                {section.items.map((item) => (
                  <li key={item} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Package"
        title="Published companion package"
        description="The PyPI package is the lightweight install path for docs access, results navigation, environment checks, and selected curated utilities."
      >
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <CodeBlock code={codeSnippets.packageInstall} />
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-glow">
            <p className="text-xs uppercase tracking-[0.22em] text-mint">Package page</p>
            <a
              href={pypiUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-paper transition hover:border-mint/50 hover:bg-white/5"
            >
              Open sim2sim-onepass on PyPI
            </a>
            <p className="mt-4 text-sm leading-7 text-steel">
              The package is intentionally lightweight. Full simulator execution still depends on the curated repo layout and simulator dependencies.
            </p>
          </div>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Setup"
        title="Environment and startup"
        description="These commands come from the source workspace used to build the public artifact. They are preserved here for reproducibility guidance."
      >
        <CodeBlock code={codeSnippets.setup} />
      </SectionBlock>

      <SectionBlock
        eyebrow="Execution"
        title="Canonical execution order"
        description="If you are rebuilding the evidence from the source workspace, this is the shortest technically honest command flow."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-cyan">1. Alignment gate</p>
            <div className="mt-4">
              <CodeBlock code={codeSnippets.alignment} />
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-mint">2. Visual outputs</p>
            <div className="mt-4">
              <CodeBlock code={codeSnippets.visuals} />
            </div>
          </article>
          <article className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5">
            <p className="text-xs uppercase tracking-[0.22em] text-ember">3. Stress suite</p>
            <div className="mt-4">
              <CodeBlock code={codeSnippets.stress} />
            </div>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Structure"
        title="How the public artifact is organized"
        description="The site, the curated release bundle, and the source-workspace references all have distinct roles."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-display text-xl font-semibold text-paper">site/</h3>
            <p className="mt-3 text-sm leading-7 text-steel">
              Static Vite/React frontend. Built to surface the evidence quickly, not to
              mirror the whole research workspace.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-display text-xl font-semibold text-paper">public/assets/</h3>
            <p className="mt-3 text-sm leading-7 text-steel">
              Public media payload: videos, preview frames, plots, and copied reports used
              by the site.
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
            <h3 className="font-display text-xl font-semibold text-paper">onepass_release/</h3>
            <p className="mt-3 text-sm leading-7 text-steel">
              The markdown-first curated package that this site is built around.
            </p>
          </article>
        </div>
      </SectionBlock>

      <SectionBlock
        eyebrow="Visual generation"
        title="How the visual outputs fit into the workflow"
        description="The site uses real exported media from the curated release bundle. If you regenerate the artifact later, replace files in public/assets with updated canonical outputs."
      >
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 prose-block">
          <p>
            Videos live in <code>/public/assets/videos/</code>. Still frames and overlay plots
            live in <code>/public/assets/images/</code>. Canonical reports and machine-readable
            summaries live in <code>/public/assets/reports/</code>.
          </p>
          <p>
            The current site ships three real videos: raw Bullet, MuJoCo reference, and
            the synchronized triptych comparison. A corrected-only MP4 path is reserved
            but not populated in the current artifact, which is why the showcase explains
            that the corrected view appears in the triptych right panel.
          </p>
        </div>
      </SectionBlock>
    </>
  );
}
