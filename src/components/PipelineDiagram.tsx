import { useMemo, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type NodeKey =
  | "plan"
  | "pybullet"
  | "mujoco"
  | "paired"
  | "gate"
  | "residual"
  | "projection"
  | "validation";

type Point = { x: number; y: number };

type PipelineNode = {
  key: NodeKey;
  title: string;
  subtitle?: string;
  color: string;
  detail: string;
  width: number;
  height: number;
};

const CANVAS_WIDTH = 1120;
const CANVAS_HEIGHT = 520;

const NODE_SPECS: PipelineNode[] = [
  {
    key: "plan",
    title: "Deterministic",
    subtitle: "plan schema",
    color: "bg-[#dbe7fb]",
    detail:
      "Shared plans define the exact sequence to be executed in both simulators so every rollout has a traceable counterpart."
  , width: 240, height: 120 },
  {
    key: "pybullet",
    title: "PyBullet",
    color: "bg-[#ead9ef]",
    detail:
      "Bullet executes the deterministic plan and provides the base simulator trajectory used before correction."
  , width: 210, height: 92 },
  {
    key: "mujoco",
    title: "MuJoCo",
    color: "bg-[#ead9ef]",
    detail:
      "MuJoCo executes the same plan and acts as the reference simulator for paired next-state supervision."
  , width: 210, height: 92 },
  {
    key: "paired",
    title: "Paired transitions",
    subtitle: "(episode, timestep)",
    color: "bg-[#dfeee0]",
    detail:
      "Aligned Bullet and MuJoCo trajectories are turned into paired transitions indexed by episode and timestep."
  , width: 270, height: 120 },
  {
    key: "gate",
    title: "Hard",
    subtitle: "alignment gate",
    color: "bg-[#f9ebcf]",
    detail:
      "The gate blocks training if reset state, dt, extraction, or first-step consistency checks drift outside tolerance."
  , width: 220, height: 120 },
  {
    key: "residual",
    title: "Residual model",
    subtitle: "Δθ(St, At)",
    color: "bg-[#f1d8df]",
    detail:
      "The model predicts the MuJoCo-minus-Bullet next-state residual rather than replacing simulator dynamics outright."
  , width: 230, height: 92 },
  {
    key: "projection",
    title: "Projection Π",
    subtitle: "(validity)",
    color: "bg-[#e4def3]",
    detail:
      "A projection step keeps corrected states in a valid regime before rollout-level validation is accepted."
  , width: 230, height: 92 },
  {
    key: "validation",
    title: "Horizon validation",
    subtitle: "TF-50/200/500 + contact slices",
    color: "bg-[#d7edf1]",
    detail:
      "Teacher-forced rollout checks and contact slices verify that the learned correction stays stable beyond one-step loss."
  , width: 250, height: 108 }
];

const DEFAULT_POSITIONS: Record<NodeKey, Point> = {
  plan: { x: 18, y: 164 },
  pybullet: { x: 304, y: 100 },
  mujoco: { x: 304, y: 262 },
  paired: { x: 586, y: 164 },
  gate: { x: 862, y: 164 },
  residual: { x: 1116, y: 100 },
  projection: { x: 1116, y: 262 },
  validation: { x: 1116, y: 414 }
};

const EDGES: Array<{ from: NodeKey; to: NodeKey }> = [
  { from: "plan", to: "pybullet" },
  { from: "plan", to: "mujoco" },
  { from: "pybullet", to: "paired" },
  { from: "mujoco", to: "paired" },
  { from: "paired", to: "gate" },
  { from: "gate", to: "residual" },
  { from: "gate", to: "projection" },
  { from: "projection", to: "validation" }
];

type DragState = {
  key: NodeKey;
  offsetX: number;
  offsetY: number;
} | null;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function centerOf(node: PipelineNode, point: Point) {
  return { x: point.x + node.width / 2, y: point.y + node.height / 2 };
}

function edgePoints(fromNode: PipelineNode, fromPoint: Point, toNode: PipelineNode, toPoint: Point) {
  const fromCenter = centerOf(fromNode, fromPoint);
  const toCenter = centerOf(toNode, toPoint);
  const horizontal = Math.abs(fromCenter.x - toCenter.x) >= Math.abs(fromCenter.y - toCenter.y);

  if (horizontal) {
    const startX = fromCenter.x <= toCenter.x ? fromPoint.x + fromNode.width : fromPoint.x;
    const endX = fromCenter.x <= toCenter.x ? toPoint.x : toPoint.x + toNode.width;
    return {
      start: { x: startX, y: fromCenter.y },
      end: { x: endX, y: toCenter.y }
    };
  }

  const startY = fromCenter.y <= toCenter.y ? fromPoint.y + fromNode.height : fromPoint.y;
  const endY = fromCenter.y <= toCenter.y ? toPoint.y : toPoint.y + toNode.height;
  return {
    start: { x: fromCenter.x, y: startY },
    end: { x: toCenter.x, y: endY }
  };
}

export function PipelineDiagram() {
  const [positions, setPositions] = useState(DEFAULT_POSITIONS);
  const [active, setActive] = useState<NodeKey>("gate");
  const [drag, setDrag] = useState<DragState>(null);

  const activeNode = NODE_SPECS.find((node) => node.key === active) ?? NODE_SPECS[0];

  const edges = useMemo(() => {
    return EDGES.map((edge) => {
      const fromNode = NODE_SPECS.find((node) => node.key === edge.from)!;
      const toNode = NODE_SPECS.find((node) => node.key === edge.to)!;
      const points = edgePoints(fromNode, positions[edge.from], toNode, positions[edge.to]);
      const midX = (points.start.x + points.end.x) / 2;
      return {
        ...edge,
        d: `M ${points.start.x} ${points.start.y} C ${midX} ${points.start.y}, ${midX} ${points.end.y}, ${points.end.x} ${points.end.y}`
      };
    });
  }, [positions]);

  function onPointerDown(event: ReactPointerEvent<HTMLButtonElement>, key: NodeKey) {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    target.setPointerCapture(event.pointerId);
    setActive(key);
    setDrag({
      key,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    });
  }

  function onPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (!drag) return;
    const containerRect = event.currentTarget.getBoundingClientRect();
    const node = NODE_SPECS.find((item) => item.key === drag.key)!;
    const nextX = clamp(event.clientX - containerRect.left - drag.offsetX, 0, CANVAS_WIDTH - node.width);
    const nextY = clamp(event.clientY - containerRect.top - drag.offsetY, 0, CANVAS_HEIGHT - node.height);
    setPositions((current) => ({
      ...current,
      [drag.key]: { x: nextX, y: nextY }
    }));
  }

  function stopDrag() {
    setDrag(null);
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_360px]">
      <div
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate/60 shadow-glow"
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerLeave={stopDrag}
      >
        <div className="pointer-events-none absolute inset-0 grid-surface opacity-40" />
        <div className="relative border-b border-white/10 px-5 py-4 md:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            Interactive pipeline board
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-steel">
            Drag the blocks to inspect the pipeline layout from the paper figure. Click any block to read its role in the public proof path.
          </p>
        </div>

        <div className="relative overflow-x-auto p-4 md:p-6">
          <div
            className="relative mx-auto min-w-[1120px]"
            style={{ width: `${CANVAS_WIDTH}px`, height: `${CANVAS_HEIGHT}px` }}
          >
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
              <defs>
                <marker
                  id="pipeline-arrow"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#2d3137" />
                </marker>
              </defs>
              {edges.map((edge) => (
                <path
                  key={`${edge.from}-${edge.to}`}
                  d={edge.d}
                  fill="none"
                  stroke="#2d3137"
                  strokeWidth="3"
                  markerEnd="url(#pipeline-arrow)"
                />
              ))}
            </svg>

            {NODE_SPECS.map((node) => {
              const point = positions[node.key];
              const isActive = active === node.key;
              return (
                <button
                  key={node.key}
                  type="button"
                  onClick={() => setActive(node.key)}
                  onPointerDown={(event) => onPointerDown(event, node.key)}
                  className={`absolute flex cursor-grab flex-col items-center justify-center rounded-[1.15rem] border-[3px] px-4 text-center text-[#111318] shadow-[0_22px_45px_rgba(0,0,0,0.28)] transition ${
                    isActive ? "border-[#16181c] ring-4 ring-cyan/20" : "border-[#2d3137]"
                  } ${drag?.key === node.key ? "cursor-grabbing scale-[1.02]" : ""} ${node.color}`}
                  style={{
                    left: `${point.x}px`,
                    top: `${point.y}px`,
                    width: `${node.width}px`,
                    height: `${node.height}px`
                  }}
                >
                  <span className="font-display text-[1.05rem] font-semibold leading-tight md:text-[1.12rem]">
                    {node.title}
                  </span>
                  {node.subtitle ? (
                    <span className="mt-2 text-[0.92rem] leading-tight md:text-[0.98rem]">
                      {node.subtitle}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-glow">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
          Selected block
        </p>
        <h3 className="mt-3 font-display text-3xl font-semibold text-paper">
          {activeNode.title}
        </h3>
        {activeNode.subtitle ? (
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-steel">
            {activeNode.subtitle}
          </p>
        ) : null}
        <p className="mt-5 text-sm leading-7 text-steel">{activeNode.detail}</p>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-steel">Interaction</p>
          <p className="mt-2 text-sm leading-7 text-paper">
            Drag any block to rearrange the pipeline locally. The arrows will redraw so you can inspect the dependency structure without leaving the page.
          </p>
        </div>

        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.18em] text-steel">Scope</p>
          <p className="mt-2 text-sm leading-7 text-paper">
            This interactive view replaces the static PDF figure on the site. The repo still keeps the underlying provenance materials, but the website now explains the pipeline directly.
          </p>
        </div>
      </aside>
    </div>
  );
}
