export type VideoItem = {
  key: string;
  label: string;
  path?: string;
  note: string;
  caption: string;
  status?: "ready" | "placeholder";
};

export type MetricCardData = {
  label: string;
  value: string;
  hint: string;
  tone?: "cyan" | "mint" | "ember";
};

export const repoUrl =
  "https://github.com/ANTHONY-OLEVESTER/Robotics_sim-to-sim_OnePass";
export const pypiUrl = "https://pypi.org/project/sim2sim-onepass/";

export function assetPath(relativePath: string) {
  return `${import.meta.env.BASE_URL}assets/${relativePath}`;
}

export const heroMetrics: MetricCardData[] = [
  {
    label: "Raw one-step p95",
    value: "0.1196",
    hint: "Uncorrected Bullet-to-MuJoCo physical mismatch",
    tone: "ember"
  },
  {
    label: "Corrected one-step p95",
    value: "0.0207",
    hint: "Residual-corrected next-state mismatch",
    tone: "mint"
  },
  {
    label: "Rollout TF-500 p95",
    value: "0.0222",
    hint: "Long-horizon physical rollout agreement",
    tone: "cyan"
  },
  {
    label: "Contact flag accuracy",
    value: "0.9911",
    hint: "Diagnostic proxy quality on the canonical PASS run",
    tone: "cyan"
  }
];

export const videoItems: VideoItem[] = [
  {
    key: "triptych",
    label: "Triptych",
    path: assetPath("videos/triptych-comparison.mp4"),
    note: "Best first watch. Raw Bullet, MuJoCo reference, and corrected Bullet are synchronized in one frame.",
    caption: "Triptych comparison from the canonical behavioral PASS run."
  },
  {
    key: "bullet",
    label: "Bullet Raw",
    path: assetPath("videos/bullet-raw.mp4"),
    note: "Deterministic raw Bullet replay before correction.",
    caption: "Uncorrected Bullet rollout."
  },
  {
    key: "mujoco",
    label: "MuJoCo Ref",
    path: assetPath("videos/mujoco-reference.mp4"),
    note: "Reference MuJoCo rollout for the same scripted trajectory.",
    caption: "MuJoCo reference rollout."
  },
  {
    key: "corrected",
    label: "Bullet Corrected",
    note: "The current artifact does not export a standalone corrected-only MP4. The corrected behavior is visible as the right panel in the triptych video. Reserved path: /public/assets/videos/bullet-corrected.mp4",
    caption: "Placeholder panel for an optional corrected-only render.",
    status: "placeholder"
  }
];

export const evidenceCards = [
  {
    title: "Deterministic pairing first",
    body:
      "The project does not train across loosely matched trajectories. It generates shared deterministic plans and pairs Bullet and MuJoCo rollouts under the same timing contract."
  },
  {
    title: "Alignment gate before claims",
    body:
      "Reset state, dt consistency, frame extraction, and first-step agreement are checked before training claims are accepted."
  },
  {
    title: "Residual correction, not simulator replacement",
    body:
      "The learned model predicts the MuJoCo-minus-Bullet next-state residual. The base simulator still supplies the rollout state evolution."
  },
  {
    title: "Rollout validation, not only one-step loss",
    body:
      "The canonical PASS includes holdouts, hard-mode slices, and teacher-forced long-horizon rollout metrics instead of relying on isolated one-step improvement."
  }
];

export const pipelineSteps = [
  {
    title: "1. Deterministic Paired Rollouts",
    summary: "Shared plans are executed in Bullet and MuJoCo under a strict pairing contract.",
    detail:
      "The pipeline uses shared scripted plans, fixed episode ordering, and a common state/action schema so every sample has a traceable counterpart across simulators."
  },
  {
    title: "2. Alignment Gate",
    summary: "Training is blocked if reset state, timing, or first-step consistency drift.",
    detail:
      "Alignment is operational, not aspirational. The gate verifies effective dt, cube and end-effector extraction, initial configuration, and first-step diffs before residual learning is trusted."
  },
  {
    title: "3. Residual Model",
    summary: "The model predicts MuJoCo next-state deltas relative to Bullet.",
    detail:
      "The objective is S_next_mujoco ~= S_next_bullet + Delta(S_bullet, A). This keeps the base simulator visible while focusing learning capacity on the measured simulator gap."
  },
  {
    title: "4. Stress Validation",
    summary: "The hard-mode PASS checks one-step error, holdouts, slices, and rollout stability.",
    detail:
      "The canonical quantitative PASS comes from a hard-mode stress suite with distribution-shift families, contact slices, and rollout horizons of 50, 200, and 500."
  }
];

export const metricGroups: Record<string, MetricCardData[]> = {
  oneStep: [
    {
      label: "Raw mean",
      value: "0.0941",
      hint: "Physical one-step baseline mismatch",
      tone: "ember"
    },
    {
      label: "Raw p95",
      value: "0.1196",
      hint: "95th percentile raw mismatch",
      tone: "ember"
    },
    {
      label: "Corrected mean",
      value: "0.0106",
      hint: "Residual-corrected one-step mismatch",
      tone: "mint"
    },
    {
      label: "Corrected p95",
      value: "0.0207",
      hint: "95th percentile corrected mismatch",
      tone: "mint"
    }
  ],
  rollout: [
    {
      label: "TF-50 p95",
      value: "0.0173",
      hint: "Teacher-forced physical rollout error at horizon 50",
      tone: "cyan"
    },
    {
      label: "TF-200 p95",
      value: "0.0174",
      hint: "Teacher-forced physical rollout error at horizon 200",
      tone: "cyan"
    },
    {
      label: "TF-500 p95",
      value: "0.0222",
      hint: "Teacher-forced physical rollout error at horizon 500",
      tone: "cyan"
    },
    {
      label: "Divergences",
      value: "0",
      hint: "No NaN/Inf or divergence in canonical reported rollout checks",
      tone: "mint"
    }
  ],
  contact: [
    {
      label: "Contact flag acc",
      value: "0.9911",
      hint: "Diagnostic contact proxy accuracy",
      tone: "cyan"
    },
    {
      label: "Force proxy p95",
      value: "0.1236",
      hint: "Contact-force proxy error",
      tone: "ember"
    },
    {
      label: "Min-dist proxy p95",
      value: "0.0046",
      hint: "Minimum-distance proxy error",
      tone: "cyan"
    },
    {
      label: "Worst slice ratio",
      value: "7.06x",
      hint: "Improvement ratio on the toughest reported early-time slice",
      tone: "mint"
    }
  ]
};

export const resultGallery = [
  {
    title: "Triptych preview",
    path: assetPath("images/triptych-frame0.png"),
    caption:
      "The fastest still frame for understanding the public claim. Left: Bullet raw. Middle: MuJoCo reference. Right: Bullet corrected."
  },
  {
    title: "End-effector XY overlay",
    path: assetPath("images/ee-traj-xy.png"),
    caption:
      "Task-plane overlay for raw, reference, and corrected end-effector trajectories."
  },
  {
    title: "End-effector 3D overlay",
    path: assetPath("images/ee-traj-3d.png"),
    caption:
      "3D overlay showing height and spatial agreement rather than just planar alignment."
  },
  {
    title: "Object XY overlay",
    path: assetPath("images/obj-traj-xy.png"),
    caption:
      "Object motion agreement across the same rollout."
  },
  {
    title: "Object 3D overlay",
    path: assetPath("images/obj-traj-3d.png"),
    caption:
      "Object dynamics remain near-identical in the selected behavioral PASS view."
  },
  {
    title: "Rollout summary figure",
    path: assetPath("images/rollout-phys-p95.png"),
    caption:
      "Publication-style summary of one-step and long-horizon physical rollout performance."
  }
];

export const docsSections = [
  {
    title: "Companion package",
    items: [
      "Published package: sim2sim-onepass",
      "Install with: python -m pip install sim2sim-onepass",
      "Optional rollout extra: python -m pip install \"sim2sim-onepass[rollout]\"",
      "The package is a lightweight companion CLI, not a full standalone simulator stack"
    ]
  },
  {
    title: "Environment",
    items: [
      "Vite + React + TypeScript + Tailwind CSS",
      "Static assets only, no backend",
      "Site media under public/assets/videos, public/assets/images, and public/assets/reports",
      "Original simulator and training commands preserved as reference, but not executable from this trimmed site alone"
    ]
  },
  {
    title: "Canonical execution order",
    items: [
      "Run the alignment gate first",
      "Generate paired data only after alignment passes",
      "Train the residual model on strictly paired datasets",
      "Validate with the stress suite",
      "Generate behavioral visuals and triptych exports for inspection"
    ]
  }
];

export const codeSnippets = {
  packageInstall: `python -m pip install sim2sim-onepass
python -m pip install "sim2sim-onepass[rollout]"`,
  setup: `py -m venv .bridge312
.\\.bridge312\\Scripts\\Activate.ps1
python -m pip install -U pip
pip install -r requirements_bridge312.txt`,
  alignment: `.\\.bridge312\\Scripts\\python scripts\\alignment_gate.py`,
  visuals: `.\\.bridge312\\Scripts\\python scripts\\behavioral_acceptance_suite.py --model reports\\delta_train_move_ab\\model.pt --norm reports\\delta_train_move_ab\\normalization.json`,
  stress: `.\\.bridge312\\Scripts\\python scripts\\stress_suite.py --bullet data_pybullet\\paired_bullet_hardgen_seeds0-5.npz --mujoco data_mujoco\\paired_mujoco_hardgen_seeds0-5.npz --model reports\\delta_train_hardgen_fix_20260203-135301\\model.pt --norm reports\\delta_train_hardgen_fix_20260203-135301\\normalization.json --horizons 50,200,500 --nstart 200 --seed 0 --hard_mode 1`
};

export const limitations = [
  "This project is sim-to-sim only. The public claim is not about real-robot transfer.",
  "The canonical quantitative PASS and the behavioral PASS are separate curated runs because they serve different reviewer needs.",
  "The current public artifact does not include a standalone corrected-only MP4 export.",
  "Visual improvement can be subtle. Reviewers should inspect both videos and overlay plots rather than expect dramatic motion differences."
];

export const downloadLinks = [
  {
    label: "Canonical PASS report",
    href: assetPath("reports/canonical-pass-report.md")
  },
  {
    label: "Metrics summary JSON",
    href: assetPath("reports/metrics-summary.json")
  },
  {
    label: "Stress metrics JSON",
    href: assetPath("reports/source-stress-metrics.json")
  },
  {
    label: "Pipeline PDF",
    href: assetPath("reports/pipeline.pdf")
  }
];
