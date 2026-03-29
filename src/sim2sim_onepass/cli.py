from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from sim2sim_onepass.paths import get_repo_paths
from sim2sim_onepass.utils.docs import first_lines, load_doc, repo_file_summary
from sim2sim_onepass.version import __version__
from sim2sim_onepass.wrappers.availability import report_environment, simulator_layout_available
from sim2sim_onepass.wrappers.quick_sanity import resolve_default_paths, run_quick_sanity, run_quick_sanity_demo
from sim2sim_onepass.wrappers.rollout import run_rollout_check


def print_json(payload: object) -> int:
    print(json.dumps(payload, indent=2))
    return 0


def cmd_info(_: argparse.Namespace) -> int:
    paths = get_repo_paths()
    payload = {
        "project": "Sim2Sim-OnePass",
        "version": __version__,
        "package_identity": "lightweight companion package",
        "repo_root": str(paths.root),
        "canonical_outputs": str(paths.canonical_pass),
        "pypi": "https://pypi.org/project/sim2sim-onepass/",
        "docs": {label: str(path) for label, path in repo_file_summary()},
        "website_branch": "gh-pages",
        "package_scope": [
            "repo navigation",
            "embedded docs access",
            "environment checks",
            "quick sanity checks on paired datasets",
            "thin rollout-check wrapper",
            "guarded simulator workflow wrappers",
        ],
    }
    return print_json(payload)


def cmd_doc(name: str) -> int:
    print(first_lines(load_doc(name), limit=80))
    return 0


def cmd_docs(_: argparse.Namespace) -> int:
    for label, path in repo_file_summary():
        print(f"{label}: {path}")
    return 0


def cmd_check_env(_: argparse.Namespace) -> int:
    return print_json(report_environment())


def cmd_quick_sanity(args: argparse.Namespace) -> int:
    paths = get_repo_paths()
    if args.demo:
        return print_json(run_quick_sanity_demo())
    default_b, default_m = resolve_default_paths(paths.root)
    if args.bullet and args.mujoco:
        bullet = Path(args.bullet)
        mujoco = Path(args.mujoco)
    elif default_b.exists() and default_m.exists():
        bullet = default_b
        mujoco = default_m
    else:
        raise RuntimeError(
            "This command requires paired dataset inputs and does not run from package-only install by default.\n"
            "Provide --bullet and --mujoco, or run `sim2sim-onepass quick-sanity --demo`."
        )
    return print_json(run_quick_sanity(bullet, mujoco))


def cmd_alignment_gate(_: argparse.Namespace) -> int:
    if not simulator_layout_available():
        print(
            "This command requires the full curated Sim2Sim-OnePass repository layout.\n"
            "It also requires simulator dependencies and public-repo workflow files.\n"
            "This command is not available in lightweight package-only mode.",
            file=sys.stderr,
        )
        return 2
    print(
        "This command requires the full curated Sim2Sim-OnePass repository layout and simulator dependencies.\n"
        "Use the source workspace command preserved in QUICKSTART.md.",
        file=sys.stderr,
    )
    return 2


def cmd_alignment_report(_: argparse.Namespace) -> int:
    print(
        "This command requires the full curated Sim2Sim-OnePass repository layout.\n"
        "It depends on simulator collection scripts, paired dataset generation, and workflow files.\n"
        "This command is not available in lightweight package-only mode.",
        file=sys.stderr,
    )
    return 2


def cmd_rollout_check(args: argparse.Namespace) -> int:
    result = run_rollout_check(
        bullet=Path(args.bullet),
        mujoco=Path(args.mujoco),
        model_path=Path(args.model),
        norm_path=Path(args.norm),
        horizon=args.horizon,
        nstart=args.nstart,
    )
    return print_json(result)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="sim2sim-onepass",
        description=(
            "A lightweight companion package for the Sim2Sim-OnePass public research release.\n"
            "It provides CLI access to documentation, results navigation, environment checks, and selected curated utilities."
        ),
        formatter_class=argparse.RawTextHelpFormatter,
        epilog=(
            "Command categories:\n"
            "  Standalone: info, quickstart, repo-map, results-summary, visual-index, docs, check-env\n"
            "  Dataset-dependent: quick-sanity, rollout-check\n"
            "  Full repo / simulator dependent: alignment-gate, alignment-report"
        ),
    )
    sub = parser.add_subparsers(dest="command", required=True)

    sub.add_parser("info", help="[standalone] show package and repo overview")
    sub.add_parser("quickstart", help="[standalone] print quickstart guidance")
    sub.add_parser("repo-map", help="[standalone] print repo structure guidance")
    sub.add_parser("results-summary", help="[standalone] print canonical result summary")
    sub.add_parser("visual-index", help="[standalone] print visual evidence index")
    sub.add_parser("docs", help="[standalone] list key packaged docs")
    sub.add_parser("check-env", help="[standalone] report Python and optional dependency availability")
    sub.add_parser(
        "alignment-gate",
        help="[full repo] guarded simulator workflow wrapper; not standalone",
        description="Full repo / simulator dependent command.",
    )
    sub.add_parser(
        "alignment-report",
        help="[full repo] guarded report wrapper; not standalone",
        description="Full repo / simulator dependent command.",
    )

    quick = sub.add_parser(
        "quick-sanity",
        help="[dataset] inspect paired datasets or run tiny built-in demo",
        description="Dataset-dependent command. Use --demo for the tiny standalone fixture.",
    )
    quick.add_argument("--bullet", default="")
    quick.add_argument("--mujoco", default="")
    quick.add_argument("--demo", action="store_true", help="run the tiny built-in synthetic paired fixture")

    rollout = sub.add_parser(
        "rollout-check",
        help="[dataset+rollout extra] run rollout error check from paired data/model/norm",
        description="Dataset-dependent command. Requires paired data, model, norm file, and the optional rollout extra.",
    )
    rollout.add_argument("--bullet", required=True)
    rollout.add_argument("--mujoco", required=True)
    rollout.add_argument("--model", required=True)
    rollout.add_argument("--norm", required=True)
    rollout.add_argument("--horizon", type=int, default=50)
    rollout.add_argument("--nstart", type=int, default=50)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    mapping = {
        "info": cmd_info,
        "quickstart": lambda _: cmd_doc("QUICKSTART.md"),
        "repo-map": lambda _: cmd_doc("REPO_MAP.md"),
        "results-summary": lambda _: cmd_doc("RESULTS_SUMMARY.md"),
        "visual-index": lambda _: cmd_doc("VISUAL_INDEX.md"),
        "docs": cmd_docs,
        "check-env": cmd_check_env,
        "quick-sanity": cmd_quick_sanity,
        "alignment-gate": cmd_alignment_gate,
        "alignment-report": cmd_alignment_report,
        "rollout-check": cmd_rollout_check,
    }
    try:
        return mapping[args.command](args)
    except FileNotFoundError as exc:
        print(str(exc), file=sys.stderr)
        return 2
    except RuntimeError as exc:
        print(str(exc), file=sys.stderr)
        return 2


if __name__ == "__main__":
    raise SystemExit(main())
