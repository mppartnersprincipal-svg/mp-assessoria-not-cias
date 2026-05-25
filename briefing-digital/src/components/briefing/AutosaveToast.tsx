"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { useBriefingStore } from "@/lib/store";

export function AutosaveToast() {
  const trigger = useBriefingStore((s) => s.toastVisibleAt);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setShow(true);
    const t = setTimeout(() => setShow(false), 1600);
    return () => clearTimeout(t);
  }, [trigger]);

  return (
    <div className="pointer-events-none fixed bottom-24 right-6 z-50 md:bottom-6">
      <AnimatePresence>
        {show && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            role="status"
            aria-live="polite"
            className="pointer-events-auto flex items-center gap-2 rounded-pill border border-mp-border bg-mp-bg-deep/95 px-4 py-2 text-sm font-medium text-mp-text shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <Check size={16} strokeWidth={2.5} className="text-mp-accent" />
            Salvo automaticamente
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
