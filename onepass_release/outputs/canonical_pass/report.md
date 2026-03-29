# Canonical PASS Report

This curated release packages two existing PASS artifacts:

- Quantitative hard-mode PASS: `reports/stress_20260203-173231`
- Visual/behavioral PASS: `reports/20260210-173200/behavioral_acceptance`

## Main claim

Residual correction reduces cross-simulator one-step error and stays stable across long-horizon rollouts under the repo's alignment and holdout gates, while also supporting a visually inspectable behavioral PASS demo.

## Quantitative anchor

- Final verdict: `PASS`
- Raw one-step phys mean/p95/max: `0.094146 / 0.119573 / 0.462656`
- Corrected one-step phys mean/p95/max: `0.010607 / 0.020735 / 0.100617`
- TF-50 phys mean/p95/max: `0.010027 / 0.017327 / 0.084418`
- TF-500 phys mean/p95/max: `0.010959 / 0.022175 / 0.087237`

## Visual/behavioral anchor

- Motion gate: `PASS`
- Cross-sim agreement gate: `PASS`
- Correction visibility gate: `PASS`
- Correction rollout improves gate: `PASS`
- Acrobatics gate: `PASS`
- End-effector distance to target: `8.394202450290322e-05`
- Bullet vs MuJoCo end distance: `0.032857298826639444`
- Raw vs ref EE max deviation: `0.07311303024415934`
- Corrected vs ref EE max deviation: `0.07298209576691682`
- Selected correction alpha: `0.005`

## Provenance

- `source_stress_report.md` and `source_stress_metrics.json` are copied verbatim from the original hard-mode PASS run.
- `source_behavioral_report.md` and the copied previews/videos come from the original behavioral PASS run.
