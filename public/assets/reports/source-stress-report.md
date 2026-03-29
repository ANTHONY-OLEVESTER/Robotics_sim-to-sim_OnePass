# Extreme Stress Suite Report

- bullet: data_pybullet\paired_bullet_hardgen_seeds0-5.npz
- mujoco: data_mujoco\paired_mujoco_hardgen_seeds0-5.npz
- model: reports\delta_train_hardgen_fix_20260203-135301\model.pt
- norm: reports\delta_train_hardgen_fix_20260203-135301\normalization.json
- outdir: E:\Gigs\Robotics\reports\stress_20260203-173231

## Summary
- alignment_gate: True
- S0_step1_consistency: True (max_abs_diff=0)
- RAW one-step PHYS mean/p95/max: 0.0941458 / 0.119573 / 0.462656
- CORR one-step PHYS mean/p95/max: 0.0106068 / 0.0207353 / 0.100617
- HARD coverage: True
- HARD slices ratio>=2: True
- D1 seed holdout: {'available': True, 'pass': True, 'n': 176160, 'pred_mean': 0.010602706883744446, 'pred_p95': 0.020696488674730062}
- D2 family holdout: {'available': True, 'pass': True, 'families': [{'family': 'edge_push', 'n': 114480, 'pred_mean': 0.011006471535448746, 'pred_p95': 0.019795956276357173, 'pass': True}, {'family': 'free_space_sweep', 'n': 119760, 'pred_mean': 0.011986865168533013, 'pred_p95': 0.021062707994133185, 'pass': True}, {'family': 'high_impulse_tap', 'n': 118560, 'pred_mean': 0.011099319950459942, 'pred_p95': 0.021361867804080215, 'pass': True}, {'family': 'micro_motion', 'n': 114960, 'pred_mean': 0.010673656460239954, 'pred_p95': 0.020580197311937776, 'pass': True}, {'family': 'near_contact_skims', 'n': 169200, 'pred_mean': 0.009730936019761481, 'pred_p95': 0.02142075439915059, 'pass': True}, {'family': 'reset_jitter', 'n': 113760, 'pred_mean': 0.010842011212561018, 'pred_p95': 0.02024237103760242, 'pass': True}, {'family': 'rolling_contact', 'n': 119520, 'pred_mean': 0.011334683203133814, 'pred_p95': 0.021124816965311745, 'pass': True}, {'family': 'spin_induce', 'n': 113280, 'pred_mean': 0.010890652316702677, 'pred_p95': 0.020212644431740038, 'pass': True}, {'family': 'stop_go', 'n': 110880, 'pred_mean': 0.008128466304448906, 'pred_p95': 0.020146045088767935, 'pass': True}]}
- ROLLOUT_TF_H50 PHYS: mean=0.0100275, p95=0.0173273, max=0.0844177, nan_inf=0, diverge=0
- ROLLOUT_FREE_H50: nan_inf=0, diverge=0, blowup_p50=None, blowup_p95=None
- ROLLOUT_TF_H200 PHYS: mean=0.00990258, p95=0.017425, max=0.0821281, nan_inf=0, diverge=0
- ROLLOUT_FREE_H200: nan_inf=0, diverge=0, blowup_p50=None, blowup_p95=None
- ROLLOUT_TF_H500 PHYS: mean=0.0109594, p95=0.0221751, max=0.0872368, nan_inf=0, diverge=0
- ROLLOUT_FREE_H500: nan_inf=0, diverge=0, blowup_p50=None, blowup_p95=None
- CONTACT_PROXY p95 summary: flag_acc=0.991075, contact_force=0.123553, min_dist=0.0046446

## Worst Slices
- t_0_20 -> raw_p95=0.205277, corr_p95=0.0357723, improve_ratio=7.06406
- A_q00_25 -> raw_p95=0.194932, corr_p95=0.0288693, improve_ratio=9.65762
- far_contact -> raw_p95=0.150092, corr_p95=0.0236172, improve_ratio=7.27617
- t_80_100 -> raw_p95=0.115607, corr_p95=0.0216505, improve_ratio=10.3761
- contact0 -> raw_p95=0.138037, corr_p95=0.0216094, improve_ratio=8.31203

## FINAL_VERDICT: PASS