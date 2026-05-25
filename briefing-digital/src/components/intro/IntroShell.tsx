"use client";

import { motion } from "framer-motion";
import { BrandMark } from "@/components/shared/BrandMark";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Casca compartilhada das telas de abertura (1, 2, 3).
 * - Fundo da paleta v2 já está no body (gradientes radiais).
 * - Logo M|P fixa no topo esquerdo (escala maior nessas telas).
 * - Conteúdo centralizado verticalmente, largura máxima 720px.
 */
export function IntroShell({ children }: Props) {
  return (
    <main className="relative flex min-h-dvh flex-col">
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="px-6 pt-6 md:px-10 md:pt-8"
      >
        <BrandMark size="md" showLabel />
      </motion.header>

      <section className="flex flex-1 items-center justify-center px-6 pb-16 md:px-10">
        <div className="w-full max-w-[720px]">{children}</div>
      </section>

      <footer className="px-6 pb-6 text-center text-xs uppercase tracking-[0.24em] text-mp-text-dim md:px-10">
        estratégia que move
      </footer>
    </main>
  );
}
