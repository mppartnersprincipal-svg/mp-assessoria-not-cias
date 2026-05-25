"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "outline";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  withArrow?: boolean;
  loading?: boolean;
  children: ReactNode;
};

export const PrimaryButton = forwardRef<HTMLButtonElement, Props>(function PrimaryButton(
  { variant = "primary", withArrow = false, loading = false, className, children, disabled, ...rest },
  ref
) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || loading ? 1 : 0.97 }}
      whileHover={disabled || loading ? undefined : { y: -1 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      disabled={disabled || loading}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3.5 text-base font-bold tracking-tight",
        "transition-[background,color,box-shadow,border] duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isPrimary
          ? "bg-mp-accent text-mp-bg-deep hover:bg-mp-accent-deep shadow-[0_8px_24px_-8px_rgba(255,215,0,0.55)]"
          : "border border-mp-border bg-transparent text-mp-text hover:border-mp-accent hover:text-mp-accent",
        className
      )}
      {...(rest as Record<string, unknown>)}
    >
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          size={18}
          strokeWidth={2.5}
          className="transition-transform duration-200 group-hover:translate-x-1"
        />
      )}
    </motion.button>
  );
});
