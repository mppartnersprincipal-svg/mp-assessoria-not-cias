"use client";

import { ShortTextInput } from "./ShortText";
import { formatCnpj } from "@/lib/schema";

type Props = {
  value: string;
  onChange: (v: string) => void;
  invalid?: boolean;
  placeholder?: string;
};

export function CNPJInput({ value, onChange, invalid, placeholder }: Props) {
  return (
    <ShortTextInput
      inputMode="numeric"
      autoComplete="off"
      maxLength={18}
      placeholder={placeholder ?? "00.000.000/0000-00"}
      value={formatCnpj(value)}
      invalid={invalid}
      onChange={(v) => onChange(formatCnpj(v))}
    />
  );
}
