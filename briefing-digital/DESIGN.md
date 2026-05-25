# Design System: Briefing Digital M|P Assessoria

**Origem:** identidade M|P v2 aprovada (memória `feedback-estetica-carrossel`).
**Aplicação:** projeto Next.js em `MazyOS/briefing-digital/`.

---

## 1. Atmosfera e filosofia visual

Editorial premium, "empresário pra empresário". Densidade média — respira sem ser vazio,
direto sem ser frio. A página é uma sala bem iluminada com uma janela amarela: o azul-escuro
é o ambiente, o amarelo é onde a ação acontece. Sem gradiente rosa-roxo, sem glassmorphism
de agência de Instagram, sem neon. A sensação é a de uma capa de relatório que abre como
um onboarding moderno — autoridade primeiro, charme depois.

**Mood em três palavras:** sério, vivo, premium.
**Densidade:** 55–60% de respiro em cada tela (uma pergunta por tela ajuda a respeitar isso).
**Anti-padrão:** gradient roxo→rosa do PRD original, fundo preto puro tipográfico (foi rejeitado
na primeira rodada do `/novidades-mercado`).

---

## 2. Paleta de cores e funções

| Nome descritivo | Hex | Função |
|---|---|---|
| Azul-noite M|P | `#0B1E3A` | Fundo base de toda a aplicação. |
| Azul-abismo | `#08152A` | Camada mais profunda — usada no logo box, modais sobre tudo. |
| Azul-elevado | `#122A4D` | Cards, inputs, pills outline, hover de botão outline. |
| Amarelo institucional | `#FFD700` | Toda ação primária, destaque tipográfico, progresso, pulse. |
| Amarelo profundo | `#E6BC00` | Hover do botão primário. |
| Creme respiro | `#F4EBD0` | Reservado para a tela divisora de algumas seções na fase 2. |
| Branco puro | `#FFFFFF` | Texto principal sobre azul. |
| Cinza nuvem | `#D3D8E0` | Texto de suporte, subtítulos. |
| Cinza neblina | `#8B95A8` | Texto auxiliar, contadores, "estratégia que move", indicadores. |
| Verde sucesso | `#2BD17B` | Reservado para feedback positivo (autosave, badges). |
| Vermelho corretivo | `#FF6B6B` | Erros e validações. |
| Borda âmbar 18% | `rgba(255,215,0,0.18)` | Bordas decorativas de cards e pills. |
| Borda neutra 8% | `rgba(255,255,255,0.08)` | Bordas estruturais (header, inputs sem foco). |

**Overlay de foto (fase 2 — divisores com imagem):**
`linear-gradient(180deg, rgba(11,30,58,0.55), rgba(11,30,58,0.82), rgba(8,20,40,0.95))`.

**Contraste verificado:**
- Branco sobre Azul-noite = 14.6:1 (AAA)
- Amarelo sobre Azul-noite = 8.7:1 (AAA)
- Cinza nuvem sobre Azul-noite = 11.2:1 (AAA)

---

## 3. Tipografia

**Família única:** Plus Jakarta Sans, carregada via `next/font/google` com pesos 400/500/600/700/800.

| Hierarquia | Peso | Tamanho desktop | Tamanho mobile | Tracking |
|---|---|---|---|---|
| H1 (boas-vindas, conclusão) | 800 | 60px | 36px | -0.02em |
| H2 (perguntas, divisores) | 800 | 40–48px | 28–32px | -0.015em |
| Pill / label superior | 700 | 12px | 12px | 0.18em uppercase |
| Corpo destacado | 500 | 18–20px | 16px | normal |
| Corpo padrão | 400 | 16px | 15px | normal |
| Footer / contadores | 600 | 12px | 11px | 0.12em uppercase |

Sem fontes serifadas. Sem fontes script. O par de fonte único força consistência e reduz peso de bundle.

---

## 4. Geometria e forma

- **Cantos suaves**: `--radius` 14px é o padrão pra cards, inputs e modais.
- **Cantos generosos**: `--radius-lg` 20px pra modal grande e tela de conclusão.
- **Cantos discretos**: `--radius-sm` 8px pra contadores e badges minor.
- **Pills**: `--radius-pill` 9999px para botões CTA, pills de seção, progresso e toast.
- Sem cantos pontiagudos (`rounded-none`) — a identidade rejeita.

---

## 5. Profundidade e elevação

A profundidade vem **da cor**, não de sombra. Camadas:

1. Fundo `--mp-bg` com dois gradientes radiais sutis (amarelo 6% no canto superior-esquerdo,
   azul mais claro no canto inferior-direito).
2. Cards/inputs com `--mp-bg-elevated`.
3. Modal e logo box com `--mp-bg-deep`.

Sombras existem apenas para:
- Botão amarelo: `shadow-[0_8px_24px_-8px_rgba(255,215,0,0.55)]` — glow amarelo suave.
- Logo box: sombra interna sutil + queda escura discreta pra dar peso.
- Modal de retomar: sombra ampla pra destacar do backdrop borrado.

---

## 6. Componentes

### Botão primário (`PrimaryButton`)
- Fundo amarelo institucional, texto `#08152A` em peso 700.
- Pill (`rounded-pill`).
- Hover: amarelo profundo + translação vertical sutil (-1px) + ícone da seta translada 4px à direita.
- Tap: scale 0.97.
- Disabled: opacidade 50%, cursor not-allowed.
- Variante `outline`: fundo transparente, borda âmbar 18%, texto branco; no hover muda pra borda amarela + texto amarelo.

### Inputs (`ShortText`, `LongText`)
- Fundo `--mp-bg-elevated`, padding generoso (px-5 py-4), texto 16–18px.
- Borda repouso: `--mp-border-soft` (branco 8%).
- Borda foco: amarelo + halo amarelo 12% raio 4px.
- Borda erro: vermelho + halo vermelho 16%.
- Sem placeholders cinzas escuros que somem — sempre `--mp-text-dim` legível.

### Cartões de escolha única (`SingleChoiceInput`)
- Card pill-suave com 14px de raio, borda `--mp-border-soft` no repouso.
- Selecionado: borda amarela + halo amarelo 18% raio 3px + pseudo-radio amarelo com check preto.
- Hover não-selecionado: borda muda pra amarela (sem halo).

### Pills (selectores de rede social, badge de seção, toast)
- Pill (`rounded-pill`), padding `px-4 py-2`.
- Ativa: fundo amarelo + texto azul-abismo + check à direita.
- Inativa: borda 8% branco + texto cinza nuvem; hover vira amarelo na borda e branco no texto.

### Barra de progresso
- Track `--mp-bg-elevated`, altura 6px, pill.
- Preenchimento amarelo com animação suave (`cubic-bezier(0.22,1,0.36,1)`).
- Contador à direita "X / N", tabular-nums, peso 600.

### Modal de retomar (`ResumePrompt`)
- Backdrop `var(--mp-bg-deep)/80` com `backdrop-blur`.
- Modal: cantos 20px, borda âmbar 18%, fundo `--mp-bg-elevated`, sombra ampla escura.
- Mobile: ancorado embaixo (slide-up). Desktop: centralizado.

### Toast de autosave
- Fixed bottom-right (mobile sobe 24 acima do footer pra não cobrir botão Continuar).
- Pill, borda âmbar, ícone check amarelo, texto branco.
- Vida útil: 1.6s.

---

## 7. Layout e princípios

- **Mobile-first**: tudo testado em 390x844 antes do desktop.
- **Largura máxima do conteúdo**: 720px nas telas de pergunta e abertura; 1080px no header.
- **Padding lateral**: 20px mobile, 40px desktop.
- **Uma pergunta por tela**: sempre uma única decisão visível.
- **Hierarquia em 3 níveis**: pill superior (contexto) → headline (a pergunta) → suporte (help text).
- **Footer**: sticky no briefing (botões), texto rodapé fixo nas telas de abertura.

---

## 8. Movimento

**Easing único:** `cubic-bezier(0.22, 1, 0.36, 1)` — variável `--mp-easing`.

| Animação | Duração | Notas |
|---|---|---|
| Text reveal por palavra (boas-vindas) | 600ms com stagger 80ms | Cortado em `prefers-reduced-motion`. |
| Slide-x entre perguntas | 350ms | `AnimatePresence mode="wait"` no Framer Motion. |
| Hover do botão primário | 200ms | y: -1, sem scale no hover. |
| Tap | 200ms | scale 0.97. |
| Pulse do botão "Sim, vamos lá" | 2.4s infinito | Apenas em motion-OK. |
| Toast autosave | 250ms enter, 200ms exit | Visível por 1.6s. |
| Shake de erro | 380ms | Movimento horizontal 6px. |

`prefers-reduced-motion`: globalmente fica 120ms para transitions; stagger e pulse são desligados.

---

## 9. Acessibilidade

- Foco visível: `outline: 2px solid var(--mp-accent); outline-offset: 3px`.
- Todo botão de ícone tem `aria-label`.
- `aria-progressbar` no progresso, `aria-live="polite"` no toast, `aria-modal` no ResumePrompt.
- Hierarquia `<h1>/<h2>` semântica em todas as telas.
- Tab order: voltar → input → continuar.
- Enter avança (exceto dentro de textarea).
