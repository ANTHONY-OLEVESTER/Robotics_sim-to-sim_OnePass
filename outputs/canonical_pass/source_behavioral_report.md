# Behavioral Acceptance Report
plan: E:\Gigs\Robotics\plans\panda_move_ab_seed0.jsonl
episode_id: 0
steps: 300
steps_settle: 30
start_xyz: 0.45,0,0.3
target_xyz: 0.55,0.2,0.25

## Gates
- determinism: PASS
- state_set_get_identity: PASS
- stability_after_settle: PASS
- stability_corr_after_settle: PASS
- motion: PASS
- cross_sim_agreement: PASS
- one_step_improvement: PASS
- correction_visibility: PASS
- correction_rollout_improves: PASS
- acrobatics: PASS
- artifacts: PASS

## Metrics
determinism_hash_1: e47fe8f49c68c66f0cfbd33a2c08186e29cccfb22f07cb5d6c04f48d8d5035c2
determinism_hash_2: e47fe8f49c68c66f0cfbd33a2c08186e29cccfb22f07cb5d6c04f48d8d5035c2
max_jump_after_settle: 0.0033917531836777925
max_abs_dq_after_settle: 1.9500751495361328
corr_max_jump_after_settle: 0.0033817128278315067
corr_max_abs_dq_after_settle: 0.0
ee_end_dist_to_target: 8.394202450290322e-05
ee_path_length: 0.6068644523620605
ee_end_dist_bullet_vs_mujoco: 0.032857298826639444
ee_raw_vs_ref_max: 0.07311303024415934
obj_raw_vs_ref_max: 1.4122866633732143e-05
ee_corr_vs_ref_max: 0.07298209576691682
obj_corr_vs_ref_max: 1.407978209026374e-05
corr_panel_var_mean: 2742.2089606879517
best_alpha: 0.005
one_step_improvement: {'raw_median': 0.03137571923434734, 'corr_median': 0.031279380433261395, 'raw_mean': 0.03284164751296345, 'corr_mean': 0.032755627771002764, 'improve_frac': 0.9100000262260437, 'alpha': 0.005, 'mask': 'q,dq,ee_pos,ee_quat', 'delta_clip': 'q=0.1,dq=0.2,ee_pos=0.02,ee_quat=0.1,obj_pos=0.02,obj_quat=0.1,obj_vel=0.2,proxies=5', 'ok': True}
alpha_sweep: {'sweep': {'0.005': {'ee_dev_max': 0.5444258564817752, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 253}, '0.01': {'ee_dev_max': 0.554444973434928, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 249}, '0.05': {'ee_dev_max': 0.6614560451246234, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 216}, '0.1': {'ee_dev_max': 0.8836621827103857, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 174}, '0.2': {'ee_dev_max': 1.1788130613575574, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 119}, '0.5': {'ee_dev_max': 1.2997069493952216, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 60}, '1.0': {'ee_dev_max': 1.290278711812236, 'obj_dev_max': 1.532027779952696e-05, 'diverge_step': 29}}, 'raw': {'ee_dev_max': 0.07311303024415934, 'obj_dev_max': 1.4122866633732143e-05}}