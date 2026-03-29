$ErrorActionPreference = "Stop"

# Rebuild the curated bundle from the selected source reports.
python onepass_release\scripts\package_release_assets.py

# Alignment gate.
.\.bridge312\Scripts\python scripts\alignment_gate.py

# Visual / behavioral PASS path using the existing move_ab model.
.\.bridge312\Scripts\python scripts\behavioral_acceptance_suite.py --model reports\delta_train_move_ab\model.pt --norm reports\delta_train_move_ab\normalization.json

# Quantitative hard-mode verification path.
.\.bridge312\Scripts\python scripts\stress_suite.py --bullet data_pybullet\paired_bullet_hardgen_seeds0-5.npz --mujoco data_mujoco\paired_mujoco_hardgen_seeds0-5.npz --model reports\delta_train_hardgen_fix_20260203-135301\model.pt --norm reports\delta_train_hardgen_fix_20260203-135301\normalization.json --horizons 50,200,500 --nstart 200 --seed 0 --hard_mode 1
