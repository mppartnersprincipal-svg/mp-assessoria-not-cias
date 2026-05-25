"use client";

import { motion } from "framer-motion";
import type { Section } from "@/lib/questions";

const EASING = [0.22, 1, 0.36, 1] as const;

type Props = {
  section: Section;
};

export function SectionDivider({ section }: Props) {
  return (
    <div className="flex flex-col items-start gap-6">
      <motion.span
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASING }}
        className="inline-flex items-center gap-2 rounded-pill bg-mp-accent px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-mp-bg-deep"
      >
        <span aria-hidden="true">●</span>
        {section.pill}
      </motion.span>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.12, ease: EASING }}
        className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
      >
        {section.title}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.25, ease: EASING }}
        className="max-w-[58ch] text-lg text-mp-text-muted md:text-xl"
      >
        {section.subtitle}
      </motion.p>
    </div>
  );
}
