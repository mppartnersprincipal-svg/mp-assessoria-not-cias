"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type TextareaHTMLAttributes } from "react";

type Props = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange"> & {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  showCounter?: boolean;
  maxLength?: number;
};

export const LongTextInput = forwardRef<HTMLTextAreaElement, Props>(function LongText(
  { value, onChange, invalid, showCounter = true, maxLength = 1500, className, ...rest },
  ref
) {
  return (
    <div className="relative">
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        data-invalid={invalid || undefined}
        rows={5}
        maxLength={maxLength}
        className={cn(
          "block w-full resize-y rounded-xl border bg-mp-bg-elevated px-5 py-4 text-base leading-relaxed text-mp-text placeholder:text-mp-text-dim",
          "transition-[border,box-shadow] duration-200",
          "border-mp-border-soft focus:border-mp-accent focus:outline-none focus:ring-0 focus:shadow-[0_0_0_4px_rgba(255,215,0,0.12)]",
          "data-[invalid=true]:border-mp-error data-[invalid=true]:shadow-[0_0_0_4px_rgba(255,107,107,0.16)]",
          className
        )}
        {...rest}
      />
      {showCounter && (
        <div className="mt-2 text-right text-xs tabular-nums text-mp-text-dim">
          {value.length} / {maxLength}
        </div>
      )}
    </div>
  );
});
