# Visual Index

This release is organized for visual inspection first.

## Start Here

- [`outputs/canonical_pass/preview/triptych_frame0.png`](outputs/canonical_pass/preview/triptych_frame0.png)
  What to look for: the left panel is Bullet raw, the middle panel is MuJoCo reference, and the right panel is Bullet after residual correction.

- [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
  What to look for: whether the corrected panel tracks the MuJoCo reference more closely than the raw Bullet panel over the same scripted rollout.

## Bullet Replay

- [`outputs/canonical_pass/preview/bullet_raw_frame0.png`](outputs/canonical_pass/preview/bullet_raw_frame0.png)
  What to look for: the initial Bullet scene used in the curated behavioral PASS.

- [`outputs/canonical_pass/videos/bullet_raw.mp4`](outputs/canonical_pass/videos/bullet_raw.mp4)
  What to look for: deterministic replay quality and the uncorrected trajectory that the residual model must improve against.

## MuJoCo Replay

- [`outputs/canonical_pass/preview/mujoco_ref_frame0.png`](outputs/canonical_pass/preview/mujoco_ref_frame0.png)
  What to look for: the matching MuJoCo initial scene for the same scripted plan.

- [`outputs/canonical_pass/videos/mujoco_ref.mp4`](outputs/canonical_pass/videos/mujoco_ref.mp4)
  What to look for: the target reference behavior for the visual comparison.

## Corrected Replay

- [`outputs/canonical_pass/videos/compare_triptych.mp4`](outputs/canonical_pass/videos/compare_triptych.mp4)
  What to look for: the corrected replay is the right-hand panel of the triptych. The repo currently surfaces corrected behavior through the combined triptych export rather than a standalone corrected-only render.

## Overlay Plots

- [`outputs/canonical_pass/plots/ee_traj_xy.png`](outputs/canonical_pass/plots/ee_traj_xy.png)
  What to look for: whether the corrected end-effector path closes the gap toward the MuJoCo reference in the task plane.

- [`outputs/canonical_pass/plots/ee_traj_3d.png`](outputs/canonical_pass/plots/ee_traj_3d.png)
  What to look for: height and spatial consistency, not just XY overlap.

- [`outputs/canonical_pass/plots/obj_traj_xy.png`](outputs/canonical_pass/plots/obj_traj_xy.png)
  What to look for: object motion agreement across raw, reference, and corrected rollouts.

- [`outputs/canonical_pass/plots/obj_traj_3d.png`](outputs/canonical_pass/plots/obj_traj_3d.png)
  What to look for: whether object dynamics remain stable and physically plausible.

- [`outputs/canonical_pass/plots/rollout_phys_p95.png`](outputs/canonical_pass/plots/rollout_phys_p95.png)
  What to look for: the publication-style summary of one-step and long-horizon physical error on the hard-mode PASS run.

## Behavioral Acceptance Outputs

- [`outputs/canonical_pass/source_behavioral_report.md`](outputs/canonical_pass/source_behavioral_report.md)
  What to look for: demo-facing gates such as motion, cross-sim agreement, correction visibility, correction rollout improvement, and acrobatics.

- [`outputs/canonical_pass/source_triptych_report.md`](outputs/canonical_pass/source_triptych_report.md)
  What to look for: provenance of the exact plan, episode, and model used for the triptych export.
