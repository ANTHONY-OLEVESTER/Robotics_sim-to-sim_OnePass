from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from sim2sim_onepass.wrappers.state_project import project_state


def _require_torch():
    try:
        import torch
        import torch.nn as nn
    except ImportError as exc:
        raise RuntimeError("rollout-check requires PyTorch. Install with `pip install sim2sim-onepass[rollout]`.") from exc
    return torch, nn


def load_npz(path: Path) -> dict[str, np.ndarray]:
    data = np.load(path)
    return {k: data[k] for k in data.files}


class DeltaMLP:
    def __init__(self, nn, in_dim: int, out_dim: int) -> None:
        self.net = nn.Sequential(
            nn.Linear(in_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 256),
            nn.ReLU(),
            nn.Linear(256, out_dim),
        )

    def __call__(self, x):
        return self.net(x)


def build_model(nn, in_dim: int, out_dim: int):
    class DeltaMoE(nn.Module):
        def __init__(self) -> None:
            super().__init__()
            self.free = DeltaMLP(nn, in_dim, out_dim).net
            self.contact = DeltaMLP(nn, in_dim, out_dim).net
            self.gate = nn.Sequential(
                nn.Linear(in_dim, 128),
                nn.ReLU(),
                nn.Linear(128, 1),
                nn.Sigmoid(),
            )

        def forward(self, x):
            gate = self.gate(x)
            free_pred = self.free(x)
            contact_pred = self.contact(x)
            return contact_pred * gate + free_pred * (1.0 - gate)

    return DeltaMoE()


def decide_units(pred: np.ndarray, delta_std: np.ndarray) -> str:
    pred_std = pred.std(axis=0).mean()
    delta_std_mean = delta_std.mean()
    if delta_std_mean == 0:
        return "ambiguous"
    ratio = pred_std / delta_std_mean
    if 0.3 <= ratio <= 3.0:
        return "original"
    if 0.03 <= ratio < 0.3:
        return "normalized"
    return "ambiguous"


def run_rollout_check(
    bullet: Path,
    mujoco: Path,
    model_path: Path,
    norm_path: Path,
    horizon: int = 50,
    nstart: int = 50,
) -> dict[str, float | str]:
    torch, nn = _require_torch()
    b = load_npz(bullet)
    m = load_npz(mujoco)
    for key in ("S", "A", "S_next", "episode_id", "t"):
        if key not in b or key not in m:
            raise RuntimeError(f"missing key {key}")

    Sb = b["S"].astype(np.float32)
    Ab = b["A"].astype(np.float32)
    Snb = b["S_next"].astype(np.float32)
    Snm = m["S_next"].astype(np.float32)
    ep = b["episode_id"].astype(int)
    t = b["t"].astype(int)

    in_dim = Sb.shape[1] + Ab.shape[1]
    out_dim = Snb.shape[1]
    model = build_model(nn, in_dim, out_dim)
    model.load_state_dict(torch.load(model_path, map_location="cpu"))
    model.eval()

    norm = json.loads(norm_path.read_text(encoding="utf-8"))
    delta_mean = np.array(norm.get("delta_mean"), dtype=np.float32)
    delta_std = np.array(norm.get("delta_std"), dtype=np.float32)

    unique_eps = np.unique(ep)
    rng = np.random.default_rng(0)
    starts: list[int] = []
    for e in unique_eps:
        idx = np.where(ep == e)[0]
        if idx.size < horizon + 1:
            continue
        order = np.argsort(t[idx])
        idx = idx[order]
        max_start = idx.size - horizon
        if max_start <= 0:
            continue
        for _ in range(2):
            starts.append(int(idx[rng.integers(0, max_start)]))
    if not starts:
        raise RuntimeError("no valid rollout starts")
    rng.shuffle(starts)
    starts = starts[:nstart]

    sample_idx = np.array(starts[: min(len(starts), 10)])
    X_sample = np.concatenate([Sb[sample_idx], Ab[sample_idx]], axis=1)
    with torch.no_grad():
        pred_sample = model(torch.from_numpy(X_sample).float()).numpy()
    units = decide_units(pred_sample, delta_std)
    if units == "ambiguous":
        raise RuntimeError("cannot confidently determine model output units")

    def pred_delta(x: np.ndarray) -> np.ndarray:
        with torch.no_grad():
            pred = model(torch.from_numpy(x).float()).numpy()
        if units == "normalized":
            return pred * delta_std + delta_mean
        return pred

    errs: list[float] = []
    for s in starts:
        e = ep[s]
        idx = np.where(ep == e)[0]
        order = np.argsort(t[idx])
        idx = idx[order]
        pos = int(np.where(idx == s)[0][0])
        if pos + horizon > idx.size:
            continue
        for k in range(horizon):
            i = idx[pos + k]
            x = np.concatenate([Sb[i], Ab[i]], axis=0)[None, :]
            delta = pred_delta(x)[0]
            pred_state = project_state(Snb[i] + delta)
            if not np.isfinite(pred_state).all():
                raise RuntimeError(f"NaN/Inf at start={s} step={k}")
            errs.append(float(np.linalg.norm(pred_state - Snm[i])))

    if not errs:
        raise RuntimeError("no rollout errors computed")
    arr = np.asarray(errs, dtype=np.float32)
    return {
        "horizon": int(horizon),
        "nstart": int(nstart),
        "units": units,
        "mean": float(arr.mean()),
        "p95": float(np.quantile(arr, 0.95)),
        "max": float(arr.max()),
    }
