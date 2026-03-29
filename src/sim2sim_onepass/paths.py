from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


def find_repo_root(start: Path | None = None) -> Path:
    here = (start or Path(__file__)).resolve()
    for candidate in [here, *here.parents]:
        if (candidate / "README.md").exists() and (candidate / "RESULTS_SUMMARY.md").exists():
            return candidate
    return here.parents[2]


@dataclass(frozen=True)
class RepoPaths:
    root: Path
    readme: Path
    quickstart: Path
    repo_map: Path
    results_summary: Path
    visual_index: Path
    package_notes: Path
    outputs: Path
    canonical_pass: Path
    scripts: Path
    configs: Path


def get_repo_paths(start: Path | None = None) -> RepoPaths:
    root = find_repo_root(start)
    return RepoPaths(
        root=root,
        readme=root / "README.md",
        quickstart=root / "QUICKSTART.md",
        repo_map=root / "REPO_MAP.md",
        results_summary=root / "RESULTS_SUMMARY.md",
        visual_index=root / "VISUAL_INDEX.md",
        package_notes=root / "PYPI_PACKAGE_NOTES.md",
        outputs=root / "outputs",
        canonical_pass=root / "outputs" / "canonical_pass",
        scripts=root / "scripts",
        configs=root / "configs",
    )
