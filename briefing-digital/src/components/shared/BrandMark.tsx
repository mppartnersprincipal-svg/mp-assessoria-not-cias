import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const SIZES: Record<Size, { box: number; font: number; radius: number; gap: number; label: number }> = {
  sm: { box: 36, font: 16, radius: 9, gap: 10, label: 11 },
  md: { box: 58, font: 26, radius: 14, gap: 14, label: 13 },
  lg: { box: 92, font: 42, radius: 22, gap: 22, label: 17 },
};

type Props = {
  size?: Size;
  showLabel?: boolean;
  className?: string;
};

/**
 * Logo M|P — caixa azul-escuro com "M" branco + pipe amarelo + "P" branco.
 * Replica o padrão da paleta v2 dos carrosséis aprovados.
 */
export function BrandMark({ size = "md", showLabel = true, className }: Props) {
  const s = SIZES[size];

  return (
    <div className={cn("flex items-center", className)} style={{ gap: s.gap }}>
      <div
        aria-hidden="true"
        className="flex items-center justify-center font-extrabold leading-none"
        style={{
          width: s.box,
          height: s.box,
          background: "var(--mp-bg-deep)",
          borderRadius: s.radius,
          color: "var(--mp-text)",
          fontSize: s.font,
          letterSpacing: "-0.02em",
          boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 6px 18px rgba(0,0,0,0.35)",
        }}
      >
        <span>M</span>
        <span
          style={{
            color: "var(--mp-accent)",
            margin: `0 ${s.font * 0.08}px`,
            fontWeight: 800,
          }}
        >
          |
        </span>
        <span>P</span>
      </div>

      {showLabel && (
        <div
          className="flex items-center font-semibold tracking-[0.18em] uppercase select-none"
          style={{ color: "var(--mp-text)", fontSize: s.label, gap: s.label * 0.5 }}
          aria-label="M|P Assessoria"
        >
          <span>M</span>
          <span style={{ color: "var(--mp-accent)" }}>|</span>
          <span>P Assessoria</span>
        </div>
      )}
    </div>
  );
}
