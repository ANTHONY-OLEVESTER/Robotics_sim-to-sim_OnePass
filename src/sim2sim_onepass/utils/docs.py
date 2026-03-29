from __future__ import annotations

from importlib import resources
from pathlib import Path

from sim2sim_onepass.paths import get_repo_paths


def load_doc(name: str) -> str:
    paths = get_repo_paths()
    repo_candidate = paths.root / name
    if repo_candidate.exists():
        return repo_candidate.read_text(encoding="utf-8")
    return resources.files("sim2sim_onepass.resources").joinpath(name).read_text(encoding="utf-8")


def first_lines(text: str, limit: int = 40) -> str:
    lines = text.strip().splitlines()
    return "\n".join(lines[:limit]).strip() + ("\n..." if len(lines) > limit else "")


def repo_file_summary() -> list[tuple[str, Path]]:
    paths = get_repo_paths()
    return [
        ("README", paths.readme),
        ("QUICKSTART", paths.quickstart),
        ("REPO_MAP", paths.repo_map),
        ("RESULTS_SUMMARY", paths.results_summary),
        ("VISUAL_INDEX", paths.visual_index),
        ("PYPI_PACKAGE_NOTES", paths.package_notes),
    ]
