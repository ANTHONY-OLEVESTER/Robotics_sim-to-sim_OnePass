from __future__ import annotations

import numpy as np

STATE_DIM = 37
Q_SLICE = slice(0, 7)
DQ_SLICE = slice(7, 14)
EE_POS_SLICE = slice(14, 17)
EE_QUAT_SLICE = slice(17, 21)
OBJ_POS_SLICE = slice(21, 24)
OBJ_QUAT_SLICE = slice(24, 28)
OBJ_LINVEL_SLICE = slice(28, 31)
OBJ_ANGVEL_SLICE = slice(31, 34)
CONTACT_FLAG_IDX = 34
CONTACT_FORCE_IDX = 35
MIN_DIST_IDX = 36
VEL_LIMIT = 5.0


def _wrap_angles(x: np.ndarray) -> np.ndarray:
    return (x + np.pi) % (2.0 * np.pi) - np.pi


def _renorm_quat(q: np.ndarray) -> np.ndarray:
    norm = np.linalg.norm(q, axis=-1, keepdims=True)
    safe = norm[..., 0] >= 1e-6
    qn = np.zeros_like(q, dtype=np.float32)
    qn[safe] = q[safe] / norm[safe]
    qn[~safe] = np.array([0.0, 0.0, 0.0, 1.0], dtype=np.float32)
    return qn


def project_state(state: np.ndarray) -> np.ndarray:
    state = np.asarray(state, dtype=np.float32)
    if state.shape[-1] != STATE_DIM:
        raise ValueError(f"Expected last dim {STATE_DIM}, got {state.shape}")
    squeeze = state.ndim == 1
    if squeeze:
        state = state[None, :]
    out = state.copy()
    out[:, Q_SLICE] = _wrap_angles(out[:, Q_SLICE])
    out[:, EE_QUAT_SLICE] = _renorm_quat(out[:, EE_QUAT_SLICE])
    out[:, OBJ_QUAT_SLICE] = _renorm_quat(out[:, OBJ_QUAT_SLICE])
    out[:, EE_POS_SLICE] = np.clip(out[:, EE_POS_SLICE], -2.0, 2.0)
    out[:, OBJ_POS_SLICE] = np.clip(out[:, OBJ_POS_SLICE], -2.0, 2.0)
    out[:, DQ_SLICE] = np.clip(out[:, DQ_SLICE], -VEL_LIMIT, VEL_LIMIT)
    out[:, OBJ_LINVEL_SLICE] = np.clip(out[:, OBJ_LINVEL_SLICE], -VEL_LIMIT, VEL_LIMIT)
    out[:, OBJ_ANGVEL_SLICE] = np.clip(out[:, OBJ_ANGVEL_SLICE], -VEL_LIMIT, VEL_LIMIT)
    out[:, CONTACT_FLAG_IDX] = np.clip(out[:, CONTACT_FLAG_IDX], 0.0, 1.0)
    out[:, CONTACT_FORCE_IDX] = np.clip(out[:, CONTACT_FORCE_IDX], 0.0, 50.0)
    out[:, MIN_DIST_IDX] = np.clip(out[:, MIN_DIST_IDX], 0.0, 2.0)
    return out[0] if squeeze else out
