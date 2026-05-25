"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Choice } from "@/lib/questions";

type Props = {
  choices: Choice[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  invalid?: boolean;
};

export function SingleChoiceInput({ choices, value, onChange, name, invalid }: Props) {
  return (
    <ul
      className="flex flex-col gap-3"
      role="radiogroup"
      data-invalid={invalid || undefined}
      aria-invalid={invalid || undefined}
    >
      {choices.map((c) => {
        const selected = c.value === value;
        const id = `${name}-${c.value}`;
        return (
          <li key={c.value}>
            <label
              htmlFor={id}
              className={cn(
                "group flex cursor-pointer items-center gap-4 rounded-xl border bg-mp-bg-elevated/60 px-5 py-4 transition-all duration-200",
                "hover:border-mp-accent hover:bg-mp-bg-elevated",
                selected
                  ? "border-mp-accent bg-mp-bg-elevated shadow-[0_0_0_3px_rgba(255,215,0,0.18)]"
                  : "border-mp-border-soft"
              )}
            >
              <input
                id={id}
                type="radio"
                name={name}
                value={c.value}
                checked={selected}
                onChange={() => onChange(c.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                  selected
                    ? "border-mp-accent bg-mp-accent text-mp-bg-deep"
                    : "border-mp-text-dim/50 group-hover:border-mp-accent"
                )}
              >
                {selected && <Check size={14} strokeWidth={3} />}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-base font-semibold leading-tight">{c.label}</span>
                {c.description && (
                  <span className="text-sm text-mp-text-muted">{c.description}</span>
                )}
              </div>
            </label>
          </li>
        );
      })}
    </ul>
  );
}
