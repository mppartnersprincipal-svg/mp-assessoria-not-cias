"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { IntroShell } from "@/components/intro/IntroShell";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

const EASING = [0.22, 1, 0.36, 1] as const;

const headlineWords = ["Bem-vindo", "à", "M|P", "Assessoria"];

export default function HomePage() {
  return (
    <IntroShell>
      <div className="flex flex-col items-start gap-10">
        <motion.span
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASING }}
          className="inline-flex items-center gap-2 rounded-pill border border-mp-border bg-mp-bg-elevated/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-mp-accent"
        >
          <span aria-hidden="true">●</span>
          Briefing de onboarding
        </motion.span>

        <h1 className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
          {headlineWords.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.25 + i * 0.08,
                ease: EASING,
              }}
              className="mr-3 inline-block"
            >
              {word === "M|P" ? (
                <>
                  M
                  <span className="text-mp-accent">|</span>
                  P
                </>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: EASING }}
          className="max-w-[58ch] text-lg leading-relaxed text-mp-text-muted md:text-xl"
        >
          A partir das próximas perguntas, a gente vai entender o seu negócio
          de ponta a ponta — pra construir uma estratégia que vende, e não
          uma proposta genérica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: EASING }}
        >
          <Link href="/apresentacao" aria-label="Avançar para a apresentação">
            <PrimaryButton withArrow>Avançar</PrimaryButton>
          </Link>
        </motion.div>
      </div>
    </IntroShell>
  );
}
