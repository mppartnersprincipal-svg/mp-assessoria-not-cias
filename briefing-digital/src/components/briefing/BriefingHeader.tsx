"use client";

import { useEffect, useState } from "react";
import { useBriefingStore } from "@/lib/store";
import { TOTAL_QUESTIONS } from "@/lib/questions";
import { BrandMark } from "@/components/shared/BrandMark";
import { ProgressBar } from "./ProgressBar";

export function BriefingHeader() {
  const step = useBriefingStore((s) => s.step);
  const hydrated = useBriefingStore((s) => s.hydrated);
  const [displayedStep, setDisplayedStep] = useState(0);

  useEffect(() => {
    if (hydrated) setDisplayedStep(step);
  }, [hydrated, step]);

  return (
    <header
      className="sticky top-0 z-30 border-b border-mp-border-soft bg-mp-bg/85 px-5 py-3 backdrop-blur md:px-10 md:py-4"
      role="banner"
    >
      <div className="mx-auto flex w-full max-w-[1080px] items-center gap-4 md:gap-8">
        <div className="shrink-0">
          <BrandMark size="sm" showLabel={false} />
        </div>
        <div className="flex-1">
          <ProgressBar current={displayedStep} total={TOTAL_QUESTIONS} />
        </div>
      </div>
    </header>
  );
}
