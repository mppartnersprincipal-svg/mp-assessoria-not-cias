"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/shared/PrimaryButton";
import { BrandMark } from "@/components/shared/BrandMark";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function ConcluidoPage() {
  return (
    <div className="flex min-h-[80dvh] flex-col items-start gap-10">
      <BrandMark size="md" />

      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASING }}
        className="grid size-20 place-items-center rounded-full bg-mp-accent text-mp-bg-deep shadow-[0_12px_40px_-12px_rgba(255,215,0,0.6)]"
        aria-hidden="true"
      >
        <Check size={42} strokeWidth={3} />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
        className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl"
      >
        Pronto. <span className="text-mp-accent">Recebemos o seu briefing.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: EASING }}
        className="max-w-[58ch] text-lg text-mp-text-muted md:text-xl"
      >
        A equipe da M|P já tem o material pra começar a desenhar a estratégia.
        Em breve a gente entra em contato pelo canal que você indicou.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="rounded-xl border border-dashed border-mp-border-soft bg-mp-bg-elevated/40 p-5 text-sm text-mp-text-muted"
      >
        <p className="font-semibold text-mp-text">⚙️ Fase 2 (em desenvolvimento)</p>
        <p className="mt-1.5">
          Geração do PDF, envio por e-mail e tela de sucesso com confetti vão entrar na próxima
          rodada. Por enquanto suas respostas estão salvas localmente no navegador.
        </p>
      </motion.div>

      <Link href="/" aria-label="Voltar à tela inicial">
        <PrimaryButton variant="outline">Voltar ao início</PrimaryButton>
      </Link>
    </div>
  );
}
