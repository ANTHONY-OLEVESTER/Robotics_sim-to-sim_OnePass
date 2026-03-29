from __future__ import annotations

import json
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
RELEASE = ROOT
CANONICAL = ROOT / "outputs" / "canonical_pass"

STRESS_DIR = ROOT / "reports" / "stress_20260203-173231"
BEHAVIORAL_DIR = ROOT / "reports" / "20260210-173200" / "behavioral_acceptance"
PAPER_FIG = ROOT / "paper" / "corl_camera_ready" / "figures" / "rollout_phys_p95.png"


def ensure_dir(path: Path) -> None:
    path.mkdir(parents=True, exist_ok=True)


def copy_file(src: Path, dst: Path) -> None:
    if not src.exists():
        raise FileNotFoundError(f"Missing required asset: {src}")
    ensure_dir(dst.parent)
    shutil.copy2(src, dst)


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, payload: dict) -> None:
    ensure_dir(path.parent)
    path.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")


def build_metrics_summary(stress: dict, behavioral_report: str) -> dict:
    report_lines = [line.strip() for line in behavioral_report.splitlines()]
    gates = {}
    metrics = {}
    current = None
    for line in report_lines:
        if line == "## Gates":
            current = "gates"
            continue
        if line == "## Metrics":
            current = "metrics"
            continue
        if not line or not line.startswith("- ") and ":" not in line:
            continue
        if current == "gates" and line.startswith("- "):
            name, status = line[2:].split(": ", 1)
            gates[name] = status
        elif current == "metrics" and ":" in line:
            key, value = line.split(": ", 1)
            metrics[key] = value

    return {
        "canonical_story": {
            "project": "Sim2Sim-OnePass",
            "quantitative_source": str(STRESS_DIR.relative_to(ROOT)).replace("\\", "/"),
            "visual_source": str(BEHAVIORAL_DIR.relative_to(ROOT)).replace("\\", "/"),
        },
        "quantitative_pass": {
            "final_verdict": stress["final_verdict"],
            "alignment_gate": stress["alignment_gate"]["pass"],
            "one_step_raw_phys": stress["one_step"]["raw"],
            "one_step_corrected_phys": stress["one_step"]["corrected"],
            "rollout_tf_accuracy_phys": {
                horizon: stress["rollout_tf_accuracy"][horizon]["phys_error"]
                for horizon in ("50", "200", "500")
            },
            "distribution_shift": stress["distribution_shift"],
            "contact_proxy_summary": stress["contact_proxy_summary"],
            "worst_slices": stress["worst_slices"],
            "thresholds": stress["thresholds"],
        },
        "behavioral_pass": {
            "report_path": str((BEHAVIORAL_DIR / "report.md").relative_to(ROOT)).replace("\\", "/"),
            "gates": gates,
            "selected_metrics": {
                "ee_end_dist_to_target": metrics.get("ee_end_dist_to_target"),
                "ee_end_dist_bullet_vs_mujoco": metrics.get("ee_end_dist_bullet_vs_mujoco"),
                "ee_raw_vs_ref_max": metrics.get("ee_raw_vs_ref_max"),
                "ee_corr_vs_ref_max": metrics.get("ee_corr_vs_ref_max"),
                "obj_raw_vs_ref_max": metrics.get("obj_raw_vs_ref_max"),
                "obj_corr_vs_ref_max": metrics.get("obj_corr_vs_ref_max"),
                "corr_panel_var_mean": metrics.get("corr_panel_var_mean"),
                "best_alpha": metrics.get("best_alpha"),
                "one_step_improvement": metrics.get("one_step_improvement"),
            },
        },
        "notes": [
            "The release intentionally uses separate canonical artifacts for quantitative hard-mode validation and visual behavioral validation.",
            "No new scientific result is created here; this package only reorganizes existing PASS evidence into a public-facing structure.",
        ],
    }


def build_release_report(metrics_summary: dict) -> str:
    raw = metrics_summary["quantitative_pass"]["one_step_raw_phys"]
    corr = metrics_summary["quantitative_pass"]["one_step_corrected_phys"]
    tf50 = metrics_summary["quantitative_pass"]["rollout_tf_accuracy_phys"]["50"]
    tf500 = metrics_summary["quantitative_pass"]["rollout_tf_accuracy_phys"]["500"]
    behavioral = metrics_summary["behavioral_pass"]
    gates = behavioral["gates"]
    metric = behavioral["selected_metrics"]
    lines = [
        "# Canonical PASS Report",
        "",
        "This curated release packages two existing PASS artifacts:",
        "",
        "- Quantitative hard-mode PASS: `reports/stress_20260203-173231`",
        "- Visual/behavioral PASS: `reports/20260210-173200/behavioral_acceptance`",
        "",
        "## Main claim",
        "",
        "Residual correction reduces cross-simulator one-step error and stays stable across long-horizon rollouts under the repo's alignment and holdout gates, while also supporting a visually inspectable behavioral PASS demo.",
        "",
        "## Quantitative anchor",
        "",
        f"- Final verdict: `{metrics_summary['quantitative_pass']['final_verdict']}`",
        f"- Raw one-step phys mean/p95/max: `{raw['mean']:.6f} / {raw['p95']:.6f} / {raw['max']:.6f}`",
        f"- Corrected one-step phys mean/p95/max: `{corr['mean']:.6f} / {corr['p95']:.6f} / {corr['max']:.6f}`",
        f"- TF-50 phys mean/p95/max: `{tf50['mean']:.6f} / {tf50['p95']:.6f} / {tf50['max']:.6f}`",
        f"- TF-500 phys mean/p95/max: `{tf500['mean']:.6f} / {tf500['p95']:.6f} / {tf500['max']:.6f}`",
        "",
        "## Visual/behavioral anchor",
        "",
        f"- Motion gate: `{gates.get('motion', 'UNKNOWN')}`",
        f"- Cross-sim agreement gate: `{gates.get('cross_sim_agreement', 'UNKNOWN')}`",
        f"- Correction visibility gate: `{gates.get('correction_visibility', 'UNKNOWN')}`",
        f"- Correction rollout improves gate: `{gates.get('correction_rollout_improves', 'UNKNOWN')}`",
        f"- Acrobatics gate: `{gates.get('acrobatics', 'N/A')}`",
        f"- End-effector distance to target: `{metric.get('ee_end_dist_to_target')}`",
        f"- Bullet vs MuJoCo end distance: `{metric.get('ee_end_dist_bullet_vs_mujoco')}`",
        f"- Raw vs ref EE max deviation: `{metric.get('ee_raw_vs_ref_max')}`",
        f"- Corrected vs ref EE max deviation: `{metric.get('ee_corr_vs_ref_max')}`",
        f"- Selected correction alpha: `{metric.get('best_alpha')}`",
        "",
        "## Provenance",
        "",
        "- `source_stress_report.md` and `source_stress_metrics.json` are copied verbatim from the original hard-mode PASS run.",
        "- `source_behavioral_report.md` and the copied previews/videos come from the original behavioral PASS run.",
    ]
    return "\n".join(lines) + "\n"


def main() -> None:
    ensure_dir(CANONICAL / "plots")
    ensure_dir(CANONICAL / "preview")
    ensure_dir(CANONICAL / "videos")

    stress_metrics = load_json(STRESS_DIR / "metrics.json")
    behavioral_report = (BEHAVIORAL_DIR / "report.md").read_text(encoding="utf-8")

    copy_file(STRESS_DIR / "report.md", CANONICAL / "source_stress_report.md")
    copy_file(STRESS_DIR / "metrics.json", CANONICAL / "source_stress_metrics.json")
    copy_file(BEHAVIORAL_DIR / "report.md", CANONICAL / "source_behavioral_report.md")
    copy_file(BEHAVIORAL_DIR / "triptych" / "report.md", CANONICAL / "source_triptych_report.md")

    plot_map = {
        BEHAVIORAL_DIR / "plots" / "ee_traj_xy.png": CANONICAL / "plots" / "ee_traj_xy.png",
        BEHAVIORAL_DIR / "plots" / "ee_traj_3d.png": CANONICAL / "plots" / "ee_traj_3d.png",
        BEHAVIORAL_DIR / "plots" / "obj_traj_xy.png": CANONICAL / "plots" / "obj_traj_xy.png",
        BEHAVIORAL_DIR / "plots" / "obj_traj_3d.png": CANONICAL / "plots" / "obj_traj_3d.png",
        BEHAVIORAL_DIR / "plots" / "traj_summary.json": CANONICAL / "plots" / "traj_summary.json",
        PAPER_FIG: CANONICAL / "plots" / "rollout_phys_p95.png",
    }
    for src, dst in plot_map.items():
        copy_file(src, dst)

    preview_map = {
        BEHAVIORAL_DIR / "triptych" / "triptych_frame0.png": CANONICAL / "preview" / "triptych_frame0.png",
        BEHAVIORAL_DIR / "bullet_raw" / "frames" / "frame_00000.png": CANONICAL / "preview" / "bullet_raw_frame0.png",
        BEHAVIORAL_DIR / "mujoco_ref" / "frames" / "frame_00000.png": CANONICAL / "preview" / "mujoco_ref_frame0.png",
    }
    for src, dst in preview_map.items():
        copy_file(src, dst)

    video_map = {
        BEHAVIORAL_DIR / "bullet_raw" / "video.mp4": CANONICAL / "videos" / "bullet_raw.mp4",
        BEHAVIORAL_DIR / "mujoco_ref" / "video.mp4": CANONICAL / "videos" / "mujoco_ref.mp4",
        BEHAVIORAL_DIR / "triptych" / "compare_triptych.mp4": CANONICAL / "videos" / "compare_triptych.mp4",
    }
    for src, dst in video_map.items():
        copy_file(src, dst)

    metrics_summary = build_metrics_summary(stress_metrics, behavioral_report)
    write_json(CANONICAL / "metrics_summary.json", metrics_summary)
    (CANONICAL / "report.md").write_text(build_release_report(metrics_summary), encoding="utf-8")

    canonical_sources = {
        "quantitative_pass": {
            "report_dir": str(STRESS_DIR.relative_to(ROOT)).replace("\\", "/"),
            "report_md": str((STRESS_DIR / "report.md").relative_to(ROOT)).replace("\\", "/"),
            "metrics_json": str((STRESS_DIR / "metrics.json").relative_to(ROOT)).replace("\\", "/"),
        },
        "behavioral_pass": {
            "report_dir": str(BEHAVIORAL_DIR.relative_to(ROOT)).replace("\\", "/"),
            "report_md": str((BEHAVIORAL_DIR / "report.md").relative_to(ROOT)).replace("\\", "/"),
            "triptych_report_md": str((BEHAVIORAL_DIR / "triptych" / "report.md").relative_to(ROOT)).replace("\\", "/"),
        },
        "paper_asset": str(PAPER_FIG.relative_to(ROOT)).replace("\\", "/"),
    }
    write_json(ROOT / "configs" / "canonical_sources.json", canonical_sources)


if __name__ == "__main__":
    main()
