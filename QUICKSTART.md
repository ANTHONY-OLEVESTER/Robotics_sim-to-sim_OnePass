# Quickstart

This page is the shortest path from clone to evidence.

## Zero-Compute Path

If you only want to inspect the curated release artifacts, open these in order:

1. [`README.md`](README.md)
2. [`VISUAL_INDEX.md`](VISUAL_INDEX.md)
3. [`outputs/canonical_pass/preview/triptych_frame0.png`](outputs/canonical_pass/preview/triptych_frame0.png)
4. [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
5. [`RESULTS_SUMMARY.md`](RESULTS_SUMMARY.md)

Related public surfaces:

- website: `https://anthony-olevester.github.io/Robotics_sim-to-sim_OnePass/`
- PyPI package: `https://pypi.org/project/sim2sim-onepass/`

## Package Install

Editable install from the repo:

```powershell
python -m pip install -e .
```

Published PyPI install:

```powershell
python -m pip install sim2sim-onepass
```

Package page:

```text
https://pypi.org/project/sim2sim-onepass/
```

Optional rollout extra:

```powershell
python -m pip install "sim2sim-onepass[rollout]"
```

First commands to run after install:

```powershell
sim2sim-onepass info
sim2sim-onepass check-env
sim2sim-onepass quickstart
sim2sim-onepass results-summary
```

## Fastest Path

This public repository already includes the selected proof artifacts. You can verify the main story without running any code:

1. Open [`outputs/canonical_pass/report.md`](outputs/canonical_pass/report.md)
2. Open [`outputs/canonical_pass/metrics_summary.json`](outputs/canonical_pass/metrics_summary.json)
3. Watch [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
4. Inspect [`outputs/canonical_pass/plots/rollout_phys_p95.png`](outputs/canonical_pass/plots/rollout_phys_p95.png)

If you prefer the website-first path, open:

```text
https://anthony-olevester.github.io/Robotics_sim-to-sim_OnePass/
```

## Environment Setup

The command references below come from the original source workspace used to build this artifact. They are preserved here for provenance and rerun guidance, but the full source tree is not part of this trimmed public repo.

```powershell
py -m venv .bridge312
.\.bridge312\Scripts\Activate.ps1
python -m pip install -U pip
pip install -r requirements_bridge312.txt
```

## Minimal Validation

The package exposes lightweight public commands:

```powershell
sim2sim-onepass quick-sanity --demo
sim2sim-onepass quick-sanity --bullet data_pybullet\paired_bullet_seed0.npz --mujoco data_mujoco\paired_mujoco_seed0.npz
sim2sim-onepass rollout-check --bullet data_pybullet\paired_bullet_hardgen_seeds0-5.npz --mujoco data_mujoco\paired_mujoco_hardgen_seeds0-5.npz --model reports\delta_train_hardgen_fix_20260203-135301\model.pt --norm reports\delta_train_hardgen_fix_20260203-135301\normalization.json
```

Notes:

- `quick-sanity --demo` is the tiny built-in package-only demo path.
- `rollout-check` requires user-provided paired data, model, normalization files, and the optional rollout extra.
- simulator-heavy commands such as alignment gating are intentionally guarded and require the full curated repo layout plus simulator dependencies.

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

## Build Prep

Local package build commands:

```powershell
python -m pip install -U build twine
python -m build
python -m twine check dist/*
```
