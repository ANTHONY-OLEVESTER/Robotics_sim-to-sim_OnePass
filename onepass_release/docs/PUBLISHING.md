# Publishing Notes

This page defines what to ship when republishing this curated bundle or rebuilding it from the original source workspace.

## Minimum Release Payload

For a full reproducible deposit from the source workspace, include these paths together:

- `onepass_release/`
- `reports/stress_20260203-173231/`
- `reports/20260210-173200/behavioral_acceptance/`
- `reports/delta_train_hardgen_fix_20260203-135301/`
- `reports/delta_train_move_ab/`
- `plans/panda_move_ab_seed0.jsonl`
- `plans/panda_acrobatics_seed0.jsonl`
- `configs/acrobatics_corr_policies.yaml`
- hard-mode datasets referenced by the canonical stress command:
  - `data_pybullet/paired_bullet_hardgen_seeds0-5.npz`
  - `data_mujoco/paired_mujoco_hardgen_seeds0-5.npz`

## GitHub Release Checklist

- point the repo root README at `onepass_release/README.md`
- verify `onepass_release/configs/canonical_sources.json`
- rerun `onepass_release/scripts/package_release_assets.py` if canonical source files changed
- confirm videos and preview PNGs open correctly from `onepass_release/outputs/canonical_pass/`
- attach a zipped curated bundle if repository browsing performance matters

## Zenodo Checklist

- archive the exact release tag used for the public artifact
- include the curated release folder plus the exact source report folders and model folders listed above
- preserve the canonical metrics JSON and copied source reports for traceability
- describe the artifact as a curated proof package, not a full raw experimental dump

## Rebuild Rule

If the canonical PASS source changes, update:

1. `onepass_release/configs/canonical_sources.json`
2. `onepass_release/RESULTS_SUMMARY.md`
3. `onepass_release/VISUAL_INDEX.md`
4. run `onepass_release/scripts/package_release_assets.py`
