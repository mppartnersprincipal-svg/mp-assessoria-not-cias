import { z } from "zod";
import type { Question } from "./questions";

export type CidadeEstado = { cidade: string; estado: string };
export type RedeSocial = {
  network: "instagram" | "tiktok" | "youtube" | "linkedin" | "facebook";
  url: string;
};

const REDES_VALIDAS = ["instagram", "tiktok", "youtube", "linkedin", "facebook"] as const;

function onlyDigits(input: string): string {
  return input.replace(/\D/g, "");
}

export function formatCnpj(raw: string): string {
  const digits = onlyDigits(raw).slice(0, 14);
  const parts = [
    digits.slice(0, 2),
    digits.slice(2, 5),
    digits.slice(5, 8),
    digits.slice(8, 12),
    digits.slice(12, 14),
  ];
  let out = parts[0];
  if (parts[1]) out += "." + parts[1];
  if (parts[2]) out += "." + parts[2];
  if (parts[3]) out += "/" + parts[3];
  if (parts[4]) out += "-" + parts[4];
  return out;
}

/**
 * Validação básica de CNPJ — verifica os 2 dígitos verificadores.
 * Não detecta blacklist (todos os dígitos iguais já é coberto).
 */
export function isValidCnpj(input: string): boolean {
  const cnpj = onlyDigits(input);
  if (cnpj.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpj)) return false;

  const calcDigit = (slice: string, weights: number[]): number => {
    const sum = slice.split("").reduce((acc, ch, i) => acc + Number(ch) * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const d1 = calcDigit(cnpj.slice(0, 12), w1);
  const d2 = calcDigit(cnpj.slice(0, 12) + String(d1), w2);
  return d1 === Number(cnpj[12]) && d2 === Number(cnpj[13]);
}

const optionalUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (v) => v === "" || /^https?:\/\/\S+\.\S+/.test(v),
    "Coloca a URL completa, começando com http:// ou https://."
  )
  .optional()
  .or(z.literal(""));

const cidadeEstadoSchema = z
  .object({
    cidade: z.string().trim().min(2, "Diz a cidade."),
    estado: z
      .string()
      .trim()
      .length(2, "Estado em 2 letras, ex: SP.")
      .regex(/^[A-Za-z]{2}$/, "Apenas letras."),
  })
  .transform((v) => ({ ...v, estado: v.estado.toUpperCase() }));

const redesSociaisSchema = z
  .array(
    z.object({
      network: z.enum(REDES_VALIDAS),
      url: z
        .string()
        .trim()
        .min(1, "Cola o link da rede.")
        .refine((v) => /^https?:\/\/\S+/.test(v), "URL precisa começar com http:// ou https://."),
    })
  )
  .optional();

export function getValidator(question: Question): z.ZodTypeAny {
  switch (question.type) {
    case "short-text":
      return question.required
        ? z.string().trim().min(2, "Precisa de pelo menos 2 caracteres.").max(question.maxLength ?? 200)
        : z.string().trim().max(question.maxLength ?? 200).optional().or(z.literal(""));

    case "long-text":
      return question.required
        ? z.string().trim().min(10, "Conta um pouco mais — pelo menos 10 caracteres.").max(question.maxLength ?? 1500)
        : z.string().trim().max(question.maxLength ?? 1500).optional().or(z.literal(""));

    case "url":
      return optionalUrl;

    case "phone":
      return z
        .string()
        .trim()
        .refine((v) => v === "" || /^\+?\d[\d\s().-]{8,}$/.test(v), "Telefone inválido.")
        .optional()
        .or(z.literal(""));

    case "cnpj":
      return question.required
        ? z.string().refine((v) => isValidCnpj(v), "CNPJ inválido — confere os dígitos.")
        : z
            .string()
            .refine((v) => v === "" || isValidCnpj(v), "CNPJ inválido — ou deixa em branco.")
            .optional()
            .or(z.literal(""));

    case "cidade-estado":
      return cidadeEstadoSchema;

    case "single-choice":
      return question.required
        ? z.string().min(1, "Escolhe uma das opções.")
        : z.string().optional().or(z.literal(""));

    case "multi-choice":
      return question.required
        ? z.array(z.string()).min(1, "Marca pelo menos uma opção.")
        : z.array(z.string()).optional();

    case "redes-sociais":
      return redesSociaisSchema;

    case "stub":
    default:
      return z.unknown().optional();
  }
}
