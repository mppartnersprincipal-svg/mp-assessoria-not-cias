"use client";

import { motion } from "framer-motion";

type Props = {
  current: number;
  total: number;
};

export function ProgressBar({ current, total }: Props) {
  const pct = Math.min(100, Math.max(0, (current / Math.max(1, total)) * 100));

  return (
    <div className="flex items-center gap-3">
      <div
        className="relative h-1.5 w-full overflow-hidden rounded-pill bg-mp-bg-elevated"
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso do briefing"
      >
        <motion.div
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-y-0 left-0 rounded-pill bg-mp-accent"
        />
      </div>
      <span className="shrink-0 text-xs font-semibold tracking-wider text-mp-text-dim tabular-nums">
        {current + 1}
        <span className="opacity-50"> / {total}</span>
      </span>
    </div>
  );
}
