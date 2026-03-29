import { NavLink } from "react-router-dom";
import { assetPath, pypiUrl, repoUrl } from "../data/siteContent";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#05090f]/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-steel md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-base font-semibold text-paper">
            Sim2Sim-OnePass
          </p>
          <p className="mt-2 max-w-sm leading-7">
            A compact public site built around visual proof, canonical PASS metrics,
            and exact reproducibility references.
          </p>
        </div>
        <div className="space-y-2">
          <p className="font-semibold uppercase tracking-[0.18em] text-paper">
            Explore
          </p>
          <NavLink className="block hover:text-paper" to="/">
            Showcase
          </NavLink>
          <NavLink className="block hover:text-paper" to="/results">
            Results
          </NavLink>
          <NavLink className="block hover:text-paper" to="/docs">
            Documentation
          </NavLink>
        </div>
        <div className="space-y-2">
          <p className="font-semibold uppercase tracking-[0.18em] text-paper">
            External
          </p>
          <a href={repoUrl} rel="noreferrer" target="_blank" className="block hover:text-paper">
            GitHub repository
          </a>
          <a href={pypiUrl} rel="noreferrer" target="_blank" className="block hover:text-paper">
            PyPI package
          </a>
          <a href={assetPath("reports/canonical-pass-report.md")} className="block hover:text-paper">
            Canonical report
          </a>
          <a href={assetPath("reports/metrics-summary.json")} className="block hover:text-paper">
            Metrics JSON
          </a>
        </div>
      </div>
    </footer>
  );
}
