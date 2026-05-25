"use client";

import { ShortTextInput } from "./ShortText";
import type { CidadeEstado } from "@/lib/schema";

type Props = {
  value: CidadeEstado | undefined;
  onChange: (v: CidadeEstado) => void;
  invalidCidade?: boolean;
  invalidEstado?: boolean;
};

export function CidadeEstadoInput({ value, onChange, invalidCidade, invalidEstado }: Props) {
  const cidade = value?.cidade ?? "";
  const estado = value?.estado ?? "";

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_140px]">
      <div className="flex flex-col gap-2">
        <label htmlFor="cidade" className="text-xs font-semibold uppercase tracking-wider text-mp-text-dim">
          Cidade
        </label>
        <ShortTextInput
          id="cidade"
          value={cidade}
          invalid={invalidCidade}
          placeholder="Ex: São Paulo"
          onChange={(v) => onChange({ cidade: v, estado })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="estado" className="text-xs font-semibold uppercase tracking-wider text-mp-text-dim">
          Estado (UF)
        </label>
        <ShortTextInput
          id="estado"
          value={estado}
          invalid={invalidEstado}
          maxLength={2}
          placeholder="SP"
          autoCapitalize="characters"
          className="uppercase"
          onChange={(v) => onChange({ cidade, estado: v.toUpperCase() })}
        />
      </div>
    </div>
  );
}
