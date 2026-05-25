"use client";

import { Instagram, Linkedin, Facebook, Youtube, Music2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShortTextInput } from "./ShortText";
import type { RedeSocial } from "@/lib/schema";

type Network = RedeSocial["network"];

const NETWORKS: { value: Network; label: string; icon: typeof Instagram; placeholder: string }[] = [
  { value: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/seuperfil" },
  { value: "tiktok", label: "TikTok", icon: Music2, placeholder: "https://tiktok.com/@seuperfil" },
  { value: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@seucanal" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/..." },
  { value: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/suapagina" },
];

type Props = {
  value: RedeSocial[];
  onChange: (v: RedeSocial[]) => void;
  invalidNetworks?: Set<Network>;
};

export function RedesSociaisInput({ value, onChange, invalidNetworks }: Props) {
  const selectedMap = new Map(value.map((r) => [r.network, r.url]));

  function toggle(network: Network) {
    if (selectedMap.has(network)) {
      onChange(value.filter((r) => r.network !== network));
    } else {
      onChange([...value, { network, url: "" }]);
    }
  }

  function updateUrl(network: Network, url: string) {
    onChange(value.map((r) => (r.network === network ? { ...r, url } : r)));
  }

  return (
    <div className="flex flex-col gap-5">
      <ul className="flex flex-wrap gap-2">
        {NETWORKS.map(({ value: n, label, icon: Icon }) => {
          const active = selectedMap.has(n);
          return (
            <li key={n}>
              <button
                type="button"
                onClick={() => toggle(n)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-pill border px-4 py-2 text-sm font-semibold transition-all duration-200",
                  active
                    ? "border-mp-accent bg-mp-accent text-mp-bg-deep"
                    : "border-mp-border-soft text-mp-text-muted hover:border-mp-accent hover:text-mp-text"
                )}
              >
                <Icon size={15} strokeWidth={2.2} />
                {label}
                {active && <Check size={14} strokeWidth={3} className="ml-0.5" />}
              </button>
            </li>
          );
        })}
      </ul>

      {value.length > 0 && (
        <ul className="flex flex-col gap-3">
          {value.map((r) => {
            const meta = NETWORKS.find((n) => n.value === r.network);
            if (!meta) return null;
            const Icon = meta.icon;
            const invalid = invalidNetworks?.has(r.network);
            return (
              <li key={r.network} className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className="grid size-11 shrink-0 place-items-center rounded-xl bg-mp-bg-elevated text-mp-accent"
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <ShortTextInput
                  inputMode="url"
                  autoComplete="off"
                  placeholder={meta.placeholder}
                  value={r.url}
                  invalid={invalid}
                  onChange={(v) => updateUrl(r.network, v)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export { NETWORKS as REDES_NETWORKS };
