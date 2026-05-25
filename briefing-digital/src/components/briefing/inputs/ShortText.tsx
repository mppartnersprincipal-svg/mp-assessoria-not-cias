"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type InputHTMLAttributes } from "react";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> & {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
};

export const ShortTextInput = forwardRef<HTMLInputElement, Props>(function ShortText(
  { value, onChange, invalid, className, ...rest },
  ref
) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      data-invalid={invalid || undefined}
      className={cn(
        "w-full rounded-xl border bg-mp-bg-elevated px-5 py-4 text-lg leading-snug text-mp-text placeholder:text-mp-text-dim",
        "transition-[border,box-shadow] duration-200",
        "border-mp-border-soft focus:border-mp-accent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]",
        "data-[invalid=true]:border-mp-error data-[invalid=true]:shadow-[0_0_0_4px_rgba(255,107,107,0.16)]",
        className
      )}
      {...rest}
    />
  );
});
