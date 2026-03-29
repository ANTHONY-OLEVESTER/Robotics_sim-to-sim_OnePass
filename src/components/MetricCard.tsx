import { MetricCardData } from "../data/siteContent";

const toneMap = {
  cyan: "border-cyan/30 bg-cyan/10 text-cyan",
  mint: "border-mint/30 bg-mint/10 text-mint",
  ember: "border-ember/30 bg-ember/10 text-ember"
};

export function MetricCard({ label, value, hint, tone = "cyan" }: MetricCardData) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-glow">
      <div
        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
          toneMap[tone]
        }`}
      >
        {label}
      </div>
      <p className="mt-5 font-display text-4xl font-semibold tracking-tight text-paper">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-steel">{hint}</p>
    </article>
  );
}
