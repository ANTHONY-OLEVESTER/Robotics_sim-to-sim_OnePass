# PyPI Package Notes

This branch adds a curated Python companion package for the public Sim2Sim-OnePass repo.

## Package Name

- distribution: `sim2sim-onepass`
- import: `sim2sim_onepass`
- CLI: `sim2sim-onepass`
- package page: `https://pypi.org/project/sim2sim-onepass/`
- source repository: `https://github.com/ANTHONY-OLEVESTER/Robotics_sim-to-sim_OnePass`

## Design Decisions

- The package uses a modern `src/` layout.
- The CLI is the main public interface.
- Lightweight, package-worthy logic is implemented directly in `src/sim2sim_onepass/`.
- Simulator-heavy workflows are exposed as guarded wrappers instead of pretending the full simulator workspace ships in PyPI.
- The public docs and outputs remain repo-first; the package is an adapter layer, not a replacement repo layout.
- The package is intentionally a lightweight companion package, not a standalone robotics simulator framework.
- The repository remains the canonical home for media, reports, and public artifact browsing.

## Command Categories

### Standalone

- `info`
- `quickstart`
- `repo-map`
- `results-summary`
- `visual-index`
- `docs`
- `check-env`

These should work immediately after install.

### Dataset-dependent

- `quick-sanity`
- `rollout-check`

These require user-provided paired data, except that `quick-sanity --demo` uses the tiny built-in synthetic fixture.

### Full repo / simulator dependent

- `alignment-gate`
- `alignment-report`

These are intentionally guarded. They require the full curated repo layout plus simulator dependencies and workflow files.

## Included In Packaging

- package source under `src/sim2sim_onepass/`
- CLI entrypoint
- lightweight doc fallbacks in `src/sim2sim_onepass/resources/`
- tiny built-in quick-sanity demo support
- top-level markdown docs useful for source distributions

## Intentionally Excluded

- `data_pybullet/`
- `data_mujoco/`
- giant videos and report dumps under `outputs/`
- website assets and frontend code from `gh-pages`
- local env folders such as `.venv`, `.bridge`, `.bridge312`, `.pybullet`, `.mojoco`
- full simulator env trees and raw internal workspace structure
- heavyweight ML dependencies from the base install

## Curated In From The Larger Workspace

- quick sanity dataset inspection logic
- state projection logic used for rollout safety checks
- minimal rollout-check model loading and evaluation wrapper

These were brought in as packaging-friendly code instead of copying the full original script tree.

## Torch Extras

- Base install remains lightweight and does not require torch.
- `rollout-check` uses the optional `rollout` extra.
- If torch is missing, the user should install:
  `pip install sim2sim-onepass[rollout]`

## Local Validation Commands

```powershell
python -m pip install -e .
sim2sim-onepass --help
sim2sim-onepass info
sim2sim-onepass check-env
python -m pip install -U build twine
python -m build
python -m twine check dist/*
```

## Published Install

```powershell
python -m pip install sim2sim-onepass
python -m pip install "sim2sim-onepass[rollout]"
```

## Publish Checklist

1. Confirm the target branch is `pypi-package`.
2. Verify package metadata in `pyproject.toml`.
3. Verify no giant outputs are accidentally included in the source distribution.
4. Run local build validation.
5. Confirm Apache-2.0 is the intended published license.
6. Do not publish until command behavior and package scope are reviewed against the public repo contents.
