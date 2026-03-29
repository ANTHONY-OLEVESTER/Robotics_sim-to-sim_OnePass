import { useState } from "react";
import { videoItems } from "../data/siteContent";

export function VideoPanel() {
  const [activeKey, setActiveKey] = useState("triptych");
  const active = videoItems.find((item) => item.key === activeKey) ?? videoItems[0];

  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-4 shadow-glow md:p-6">
      <div className="flex flex-wrap gap-2">
        {videoItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveKey(item.key)}
            className={`rounded-full px-4 py-2 text-sm transition ${
              item.key === active.key
                ? "bg-paper text-ink"
                : "border border-white/10 bg-white/[0.03] text-steel hover:text-paper"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1.75fr)_minmax(280px,1fr)]">
        <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#03070d]">
          {active.path ? (
            <video
              className="aspect-video h-full w-full object-contain bg-black"
              controls
              playsInline
              preload="metadata"
              poster={active.posterPath}
            >
              <source src={active.path} />
            </video>
          ) : (
            <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-white/5 to-white/[0.02] p-8 text-center">
              <div className="max-w-sm">
                <p className="font-display text-2xl font-semibold text-paper">
                  Standalone corrected render not packaged
                </p>
                <p className="mt-3 text-sm leading-6 text-steel">{active.note}</p>
              </div>
            </div>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-slate/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan">
            Active panel
          </p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-paper">
            {active.label}
          </h3>
          <p className="mt-3 text-sm leading-7 text-steel">{active.note}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-steel">What to look for</p>
            <p className="mt-2 text-sm leading-7 text-paper">{active.caption}</p>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-steel">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              Bullet raw and MuJoCo reference are packaged as standalone videos.
            </div>
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              The corrected tab uses the triptych video because the public artifact does not include a separate corrected-only MP4.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
