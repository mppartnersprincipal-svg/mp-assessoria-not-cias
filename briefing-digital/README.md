# Briefing Digital — M|P Assessoria

MVP navegável do briefing de onboarding de novos clientes da M|P Assessoria Digital.
Substitui o formulário estático atual por uma jornada uma-pergunta-por-tela estilo Typeform,
com salvamento automático e identidade visual M|P v2 (azul-escuro + amarelo + Plus Jakarta Sans).

> Plano completo de implementação em `C:\Users\User\.claude\plans\prd-briefing-crispy-boole.md`.
> Tokens de design e racional em [DESIGN.md](./DESIGN.md).

## Status (MVP — fase 1)

Pronto:
- Telas 1, 2 e 3 (boas-vindas, apresentação, convite) com animação premium e reduced-motion.
- Motor de perguntas dinâmico (`/briefing/[step]`) com transição slide-x.
- Header sticky com logo + barra de progresso + contador.
- Salvamento automático em `localStorage` com debounce e modal "Continuar de onde parou?".
- Seção 1 (Identificação da empresa, 8 perguntas) funcional com validação Zod.
- Inputs: texto curto, texto longo, escolha única, URL, CNPJ (com máscara + dígito verificador),
  cidade+estado, redes sociais (multi com URLs).
- Tela de conclusão (placeholder para fase 2).

Fase 2 (próxima entrega):
- Inputs faltantes: ranking, escala 1–5, upload de arquivo, data, faixa de moeda.
- Popular `questions.ts` com as 76 perguntas restantes (seções 2–15).
- Geração de PDF (`@react-pdf/renderer`) com identidade M|P.
- Envio por e-mail (Resend) com PDF anexado.
- Tela de sucesso com confetti.
- Persistir respostas em `MazyOS/dados/briefings/<cliente>/`.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 com CSS vars + tokens M|P
- Framer Motion para animação
- React Hook Form (futuro) + Zod para validação
- Zustand para estado global do briefing
- Plus Jakarta Sans via `next/font/google`

## Rodar localmente

```bash
cd MazyOS/briefing-digital
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Verificação manual

1. Telas 1 → 2 → 3 navegam com animação suave (mobile + desktop).
2. "Sim, vamos lá!" → `/briefing/0`.
3. Cada pergunta da Seção 1: tentar avançar sem preencher dispara shake + mensagem amigável.
4. CNPJ aceita só formato válido (testar `00.000.000/0000-00` vs sequência aleatória).
5. URL aceita vazio ou começa com `http(s)://`.
6. "Voltar" preserva resposta.
7. Toast "Salvo automaticamente" aparece após cada Continuar.
8. Fechar aba, reabrir `/briefing/0` → modal "Continuar de onde parou?".
9. DevTools → Rendering → `prefers-reduced-motion: reduce` → sem stagger e sem pulse.
10. Teclado-only (Tab + Enter): percorre tudo sem mouse, foco visível.

## Estrutura

```
src/
├── app/
│   ├── layout.tsx                Plus Jakarta + metadata
│   ├── page.tsx                  Tela 1 — Boas-vindas
│   ├── apresentacao/page.tsx     Tela 2
│   ├── iniciar/page.tsx          Tela 3
│   └── briefing/
│       ├── layout.tsx            Header + Resume + Toast
│       ├── page.tsx              redirect → /briefing/0
│       ├── [step]/page.tsx       Motor dinâmico
│       └── concluido/page.tsx    Placeholder de fim
├── components/
│   ├── shared/
│   │   ├── BrandMark.tsx         Logo M|P
│   │   └── PrimaryButton.tsx
│   ├── intro/
│   │   └── IntroShell.tsx        Casca das telas 1–3
│   └── briefing/
│       ├── BriefingHeader.tsx
│       ├── ProgressBar.tsx
│       ├── AutosaveToast.tsx
│       ├── QuestionFrame.tsx     Orquestrador
│       ├── ResumePrompt.tsx
│       ├── SectionDivider.tsx
│       └── inputs/               6 tipos do MVP
├── lib/
│   ├── questions.ts              Catálogo das 84 perguntas (Seção 1 funcional, 2–15 stub)
│   ├── schema.ts                 Validadores Zod + CNPJ + máscara
│   ├── store.ts                  Zustand
│   ├── storage.ts                localStorage debounced
│   └── utils.ts                  cn()
└── styles/
    └── globals.css               CSS vars M|P v2 + reset
```
