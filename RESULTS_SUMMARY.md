# Results Summary

This curated release uses two canonical sources:

- Quantitative hard-mode PASS: `reports/stress_20260203-173231`
- Visual/behavioral PASS: `reports/20260210-173200/behavioral_acceptance`

## Main PASS Metrics

From the hard-mode PASS run:

- Raw one-step phys mean/p95/max: `0.094146 / 0.119573 / 0.462656`
- Corrected one-step phys mean/p95/max: `0.010607 / 0.020735 / 0.100617`
- TF-50 phys mean/p95/max: `0.010027 / 0.017327 / 0.084418`
- TF-200 phys mean/p95/max: `0.009903 / 0.017425 / 0.082128`
- TF-500 phys mean/p95/max: `0.010959 / 0.022175 / 0.087237`
- Contact-flag accuracy: `0.991075`
- Contact-force proxy p95: `0.123553`
- Min-distance proxy p95: `0.004645`

From the behavioral PASS run:

- Motion gate: `PASS`
- Cross-sim agreement gate: `PASS`
- Correction visibility gate: `PASS`
- Correction rollout improves gate: `PASS`
- Acrobatics gate: `PASS`
- End-effector distance to target: `8.394202450290322e-05`
- Bullet-vs-MuJoCo end distance: `0.032857298826639444`

## What These Metrics Mean

- Raw one-step phys error is the uncorrected Bullet-to-MuJoCo mismatch baseline.
- Corrected one-step phys error is the same next-state comparison after applying the learned residual.
- Teacher-forced rollout phys error measures long-horizon state agreement under repeated rollout evaluation.
- Contact-proxy metrics are diagnostics about contact observability and consistency, not the sole proof of physical success.
- Behavioral gates confirm that the replay artifacts are deterministic, visually inspectable, and not obviously unstable.

## Operational Gates Vs Diagnostics

Operational gates for the main claim:

- alignment gate must pass
- corrected one-step thresholds must pass
- rollout thresholds at horizons 50, 200, and 500 must pass
- holdout checks must pass
- no NaN/Inf or divergence is allowed

Diagnostics that support interpretation but are not the entire claim:

- contact proxy summaries
- worst-slice breakdowns
- alpha sweep details in the behavioral report
- visual overlay plots and triptych videos

## Scope And Limits

- The public claim is about simulator-to-simulator residual correction, not real-robot deployment.
- The canonical quantitative evidence is a hard-mode dataset evaluation, not the behavioral move-A-to-B demo itself.
- The visual package intentionally uses a separate behavioral PASS run because it is easier to inspect than the hard-mode stress suite.
- The corrected behavioral improvement is measurable but visually subtle; reviewers should inspect both the triptych video and the overlay plots instead of expecting a dramatic scene change.
- Many timestamped report folders remain in the repo for provenance. They are not all part of the curated story.
