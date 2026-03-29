from __future__ import annotations

import importlib.util
import sys
from pathlib import Path

from sim2sim_onepass.paths import get_repo_paths


def python_info() -> dict[str, str]:
    return {
        "python": sys.executable,
        "version": sys.version.split()[0],
    }


def module_available(name: str) -> bool:
    return importlib.util.find_spec(name) is not None


def simulator_layout_available() -> bool:
    paths = get_repo_paths()
    required = [
        paths.root / "pybullet_panda_gap",
        paths.root / "mujoco_panda_gap",
        paths.root / "plans",
    ]
    return all(path.exists() for path in required)


def report_environment() -> dict[str, object]:
    paths = get_repo_paths()
    return {
        "python": python_info(),
        "repo_root": str(paths.root),
        "repo_docs_present": all(
            p.exists()
            for p in [
                paths.readme,
                paths.quickstart,
                paths.repo_map,
                paths.results_summary,
                paths.visual_index,
            ]
        ),
        "numpy": module_available("numpy"),
        "torch": module_available("torch"),
        "yaml": module_available("yaml"),
        "simulator_layout": simulator_layout_available(),
        "canonical_outputs": paths.canonical_pass.exists(),
    }
