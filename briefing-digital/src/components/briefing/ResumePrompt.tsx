"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useBriefingStore } from "@/lib/store";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { QUESTIONS, getSection } from "@/lib/questions";

/**
 * Mostra um modal "continuar de onde parou?" se houver draft com step > 0.
 * Renderizado uma vez no layout do /briefing.
 */
export function ResumePrompt() {
  const hydrate = useBriefingStore((s) => s.hydrate);
  const hydrated = useBriefingStore((s) => s.hydrated);
  const step = useBriefingStore((s) => s.step);
  const reset = useBriefingStore((s) => s.reset);
  const setStep = useBriefingStore((s) => s.setStep);
  const [open, setOpen] = useState(false);
  const [savedStep, setSavedStep] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (hydrated) return;
    const draft = hydrate();
    if (draft && draft.step > 0) {
      setSavedStep(draft.step);
      setOpen(true);
    }
  }, [hydrated, hydrate]);

  const sectionLabel = (() => {
    const q = QUESTIONS[savedStep];
    if (!q) return null;
    return getSection(q.section);
  })();

  function continueFromSaved() {
    setOpen(false);
    if (savedStep !== step) setStep(savedStep);
    router.replace(`/briefing/${savedStep}`);
  }

  function startOver() {
    reset();
    setOpen(false);
    router.replace("/briefing/0");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-mp-bg-deep/80 p-4 backdrop-blur md:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="resume-title"
        >
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md rounded-2xl border border-mp-border bg-mp-bg-elevated p-7 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
          >
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-mp-accent">
              Encontramos um rascunho
            </p>
            <h2 id="resume-title" className="text-2xl font-extrabold leading-tight">
              Continuar de onde parou?
            </h2>
            <p className="mt-3 text-sm text-mp-text-muted">
              Você parou na pergunta {savedStep + 1}
              {sectionLabel ? <> — seção <strong className="font-semibold text-mp-text">{sectionLabel.title}</strong></> : null}.
              Suas respostas estão salvas aqui no navegador.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <PrimaryButton variant="outline" onClick={startOver}>
                Começar do zero
              </PrimaryButton>
              <PrimaryButton onClick={continueFromSaved} withArrow>
                Continuar
              </PrimaryButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
