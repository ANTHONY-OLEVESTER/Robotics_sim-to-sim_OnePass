import { useEffect, useMemo, useState } from "react";

type NodeKey =
  | "plan"
  | "pybullet"
  | "mujoco"
  | "paired"
  | "gate"
  | "residual"
  | "projection"
  | "validation";

type PipelineNode = {
  key: NodeKey;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  tone: string;
  detail: string;
  badge: string;
};

const VIEWBOX_WIDTH = 1200;
const VIEWBOX_HEIGHT = 560;

const NODES: PipelineNode[] = [
  {
    key: "plan",
    title: "Deterministic",
    subtitle: "plan schema",
    x: 24,
    y: 184,
    w: 208,
    h: 118,
    tone: "pipeline-node-plan",
    badge: "Input",
    detail:
      "A shared plan schema fixes episode order, timing, and action sequence before either simulator runs. This is the contract that makes paired supervision meaningful."
  },
  {
    key: "pybullet",
    title: "PyBullet",
    x: 268,
    y: 114,
    w: 186,
    h: 92,
    tone: "pipeline-node-sim",
    badge: "Simulator",
    detail:
      "PyBullet executes the deterministic plan and produces the raw trajectory that later receives the learned correction."
  },
  {
    key: "mujoco",
    title: "MuJoCo",
    x: 268,
    y: 276,
    w: 186,
    h: 92,
    tone: "pipeline-node-sim",
    badge: "Reference",
    detail:
      "MuJoCo executes the same plan and acts as the target simulator for paired next-state learning."
  },
  {
    key: "paired",
    title: "Paired transitions",
    subtitle: "(episode, timestep)",
    x: 490,
    y: 174,
    w: 242,
    h: 128,
    tone: "pipeline-node-paired",
    badge: "Alignment-ready",
    detail:
      "Matched Bullet and MuJoCo steps are organized by episode and timestep so every supervised transition is directly comparable."
  },
  {
    key: "gate",
    title: "Hard",
    subtitle: "alignment gate",
    x: 756,
    y: 174,
    w: 206,
    h: 128,
    tone: "pipeline-node-gate",
    badge: "Gate",
    detail:
      "Reset state, dt, extraction, and first-step checks must pass here before any residual-learning claim is allowed downstream."
  },
  {
    key: "residual",
    title: "Residual model",
    subtitle: "Delta_theta(S_t, A_t)",
    x: 984,
    y: 108,
    w: 188,
    h: 92,
    tone: "pipeline-node-model",
    badge: "Correction",
    detail:
      "The model predicts the MuJoCo-minus-Bullet residual instead of replacing the simulator. That keeps the correction task narrow and measurable."
  },
  {
    key: "projection",
    title: "Projection Pi",
    subtitle: "(validity)",
    x: 984,
    y: 254,
    w: 188,
    h: 92,
    tone: "pipeline-node-projection",
    badge: "Validity",
    detail:
      "Projection constrains corrected states into a valid region before rollout metrics are trusted."
  },
  {
    key: "validation",
    title: "Horizon validation",
    subtitle: "TF-50/200/500 + contact slices",
    x: 984,
    y: 400,
    w: 188,
    h: 108,
    tone: "pipeline-node-validation",
    badge: "PASS logic",
    detail:
      "Teacher-forced horizons and contact slices confirm that correction quality survives beyond one-step loss and remains stable at rollout scale."
  }
];

const EDGES: Array<{ from: NodeKey; to: NodeKey; accent?: boolean }> = [
  { from: "plan", to: "pybullet" },
  { from: "plan", to: "mujoco" },
  { from: "pybullet", to: "paired" },
  { from: "mujoco", to: "paired" },
  { from: "paired", to: "gate" },
  { from: "gate", to: "residual", accent: true },
  { from: "gate", to: "projection", accent: true },
  { from: "projection", to: "validation", accent: true }
];

const FLOW_SEQUENCE: NodeKey[] = [
  "plan",
  "pybullet",
  "mujoco",
  "paired",
  "gate",
  "residual",
  "projection",
  "validation"
];

function nodeByKey(key: NodeKey) {
  return NODES.find((node) => node.key === key)!;
}

function nodeCenter(node: PipelineNode) {
  return { x: node.x + node.w / 2, y: node.y + node.h / 2 };
}

function edgePath(from: PipelineNode, to: PipelineNode) {
  const fromCenter = nodeCenter(from);
  const toCenter = nodeCenter(to);
  const horizontal = Math.abs(fromCenter.x - toCenter.x) >= Math.abs(fromCenter.y - toCenter.y);

  if (horizontal) {
    const startX = fromCenter.x < toCenter.x ? from.x + from.w : from.x;
    const endX = fromCenter.x < toCenter.x ? to.x : to.x + to.w;
    const curve = Math.max(46, Math.abs(endX - startX) * 0.24);
    return `M ${startX} ${fromCenter.y} C ${startX + curve} ${fromCenter.y}, ${endX - curve} ${toCenter.y}, ${endX} ${toCenter.y}`;
  }

  const startY = fromCenter.y < toCenter.y ? from.y + from.h : from.y;
  const endY = fromCenter.y < toCenter.y ? to.y : to.y + to.h;
  const curve = Math.max(40, Math.abs(endY - startY) * 0.25);
  return `M ${fromCenter.x} ${startY} C ${fromCenter.x} ${startY + curve}, ${toCenter.x} ${endY - curve}, ${toCenter.x} ${endY}`;
}

export function PipelineDiagram() {
  const [active, setActive] = useState<NodeKey>("gate");
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhase((current) => (current + 1) % FLOW_SEQUENCE.length);
    }, 1700);
    return () => window.clearInterval(timer);
  }, []);

  const activeNode = nodeByKey(active);
  const phaseKey = FLOW_SEQUENCE[phase];

  const edges = useMemo(() => {
    return EDGES.map((edge) => {
      const from = nodeByKey(edge.from);
      const to = nodeByKey(edge.to);
      return {
        ...edge,
        d: edgePath(from, to)
      };
    });
  }, []);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_360px]">
      <div className="rounded-[2rem] border border-white/10 bg-[#0b1520] shadow-glow">
        <div className="border-b border-white/10 px-5 py-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            Animated systems view
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-steel">
            This is the animated remake of the paper pipeline figure. The board
            auto-scales to stay inside the frame, the flow pulses across the
            system, and each stage explains how correction is built and validated.
          </p>
        </div>

        <div className="p-3 md:p-5">
          <div className="relative aspect-[2.28/1] w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#0a121a]">
            <div className="pointer-events-none absolute inset-0 grid-surface opacity-35" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <marker
                  id="pipeline-arrowhead"
                  viewBox="0 0 12 12"
                  refX="9"
                  refY="6"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="#546577" />
                </marker>
                <marker
                  id="pipeline-arrowhead-accent"
                  viewBox="0 0 12 12"
                  refX="9"
                  refY="6"
                  markerWidth="8"
                  markerHeight="8"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 12 6 L 0 12 z" fill="#72f0c0" />
                </marker>
              </defs>

              {edges.map((edge, index) => (
                <g key={`${edge.from}-${edge.to}`}>
                  <path
                    d={edge.d}
                    fill="none"
                    stroke={edge.accent ? "#385a54" : "#33414f"}
                    strokeWidth="4"
                    markerEnd={edge.accent ? "url(#pipeline-arrowhead-accent)" : "url(#pipeline-arrowhead)"}
                    opacity="0.95"
                  />
                  <path
                    d={edge.d}
                    fill="none"
                    stroke={edge.accent ? "#72f0c0" : "#8cd9ff"}
                    strokeWidth="2.2"
                    strokeDasharray="9 13"
                    opacity={phase > index ? 0.85 : 0.32}
                    className="pipeline-dash"
                  />
                  <circle r="6" fill={edge.accent ? "#72f0c0" : "#8cd9ff"} opacity="0.95">
                    <animateMotion
                      dur={edge.accent ? "2.8s" : "3.6s"}
                      begin={`${index * 0.24}s`}
                      repeatCount="indefinite"
                      path={edge.d}
                    />
                  </circle>
                </g>
              ))}
            </svg>

            <div className="absolute inset-0">
              {NODES.map((node) => {
                const isActive = active === node.key;
                const isFlowing = phaseKey === node.key;
                return (
                  <button
                    key={node.key}
                    type="button"
                    onClick={() => setActive(node.key)}
                    className={`pipeline-node ${node.tone} ${isActive ? "pipeline-node-active" : ""} ${
                      isFlowing ? "pipeline-node-flow" : ""
                    }`}
                    style={{
                      left: `${(node.x / VIEWBOX_WIDTH) * 100}%`,
                      top: `${(node.y / VIEWBOX_HEIGHT) * 100}%`,
                      width: `${(node.w / VIEWBOX_WIDTH) * 100}%`,
                      height: `${(node.h / VIEWBOX_HEIGHT) * 100}%`
                    }}
                  >
                    <span className="pipeline-node-badge">{node.badge}</span>
                    <span className="pipeline-node-title">{node.title}</span>
                    {node.subtitle ? <span className="pipeline-node-subtitle">{node.subtitle}</span> : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
          Active stage
        </p>
        <div className="mt-3 flex items-center gap-3">
          <span className="inline-flex rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            {activeNode.badge}
          </span>
          <span className="inline-flex rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-mint">
            Live phase: {phaseKey}
          </span>
        </div>

        <h3 className="mt-4 font-display text-3xl font-semibold text-paper">
          {activeNode.title}
        </h3>
        {activeNode.subtitle ? (
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-steel">{activeNode.subtitle}</p>
        ) : null}
        <p className="mt-5 text-sm leading-7 text-steel">{activeNode.detail}</p>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-steel">How the pass is built</p>
          <p className="mt-2 text-sm leading-7 text-paper">
            The animated flow starts from the deterministic plan contract,
            branches into both simulators, reconverges into paired transitions,
            then only advances into correction once the hard alignment gate passes.
          </p>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-steel">Real-time correction story</p>
          <p className="mt-2 text-sm leading-7 text-paper">
            The mint-highlighted path is the correction lane: gate, residual,
            projection, and horizon validation. That is the part of the system
            that dynamically tightens Bullet toward the MuJoCo reference without
            pretending to replace physics wholesale.
          </p>
        </div>
      </aside>
    </div>
  );
}
