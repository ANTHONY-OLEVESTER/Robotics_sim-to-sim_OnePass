# Quickstart

This page is the shortest path from clone to evidence.

## Zero-Compute Path

If you only want to inspect the curated release artifacts, open these in order:

1. [`README.md`](README.md)
2. [`../site/README.md`](../site/README.md)
3. [`VISUAL_INDEX.md`](VISUAL_INDEX.md)
4. [`outputs/canonical_pass/preview/triptych_frame0.png`](outputs/canonical_pass/preview/triptych_frame0.png)
5. [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
6. [`RESULTS_SUMMARY.md`](RESULTS_SUMMARY.md)

## Fastest Path

This public repository already includes the selected proof artifacts. You can verify the main story without running any code:

1. Open [`outputs/canonical_pass/report.md`](outputs/canonical_pass/report.md)
2. Open [`outputs/canonical_pass/metrics_summary.json`](outputs/canonical_pass/metrics_summary.json)
3. Watch [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
4. Inspect [`outputs/canonical_pass/plots/rollout_phys_p95.png`](outputs/canonical_pass/plots/rollout_phys_p95.png)

## Environment Setup

The command references below come from the original source workspace used to build this artifact. They are preserved here for provenance and rerun guidance, but the full source tree is not part of this trimmed public repo.

```powershell
py -m venv .bridge312
.\.bridge312\Scripts\Activate.ps1
python -m pip install -U pip
pip install -r requirements_bridge312.txt
```

## Minimal Validation

Run the alignment gate first. This is the repo's hard stop before any model claim:

```powershell
.\.bridge312\Scripts\python scripts\alignment_gate.py
```

Expected outcome in the source workspace: `PASS`.

Run the curated behavioral proof path with the existing demo model:

```powershell
.\.bridge312\Scripts\python scripts\behavioral_acceptance_suite.py --model reports\delta_train_move_ab\model.pt --norm reports\delta_train_move_ab\normalization.json
```

What this should produce in the source workspace:

- a timestamped `reports/<timestamp>/behavioral_acceptance/` folder
- Bullet replay video
- MuJoCo replay video
- triptych comparison video
- overlay plots
- a `report.md` with PASS/FAIL gates

## Main Claim Verification

This is the canonical quantitative command used for the public claim, using the existing hard-mode model and datasets:

```powershell
.\.bridge312\Scripts\python scripts\stress_suite.py --bullet data_pybullet\paired_bullet_hardgen_seeds0-5.npz --mujoco data_mujoco\paired_mujoco_hardgen_seeds0-5.npz --model reports\delta_train_hardgen_fix_20260203-135301\model.pt --norm reports\delta_train_hardgen_fix_20260203-135301\normalization.json --horizons 50,200,500 --nstart 200 --seed 0 --hard_mode 1
```

Expected canonical source result in the source workspace: `reports/stress_20260203-173231`.

## Inspect Outputs

Open these packaged copies after running or after browsing the preselected release bundle:

- [`outputs/canonical_pass/report.md`](outputs/canonical_pass/report.md)
- [`outputs/canonical_pass/metrics_summary.json`](outputs/canonical_pass/metrics_summary.json)
- [`outputs/canonical_pass/plots/`](outputs/canonical_pass/plots/)
- [`outputs/canonical_pass/preview/`](outputs/canonical_pass/preview/)
- [`outputs/canonical_pass/videos/`](outputs/canonical_pass/videos/)
