# Canonical Sources

This release layer was rebuilt from existing source-workspace artifacts, not from regenerated science.

## Quantitative Source

- Original source directory: `reports/stress_20260203-173231`
- Key files:
  - `report.md`
  - `metrics.json`
- Purpose: hard-mode quantitative PASS for the main residual-correction claim

## Visual Source

- Original source directory: `reports/20260210-173200/behavioral_acceptance`
- Key files:
  - `report.md`
  - `triptych/report.md`
  - `bullet_raw/video.mp4`
  - `mujoco_ref/video.mp4`
  - `triptych/compare_triptych.mp4`
  - `plots/*.png`
- Purpose: reviewer-friendly behavioral PASS with visual evidence

## Packaging Mechanism

- Script: [`../scripts/package_release_assets.py`](../scripts/package_release_assets.py)
- Output bundle: [`../outputs/canonical_pass/`](../outputs/canonical_pass/)
- Source mapping config: [`../configs/canonical_sources.json`](../configs/canonical_sources.json)

## Provenance Policy

- Copied markdown and JSON files preserve the original source values.
- Release-side summary files only reorganize and condense existing PASS evidence.
- If a future run becomes the new canonical source, update `canonical_sources.json`, rebuild the package from the source workspace, and refresh the copied outputs.
