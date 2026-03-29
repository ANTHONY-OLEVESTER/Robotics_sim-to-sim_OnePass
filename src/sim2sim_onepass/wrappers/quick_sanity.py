from __future__ import annotations

from pathlib import Path
from typing import Tuple

import numpy as np


def demo_fixture() -> tuple[dict[str, np.ndarray], dict[str, np.ndarray]]:
    S = np.array(
        [
            np.linspace(0.0, 0.36, 37, dtype=np.float32),
            np.linspace(0.1, 0.46, 37, dtype=np.float32),
            np.linspace(0.2, 0.56, 37, dtype=np.float32),
        ],
        dtype=np.float32,
    )
    A = np.array(
        [
            np.linspace(0.0, 0.06, 7, dtype=np.float32),
            np.linspace(0.02, 0.08, 7, dtype=np.float32),
            np.linspace(0.04, 0.10, 7, dtype=np.float32),
        ],
        dtype=np.float32,
    )
    bullet = {"S": S, "A": A, "S_next": S + 0.01}
    mujoco = {"S": S + 0.001, "A": A, "S_next": S + 0.0125}
    return bullet, mujoco


def resolve_default_paths(root: Path) -> Tuple[Path, Path]:
    candidates = [
        (root / "data" / "paired_bullet_seed0.npz", root / "data" / "paired_mujoco_seed0.npz"),
        (root / "data_pybullet" / "paired_bullet_seed0.npz", root / "data_mujoco" / "paired_mujoco_seed0.npz"),
        (
            root / "outputs" / "canonical_pass" / "source_stress_metrics.json",
            root / "outputs" / "canonical_pass" / "source_stress_metrics.json",
        ),
    ]
    for b, m in candidates[:2]:
        if b.exists() and m.exists():
            return b, m
    return candidates[1]


def load_npz(path: Path) -> tuple[np.lib.npyio.NpzFile, list[str]]:
    data = np.load(path)
    return data, list(data.keys())


def describe_array(x: np.ndarray) -> dict[str, object]:
    x = np.asarray(x)
    finite = x[np.isfinite(x)]
    return {
        "shape": tuple(x.shape),
        "dtype": str(x.dtype),
        "nan": int(np.isnan(x).sum()),
        "inf": int(np.isinf(x).sum()),
        "min": float(finite.min()) if finite.size else None,
        "max": float(finite.max()) if finite.size else None,
        "mean": float(finite.mean()) if finite.size else None,
        "std": float(finite.std()) if finite.size else None,
    }


def run_quick_sanity(bullet_path: Path, mujoco_path: Path) -> dict[str, object]:
    if not bullet_path.exists():
        raise FileNotFoundError(f"Bullet NPZ not found: {bullet_path}")
    if not mujoco_path.exists():
        raise FileNotFoundError(f"MuJoCo NPZ not found: {mujoco_path}")

    b, bk = load_npz(bullet_path)
    m, mk = load_npz(mujoco_path)

    found = None
    for s_key, a_key, sn_key in [("S", "A", "S_next"), ("obs", "act", "obs_next"), ("states", "actions", "next_states")]:
        if s_key in b and a_key in b and sn_key in b and s_key in m and a_key in m and sn_key in m:
            found = (s_key, a_key, sn_key)
            break
    if not found:
        raise RuntimeError(f"Could not find canonical paired keys. Bullet keys={bk}; MuJoCo keys={mk}")

    s_key, a_key, sn_key = found
    Sb, Ab, Snb = b[s_key], b[a_key], b[sn_key]
    Sm, Am, Snm = m[s_key], m[a_key], m[sn_key]

    if Sb.shape != Sm.shape:
        raise RuntimeError(f"State shape mismatch: {Sb.shape} vs {Sm.shape}")
    if Ab.shape != Am.shape:
        raise RuntimeError(f"Action shape mismatch: {Ab.shape} vs {Am.shape}")
    if Snb.shape != Snm.shape:
        raise RuntimeError(f"Next-state shape mismatch: {Snb.shape} vs {Snm.shape}")

    drift_mean = np.abs(Sb.mean(axis=0) - Sm.mean(axis=0))
    drift_std = np.abs(Sb.std(axis=0) - Sm.std(axis=0))
    drift_score = drift_mean + drift_std
    top = np.argsort(-drift_score)[:10]
    err = np.linalg.norm(Snb - Snm, axis=1)

    return {
        "mode": "dataset",
        "keys": {"bullet": bk, "mujoco": mk, "selected": [s_key, a_key, sn_key]},
        "bullet": {
            s_key: describe_array(Sb),
            a_key: describe_array(Ab),
            sn_key: describe_array(Snb),
        },
        "mujoco": {
            s_key: describe_array(Sm),
            a_key: describe_array(Am),
            sn_key: describe_array(Snm),
        },
        "one_step": {
            "mean": float(err.mean()),
            "median": float(np.median(err)),
            "p95": float(np.quantile(err, 0.95)),
            "max": float(err.max()),
        },
        "top_drift_dims": [
            {
                "dim": int(i),
                "score": float(drift_score[i]),
                "mean_gap": float(drift_mean[i]),
                "std_gap": float(drift_std[i]),
            }
            for i in top
        ],
    }


def run_quick_sanity_demo() -> dict[str, object]:
    b, m = demo_fixture()
    Sb, Ab, Snb = b["S"], b["A"], b["S_next"]
    Sm, Am, Snm = m["S"], m["A"], m["S_next"]
    drift_mean = np.abs(Sb.mean(axis=0) - Sm.mean(axis=0))
    drift_std = np.abs(Sb.std(axis=0) - Sm.std(axis=0))
    drift_score = drift_mean + drift_std
    top = np.argsort(-drift_score)[:10]
    err = np.linalg.norm(Snb - Snm, axis=1)

    return {
        "mode": "demo",
        "keys": {"bullet": ["S", "A", "S_next"], "mujoco": ["S", "A", "S_next"], "selected": ["S", "A", "S_next"]},
        "bullet": {"S": describe_array(Sb), "A": describe_array(Ab), "S_next": describe_array(Snb)},
        "mujoco": {"S": describe_array(Sm), "A": describe_array(Am), "S_next": describe_array(Snm)},
        "one_step": {
            "mean": float(err.mean()),
            "median": float(np.median(err)),
            "p95": float(np.quantile(err, 0.95)),
            "max": float(err.max()),
        },
        "top_drift_dims": [
            {
                "dim": int(i),
                "score": float(drift_score[i]),
                "mean_gap": float(drift_mean[i]),
                "std_gap": float(drift_std[i]),
            }
            for i in top
        ],
        "note": "Built-in tiny synthetic paired fixture for package-only smoke testing.",
    }
