"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { IntroShell } from "@/components/intro/IntroShell";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function ApresentacaoPage() {
  return (
    <IntroShell>
      <div className="flex flex-col items-start gap-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: EASING }}
          className="grid size-16 place-items-center rounded-2xl bg-mp-bg-elevated border border-mp-border"
        >
          <Target size={30} strokeWidth={2} color="var(--mp-accent)" aria-hidden="true" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASING }}
          className="text-balance text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl"
        >
          Pra desenhar uma estratégia <span className="text-mp-accent">personalizada</span>,
          precisamos de algumas informações.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASING }}
          className="max-w-[58ch] text-lg leading-relaxed text-mp-text-muted md:text-xl"
        >
          São perguntas sobre a sua empresa, público, mercado e objetivos.
          Vai por etapas, sem pressa — você pode parar e continuar depois
          que a gente salva tudo automaticamente.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASING }}
          className="flex items-center gap-4"
        >
          <Link href="/" aria-label="Voltar para a tela inicial">
            <PrimaryButton variant="outline">Voltar</PrimaryButton>
          </Link>
          <Link href="/iniciar" aria-label="Avançar">
            <PrimaryButton withArrow>Avançar</PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </IntroShell>
  );
}
