---
name: novidades-mercado
description: >
  Cura novidades de mercado digital (ads, Meta, Google, marketing) e de IA (lançamentos,
  casos de uso em negócio), filtra pelo perfil de público-alvo da M|P (donos de empresa
  estabelecida) e transforma em 2-3 posts da semana (mix de carrossel e estático),
  já no ângulo "empresário pra empresário". Delega a renderização visual pra skill
  `/carrossel`. Use quando o usuário pedir "novidades da semana", "novidades do mercado",
  "pauta da semana", "carrossel de notícias", "novidades de IA", ou /novidades-mercado.
---

# /novidades-mercado — Pauta semanal de novidades

Pipeline curatorial. Pega o ruído do mercado digital e da IA, filtra pelo que importa pro dono de empresa estabelecida, traduz pra ângulo M|P, e entrega 2-3 conteúdos prontos pra postar. Mão livre — não enche o usuário de pergunta a cada passo.

## Dependências

- `_memoria/empresa.md` — quem é a M|P e quem ela atende (LER antes de filtrar)
- `_memoria/preferencias.md` — tom "empresário pra empresário", o que evitar
- `identidade/design-guide.md` — paleta, tipografia, regras visuais
- Skill `/carrossel` — usada pra renderizar HTML+PNG de qualquer formato (carrossel ou estático)
- **WebSearch** — pra buscar novidades reais e datadas (usar SEMPRE; nunca inventar notícia)
- Output em: `marketing/conteudo/novidades-<YYYY-MM-DD>/`

---

## Configuração padrão (decidida no /instalar)

- **Volume:** 2 a 3 posts por rodada (não 1, não 5)
- **Formato:** decidir por conteúdo — carrossel pra notícia complexa, estático pra dado/manchete forte
- **Aprovação:** mão livre — buscar, escolher, gerar tudo. Usuário revisa o resultado final
- **Janela:** novidades dos últimos 7 dias por padrão (ajustável se o usuário pedir)

---

## Workflow

### Passo 1 — Definir janela e tema

1. Janela padrão: últimos 7 dias. Se o usuário deu período diferente, usar.
2. Eixos a cobrir (escolher 2-3 de eixos diferentes, não 3 do mesmo):
   - **Mídia paga** — Meta Ads, Google Ads, TikTok Ads, mudança de algoritmo/política
   - **CRM & comercial** — Kommo, WhatsApp Business, automação de vendas, IA aplicada a SDR/closer
   - **IA aplicada a negócio** — lançamento de modelo (Claude, GPT, Gemini), feature nova com aplicação prática em PME
   - **Mercado brasileiro de marketing/vendas** — pesquisa, dado de setor, mudança regulatória
   - **Cases de empresas brasileiras** — números reais, especialmente em nichos M|P (distribuição, materiais de construção, varejo especializado, serviços de alto ticket)

### Passo 2 — Buscar (WebSearch)

**Obrigatório usar WebSearch — nunca inventar notícia, citar fonte, ou supor data.**

Buscas sugeridas (variar termos a cada execução pra não repetir):

- `Meta Ads atualização <mês atual> <ano>`
- `Google Ads novidade <mês atual> <ano>`
- `Anthropic OpenAI lançamento <mês atual> <ano>`
- `inteligência artificial pequenas empresas brasil <mês atual>`
- `marketing digital novidade <mês atual> <ano>`
- `WhatsApp Business novidade <mês atual> <ano>`
- `CRM vendas brasil novidade <ano>`

Trazer 8-15 candidatas brutas com **título, fonte, data, URL** e resumo de 1-2 frases.

### Passo 3 — Pontuar (filtro M|P)

Pra cada candidata, atribuir nota 0-10 pelos 5 critérios abaixo (somar):

| Critério | Peso | Pergunta |
|---|---|---|
| **Implicação prática** | 0-3 | Muda algo concreto na operação de um cliente M|P (custo de lead, conversão, processo, ROI)? |
| **Aderência ao público** | 0-2 | Faz sentido pra dono de empresa estabelecida (não pra dev, researcher ou agência de Insta)? |
| **Dado concreto** | 0-2 | Tem número, % ou caso pra citar (não é só opinião)? |
| **Reforço de posicionamento M|P** | 0-2 | Reforça "dados > opinião", "processo > improviso", "controle > improviso"? |
| **Atualidade real** | 0-1 | Data dos últimos 7 dias (mais recente > mais relevante)? |

**Descartar (nota direta = 0) se:**
- É hype puro de Big Tech sem aplicação em PME
- É release técnico que só interessa dev (API, SDK, prompt engineering)
- É "tendência" sem dado / "futurismo" sem caso
- Não tem fonte confiável ou data verificável
- Já circulou pesado há mais de 10 dias

Ordenar por nota desc.

### Passo 4 — Selecionar 2-3 finais

Escolher as 2-3 melhores **garantindo diversidade de eixo** (não pegar 3 sobre Meta Ads). Se a melhor for muito boa (nota 9+), pode ser o destaque da rodada.

### Passo 5 — Decidir formato pra cada

Critério de formato:

- **CARROSSEL (5-8 slides)** se a novidade exige:
  - Explicar o que mudou + por que importa + o que fazer
  - Listar 3+ implicações
  - Comparar antes vs depois
  - Mostrar passo a passo

- **ESTÁTICO (post único)** se a novidade cabe em:
  - Um número/dado de impacto ("Meta Ads ficou 18% mais caro em 2026 — fonte X")
  - Uma manchete forte com 1-2 frases de payoff
  - Uma citação ou afirmação que provoca o empresário

Se tiver 3 escolhidas: ideal é **2 carrosséis + 1 estático** ou **1 carrossel + 2 estáticos**. Não fazer 3 carrosséis (cansa o feed) nem 3 estáticos (perde profundidade).

### Passo 6 — Ângulo M|P pra cada

**Tradução é o coração da skill.** Não é repassar a notícia — é responder *"o que isso muda pro teu negócio?"*.

Pra cada uma, definir:

1. **Gancho (slide 1 / headline):** pergunta ou afirmação que pega o dono pela atenção. Não cita a notícia direto — cita a **consequência**.
   - ❌ "OpenAI lança GPT-5"
   - ✅ "Seu concorrente já está respondendo lead 24h por dia com IA. E você?"

2. **Contexto (slides 2-3 / sub):** o que mudou no mundo, com **fonte e data**. Dado real, não adjetivo.

3. **Implicação pra empresa estabelecida (slides 4-5):** 2-3 consequências práticas — em custo de lead, em processo comercial, em prazo, em risco de ficar pra trás.

4. **Movimento M|P (slide 6 / CTA):** o que a M|P faz sobre isso (sem ser propaganda chapada — conectar com o pilar que cabe: Tráfego, Comercial ou Produção). CTA pra link da bio / WhatsApp.

5. **Tom:** seguir [_memoria/preferencias.md](../../../_memoria/preferencias.md) à risca. Sem "boto fé", sem "pode crer", sem emoji decorativo, sem "alavancar/destravar".

### Passo 7 — Gerar conteúdo

Pra cada peça selecionada, chamar o fluxo do `/carrossel` com o tipo definido no Passo 5. A skill `/carrossel` já cuida de:

- Aplicar identidade visual (preto/amarelo/branco — design-guide.md)
- Renderizar HTML + PNG 1080x1350
- Gerar legenda automaticamente

**Importante:** passar pra `/carrossel` o **texto já pronto** de cada slide (gancho, contexto, implicações, CTA) e a referência à fonte + data. O `/carrossel` não vai pesquisar — só renderizar.

### Passo 8 — Organizar saída

Salvar tudo em uma única pasta da rodada:

```
marketing/conteudo/novidades-<YYYY-MM-DD>/
  fontes.md                      ← lista de TODAS as candidatas + notas + URLs (auditoria)
  pauta.md                       ← as 2-3 selecionadas + ângulo M|P resumido
  01-<slug-da-noticia>/          ← uma pasta por peça
    texto.md
    carrossel.html  (ou estatico.html)
    render.js
    instagram/
      slide-01.png → slide-NN.png
    legenda.md
  02-<slug-da-noticia>/
    ...
  03-<slug-da-noticia>/ (se houver)
    ...
```

`fontes.md` é importante: registra o que foi descartado e por quê. Serve pra você auditar o filtro e calibrar com o tempo.

### Passo 9 — Entregar

Mostrar pro usuário:

```
Rodada de <data> — 3 peças geradas:

1. [CARROSSEL] <título>
   Fonte: <fonte> (<data>)
   Pasta: marketing/conteudo/novidades-<data>/01-<slug>/
   Capa: <caminho da slide-01.png>

2. [ESTÁTICO] <título>
   Fonte: ...
   ...

3. [CARROSSEL] ...

Auditoria do filtro: marketing/conteudo/novidades-<data>/fontes.md (15 candidatas, 12 descartadas)

Tudo pronto pra postar. Quer ajustar texto, foto ou ângulo de alguma?
```

---

## Regras

- **SEMPRE usar WebSearch** — nunca inventar notícia, fonte ou data. Se uma busca não trouxer nada relevante, fazer outra com termo diferente; se mesmo assim não vier, reportar honestamente em vez de fabricar.
- **SEMPRE citar fonte + data** dentro do próprio conteúdo (mesmo na legenda) — credibilidade é a moeda do posicionamento M|P
- **NÃO criar conteúdo só sobre Big Tech (OpenAI, Meta, Google) sem implicação prática** — se a notícia não muda nada concreto na rotina do dono, descartar
- **NÃO repetir eixo na mesma rodada** — se uma é sobre Meta Ads, as outras 2 são de outros eixos
- **NÃO usar gírias, "pode crer", "boto fé", emoji em headline séria** (ver preferencias.md)
- **NÃO publicar carrossel com mais de 8 slides ou menos de 5** — sweet spot do formato
- **Mão livre, mas auditável:** geração roda sem aprovação intermediária, mas TUDO fica registrado em `fontes.md` + `pauta.md` pro usuário rastrear depois
- Quando o tema da rodada for muito denso (regulação, mudança grande de algoritmo), priorizar carrossel completo. Quando for dado isolado de impacto, priorizar estático.
- Após gerar, sugerir abertura no Explorer/Finder da pasta da rodada e oferecer transformar uma das peças em artigo de blog via `/publicar-tema` (se a skill existir).
