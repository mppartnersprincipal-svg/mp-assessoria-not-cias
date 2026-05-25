"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Clock, Save } from "lucide-react";
import { IntroShell } from "@/components/intro/IntroShell";
import { PrimaryButton } from "@/components/shared/PrimaryButton";

const EASING = [0.22, 1, 0.36, 1] as const;

export default function IniciarPage() {
  const reduce = useReducedMotion();

  return (
    <IntroShell>
      <div className="flex flex-col items-start gap-12">
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASING }}
          className="text-balance text-4xl font-extrabold leading-[1.05] tracking-tight md:text-7xl"
        >
          Podemos <span className="text-mp-accent">começar?</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: EASING }}
          className="flex flex-col items-start gap-4"
        >
          <motion.div
            animate={
              reduce
                ? undefined
                : { boxShadow: ["0 0 0 0 rgba(255,215,0,0.4)", "0 0 0 18px rgba(255,215,0,0)"] }
            }
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
            className="rounded-pill"
          >
            <Link href="/briefing/0" aria-label="Iniciar o briefing">
              <PrimaryButton withArrow className="px-9 py-4 text-lg">
                Sim, vamos lá!
              </PrimaryButton>
            </Link>
          </motion.div>

          <ul className="flex flex-col gap-2 pl-1 text-sm text-mp-text-muted md:flex-row md:items-center md:gap-6">
            <li className="inline-flex items-center gap-2">
              <Clock size={15} strokeWidth={2.2} aria-hidden="true" className="text-mp-accent" />
              Leva cerca de 15 minutos
            </li>
            <li className="inline-flex items-center gap-2">
              <Save size={15} strokeWidth={2.2} aria-hidden="true" className="text-mp-accent" />
              Salvamos suas respostas automaticamente
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASING }}
        >
          <Link
            href="/apresentacao"
            className="text-sm font-medium text-mp-text-dim transition-colors hover:text-mp-text-muted underline-offset-4 hover:underline"
          >
            ← Voltar
          </Link>
        </motion.div>
      </div>
    </IntroShell>
  );
}
