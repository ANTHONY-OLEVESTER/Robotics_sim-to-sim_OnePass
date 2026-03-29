# Repo Map

This repository is intentionally small. It is a curated artifact layer, not the full development workspace.

## Public Layer

- [`README.md`](README.md): entry point for a first-time reviewer.
- [`QUICKSTART.md`](QUICKSTART.md): shortest runnable path.
- [`VISUAL_INDEX.md`](VISUAL_INDEX.md): visual evidence map.
- [`RESULTS_SUMMARY.md`](RESULTS_SUMMARY.md): canonical metrics and claim boundaries.
- [`MANIFEST.md`](MANIFEST.md): what is included here and what is intentionally left out.
- [`PYPI_PACKAGE_NOTES.md`](PYPI_PACKAGE_NOTES.md): package design, exclusions, and local build checklist.
- [`outputs/canonical_pass/`](outputs/canonical_pass/): copied, reviewer-facing artifacts from selected PASS runs.

## Public Endpoints

- Repository: `https://github.com/ANTHONY-OLEVESTER/Robotics_sim-to-sim_OnePass`
- Website: `https://anthony-olevester.github.io/Robotics_sim-to-sim_OnePass/`
- PyPI companion package: `https://pypi.org/project/sim2sim-onepass/`

## Packaged Evidence

- [`outputs/canonical_pass/source_stress_report.md`](outputs/canonical_pass/source_stress_report.md): copied quantitative PASS report
- [`outputs/canonical_pass/source_stress_metrics.json`](outputs/canonical_pass/source_stress_metrics.json): copied quantitative metrics
- [`outputs/canonical_pass/source_behavioral_report.md`](outputs/canonical_pass/source_behavioral_report.md): copied behavioral PASS report
- [`outputs/canonical_pass/source_triptych_report.md`](outputs/canonical_pass/source_triptych_report.md): copied triptych provenance
- [`configs/canonical_sources.json`](configs/canonical_sources.json): original source-path provenance metadata

## Supporting Docs

- [`docs/CANONICAL_SOURCES.md`](docs/CANONICAL_SOURCES.md): provenance summary
- [`docs/PUBLISHING.md`](docs/PUBLISHING.md): publication and re-bundling notes

## Package Code

- [`pyproject.toml`](pyproject.toml): build metadata and console entrypoint
- [`MANIFEST.in`](MANIFEST.in): source distribution include/exclude rules
- [`LICENSE`](LICENSE): Apache-2.0 license text
- [`src/sim2sim_onepass/`](src/sim2sim_onepass/): installable public package
- [`src/sim2sim_onepass/cli.py`](src/sim2sim_onepass/cli.py): `sim2sim-onepass` CLI
- [`src/sim2sim_onepass/wrappers/`](src/sim2sim_onepass/wrappers/): thin curated workflow wrappers
- [`src/sim2sim_onepass/resources/`](src/sim2sim_onepass/resources/): embedded lightweight markdown docs shipped in the wheel

## Canonical Vs Legacy

- Canonical for this release means: explicitly selected PASS artifacts that support the main public claim and can be inspected quickly.
- Legacy/development means: training code, simulator environments, timestamped historical reports, debug scripts, and intermediate experiments from the original workspace that are not included in this trimmed repo.
- This public repo only ships the guided proof bundle and the provenance needed to understand it.
- The interactive website is maintained separately on the `gh-pages` branch.
- The PyPI package is intentionally narrower than the full source workspace and excludes heavy datasets, giant videos, and simulator internals.
