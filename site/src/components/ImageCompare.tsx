import { useId, useState } from "react";

type ImageCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel: string;
  afterLabel: string;
  note: string;
};

export function ImageCompare({
  beforeSrc,
  afterSrc,
  beforeLabel,
  afterLabel,
  note
}: ImageCompareProps) {
  const [value, setValue] = useState(54);
  const id = useId();

  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-glow">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#05090f]">
        <img src={beforeSrc} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${value}%` }}>
          <img
            src={afterSrc}
            alt={afterLabel}
            className="h-full w-full max-w-none object-cover"
            style={{ width: `${10000 / Math.max(value, 1)}%` }}
          />
        </div>
        <div className="absolute inset-y-0" style={{ left: `calc(${value}% - 1px)` }}>
          <div className="h-full w-0.5 bg-paper/90" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper/70 bg-ink/90 text-xs font-semibold uppercase tracking-[0.18em] text-paper">
            drag
          </div>
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-paper">
          {afterLabel}
        </div>
        <div className="absolute bottom-4 right-4 rounded-full bg-ink/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-paper">
          {beforeLabel}
        </div>
      </div>
      <div className="p-5">
        <label htmlFor={id} className="text-xs uppercase tracking-[0.22em] text-steel">
          Compare view
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(event) => setValue(Number(event.target.value))}
          className="mt-3 w-full accent-cyan"
        />
        <p className="mt-4 text-sm leading-7 text-steel">{note}</p>
      </div>
    </div>
  );
}
