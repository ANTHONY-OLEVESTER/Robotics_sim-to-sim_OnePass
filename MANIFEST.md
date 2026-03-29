# Manifest

This file defines what this curated release intentionally includes and excludes.

## Included In The Curated Release

- [`README.md`](README.md), [`QUICKSTART.md`](QUICKSTART.md), [`REPO_MAP.md`](REPO_MAP.md), [`VISUAL_INDEX.md`](VISUAL_INDEX.md), [`RESULTS_SUMMARY.md`](RESULTS_SUMMARY.md)
- [`configs/canonical_sources.json`](configs/canonical_sources.json)
- [`scripts/package_release_assets.py`](scripts/package_release_assets.py)
- [`examples/canonical_commands.ps1`](examples/canonical_commands.ps1)
- [`assets/pipeline.pdf`](assets/pipeline.pdf)
- [`outputs/canonical_pass/report.md`](outputs/canonical_pass/report.md)
- [`outputs/canonical_pass/metrics_summary.json`](outputs/canonical_pass/metrics_summary.json)
- copied canonical plots, previews, and videos under [`outputs/canonical_pass/`](outputs/canonical_pass/)
- copied source reports:
  - `source_stress_report.md`
  - `source_stress_metrics.json`
  - `source_behavioral_report.md`
  - `source_triptych_report.md`

## Intentionally Excluded From The Curated Layer

- all raw frame dumps from the original report folders
- most timestamped `reports/` runs that are intermediate, failed, or redundant
- training logs and exploratory experiments not needed to understand the public claim
- full paper build artifacts
- third-party simulator assets and environment internals copied into the release layer
- debug-only scripts and one-off diagnostics copied into the release layer

## Why These Items Are Canonical

- `reports/stress_20260203-173231` is canonical because it is the clearest documented PASS for the quantitative hard-mode claim.
- `reports/20260210-173200/behavioral_acceptance` is canonical because it is a clean visual PASS with motion, visibility, rollout-improvement, and acrobatics gates all passing.
- The copied release assets are small, human-readable, and enough to verify the claim without browsing unrelated history.

## Why The Rest Stays In The Repo

- The original repository still serves as provenance and development history.
- This release layer does not delete that history; it only controls what a reviewer sees first.
- Future pruning can happen later, after confirming which historical runs must remain for reproducibility.
