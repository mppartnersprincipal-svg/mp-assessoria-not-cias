"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { QUESTIONS, TOTAL_QUESTIONS, getSection, isFirstOfSection } from "@/lib/questions";
import { useBriefingStore } from "@/lib/store";
import { QuestionFrame } from "@/components/briefing/QuestionFrame";
import { SectionDivider } from "@/components/briefing/SectionDivider";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

type Params = { step: string };

const DIVIDER_DURATION_MS = 1800;

export default function BriefingStepPage({ params }: { params: Promise<Params> }) {
  const { step: stepParam } = use(params);
  const router = useRouter();

  const stepIndex = Math.max(0, Math.min(TOTAL_QUESTIONS - 1, Number(stepParam) || 0));
  const question = QUESTIONS[stepIndex];

  const setStep = useBriefingStore((s) => s.setStep);
  const hydrated = useBriefingStore((s) => s.hydrated);

  const startsSection = isFirstOfSection(stepIndex);
  const section = startsSection ? getSection(question.section) : null;
  const [showDivider, setShowDivider] = useState<boolean>(startsSection);

  useEffect(() => {
    setStep(stepIndex);
  }, [stepIndex, setStep]);

  useEffect(() => {
    setShowDivider(startsSection);
    if (!startsSection) return;
    const t = setTimeout(() => setShowDivider(false), DIVIDER_DURATION_MS);
    return () => clearTimeout(t);
  }, [stepIndex, startsSection]);

  function next() {
    if (stepIndex < TOTAL_QUESTIONS - 1) {
      router.push(`/briefing/${stepIndex + 1}`);
    } else {
      router.push("/briefing/concluido");
    }
  }

  function back() {
    if (stepIndex === 0) {
      router.push("/iniciar");
      return;
    }
    router.push(`/briefing/${stepIndex - 1}`);
  }

  if (!hydrated) {
    return (
      <div className="min-h-[60dvh] animate-pulse">
        <div className="h-3 w-24 rounded-full bg-mp-bg-elevated" />
        <div className="mt-6 h-12 w-3/4 rounded-lg bg-mp-bg-elevated" />
        <div className="mt-4 h-5 w-2/3 rounded bg-mp-bg-elevated/70" />
        <div className="mt-10 h-16 w-full rounded-xl bg-mp-bg-elevated" />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      {showDivider && section ? (
        <div key={`divider-${section.index}`} className="flex flex-col gap-10">
          <SectionDivider section={section} />
          <div className="flex">
            <PrimaryButton
              variant="outline"
              onClick={() => setShowDivider(false)}
              withArrow
              aria-label="Pular apresentação da seção"
            >
              Começar a seção
            </PrimaryButton>
          </div>
        </div>
      ) : (
        <QuestionFrame
          key={question.id}
          question={question}
          stepIndex={stepIndex}
          totalQuestions={TOTAL_QUESTIONS}
          canGoBack={true}
          onSubmit={next}
          onBack={back}
        />
      )}
    </AnimatePresence>
  );
}
