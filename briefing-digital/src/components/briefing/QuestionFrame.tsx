"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import type { Question } from "@/lib/questions";
import { getValidator, type CidadeEstado, type RedeSocial } from "@/lib/schema";
import { useBriefingStore } from "@/lib/store";
import { ShortTextInput } from "./inputs/ShortText";
import { LongTextInput } from "./inputs/LongText";
import { SingleChoiceInput } from "./inputs/SingleChoice";
import { CNPJInput } from "./inputs/CNPJInput";
import { CidadeEstadoInput } from "./inputs/CidadeEstado";
import { RedesSociaisInput } from "./inputs/RedesSociais";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

const EASING = [0.22, 1, 0.36, 1] as const;

type Props = {
  question: Question;
  onSubmit: () => void;
  onBack: () => void;
  canGoBack: boolean;
  totalQuestions: number;
  stepIndex: number;
};

export function QuestionFrame({ question, onSubmit, onBack, canGoBack, totalQuestions, stepIndex }: Props) {
  const value = useBriefingStore((s) => s.answers[question.id]);
  const setAnswer = useBriefingStore((s) => s.setAnswer);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(0);
  const containerRef = useRef<HTMLFormElement>(null);

  const validator = useMemo(() => getValidator(question), [question]);
  const isLast = stepIndex === totalQuestions - 1;
  const isStub = question.type === "stub";

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    if (isStub) {
      onSubmit();
      return;
    }
    const result = validator.safeParse(value ?? defaultFor(question));
    if (!result.success) {
      const message = result.error.errors[0]?.message ?? "Confere essa resposta.";
      setError(message);
      setShake((n) => n + 1);
      return;
    }
    setError(null);
    onSubmit();
  }

  function handleKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key === "Enter" && !(e.target as HTMLElement)?.matches("textarea")) {
      handleSubmit();
    }
  }

  return (
    <motion.form
      ref={containerRef}
      key={question.id}
      onSubmit={handleSubmit}
      onKeyDown={handleKeyDown}
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.35, ease: EASING }}
      className="flex flex-col gap-7"
      noValidate
    >
      <div className="flex flex-col gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-mp-accent">
          Pergunta {stepIndex + 1}
          {question.required && <span className="ml-1 opacity-70">· obrigatória</span>}
        </span>
        <h2 className="text-balance text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
          {question.title}
        </h2>
        {question.help && (
          <p className="max-w-[60ch] text-base text-mp-text-muted">{question.help}</p>
        )}
      </div>

      <motion.div
        key={`field-${shake}`}
        animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : undefined}
        transition={{ duration: 0.4, ease: EASING }}
      >
        {renderInput(question, value, setAnswer, error !== null)}
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          role="alert"
          className="inline-flex items-center gap-2 text-sm font-medium text-mp-error"
        >
          <AlertCircle size={16} aria-hidden="true" />
          {error}
        </motion.div>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <PrimaryButton
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={!canGoBack}
          aria-label="Voltar para a pergunta anterior"
        >
          Voltar
        </PrimaryButton>
        <PrimaryButton type="submit" withArrow>
          {isLast ? "Concluir" : "Continuar"}
        </PrimaryButton>
      </div>

      {isStub && (
        <p className="text-xs italic text-mp-text-dim">
          ⓘ Este tipo de pergunta ainda não tem coleta funcional no MVP — você pode avançar sem responder.
        </p>
      )}
    </motion.form>
  );
}

function defaultFor(question: Question): unknown {
  switch (question.type) {
    case "single-choice":
      return "";
    case "multi-choice":
      return [];
    case "cidade-estado":
      return { cidade: "", estado: "" };
    case "redes-sociais":
      return [];
    default:
      return "";
  }
}

function renderInput(
  question: Question,
  value: unknown,
  setAnswer: (id: string, value: unknown) => void,
  invalid: boolean
) {
  const id = question.id;

  switch (question.type) {
    case "short-text":
      return (
        <ShortTextInput
          autoFocus
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(id, v)}
          invalid={invalid}
        />
      );

    case "long-text":
      return (
        <LongTextInput
          autoFocus
          placeholder={question.placeholder}
          maxLength={question.maxLength ?? 1500}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(id, v)}
          invalid={invalid}
        />
      );

    case "url":
      return (
        <ShortTextInput
          autoFocus
          inputMode="url"
          autoComplete="url"
          placeholder={question.placeholder ?? "https://..."}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(id, v)}
          invalid={invalid}
        />
      );

    case "cnpj":
      return (
        <CNPJInput
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(id, v)}
          invalid={invalid}
          placeholder={question.placeholder}
        />
      );

    case "cidade-estado":
      return (
        <CidadeEstadoInput
          value={value as CidadeEstado | undefined}
          onChange={(v) => setAnswer(id, v)}
          invalidCidade={invalid}
          invalidEstado={invalid}
        />
      );

    case "single-choice":
      return (
        <SingleChoiceInput
          choices={question.choices ?? []}
          name={id}
          value={typeof value === "string" ? value : ""}
          onChange={(v) => setAnswer(id, v)}
          invalid={invalid}
        />
      );

    case "redes-sociais":
      return (
        <RedesSociaisInput
          value={Array.isArray(value) ? (value as RedeSocial[]) : []}
          onChange={(v) => setAnswer(id, v)}
        />
      );

    case "stub":
      return (
        <div className="rounded-xl border border-dashed border-mp-border-soft bg-mp-bg-elevated/40 p-6 text-sm text-mp-text-muted">
          <p className="font-semibold text-mp-text">Coleta em construção</p>
          <p className="mt-1.5 text-mp-text-muted">
            Este campo será disponibilizado na fase 2 (ranking, escala, upload de arquivo, faixa de valor, etc).
            Por enquanto você pode pular pra próxima pergunta.
          </p>
        </div>
      );

    default:
      return null;
  }
}
