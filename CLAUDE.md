# M|P Assessoria — MazyOS

> Sistema operacional da M|P Assessoria Digital — assessoria especialista
> em marketing e vendas com foco em performance. Cada setor tem sua área,
> com processos, entregas e documentos. O Claude lê esse arquivo antes
> de cada conversa pra calibrar contexto, tom e prioridades.

---

## O que é esse workspace

Operação da M|P. Aqui ficam marca, conteúdo, materiais comerciais, dados
de campanha, briefings de cliente, projetos transversais e tudo que o
sistema gera em nome da empresa.

**Estrutura de pastas:**

- `_memoria/` — quem é a empresa, como falamos, foco atual
  - `empresa.md` — contexto do negócio, equipe, clientes, ferramentas
  - `preferencias.md` — tom de voz, estilo, o que evitar
  - `estrategia.md` — gargalo, prioridades, candidatas a virar skill
- `identidade/` — marca aplicada em tudo que o sistema gera
  - `design-guide.md` — paleta, tipografia, regras visuais
  - `logos/` — variações da logo M|P
- `marketing/` — campanhas, criativos, conteúdo orgânico, mídia paga
- `dados/` — relatórios de ads, métricas de cliente, planilhas a analisar
- `templates/` — moldes reutilizáveis (perfis, skills, ferramentas, identidade)
- `scripts/` — automações pontuais
- `saidas/` — documentos pontuais (PDFs gerados, exportações)
- `.claude/skills/` — skills locais da M|P

> Setores adicionais (`comercial/`, `financeiro/`, `rh/`, `operacoes/`,
> `projetos/`) podem ser criados sob demanda quando começarem a gerar
> documentos próprios. Não criar pasta vazia — só quando tiver conteúdo.

---

## Sobre a empresa

A M|P Assessoria é uma **assessoria de marketing e vendas com foco em
performance** — atendemos donos de empresa estabelecida (R$50k+/mês de
faturamento, ou R$30k em nichos como materiais de construção) em
distribuição, indústria, varejo especializado e serviços de alto ticket.

Somos **2 sócios (irmãos gêmeos) + 4 fixos** (editora/designer, gestor
de tráfego, 2 filmmakers) + SDR contratada recentemente. Já atendemos
mais de 150 empresas.

**Posicionamento:** empresário pra empresário. *"Beleza não põe mesa.
O que sustenta uma empresa é venda."*

**Os 3 pilares de entrega (indivisíveis):**
1. Produção Profissional (Branding) — estrutura de cinema no cliente
2. Tráfego de Alta Performance — Meta + Google Ads com foco em ROI
3. Assessoria Comercial (Conversão, maior diferencial) — auditoria,
   CRM Kommo, treinamento de equipe, processo SDR/Closer

---

## Setores e responsáveis

- **Sócio 1 (usuário):** estratégia, direção geral, voz pública da marca
- **Sócio 2 (irmão gêmeo):** comercial / closer das reuniões qualificadas pela SDR
- **Editora/designer:** peças, carrosséis, edição de vídeo, design de propostas
- **Gestor de tráfego:** Meta Ads + Google Ads (clientes + M|P)
- **Filmmakers (2):** produção audiovisual nos clientes
- **SDR:** qualificação de leads vindos dos anúncios + agendamento de reuniões

---

## O que mais fazemos aqui

- Carrosséis e estáticos de conteúdo (novidades de mercado digital e IA)
- Cases de cliente (provas sociais com números reais)
- Materiais comerciais (propostas, slides de reunião, scripts de SDR)
- Relatórios de performance de anúncio
- Briefings de onboarding de cliente novo
- Roteiros e scripts de vídeo

---

## Tom de voz

Direto, "empresário pra empresário". Sem promessa vazia, sem gíria, sem
emoji em comunicação formal. Frase curta vence parágrafo longo. Número
específico vence adjetivo.

Detalhe completo em [_memoria/preferencias.md](_memoria/preferencias.md).

**Evitar:** "vamos juntos", "boto fé", "pode crer", "alavancar",
"sinergia", "destravar", "transformar sonhos em realidade", emoji em
email, persona genérica de pitch.

---

## Foco atual

Captação de cliente novo via máquina de vendas (Ads → SDR → Closer).
Tudo que ataca esse gargalo entra primeiro. Detalhe em
[_memoria/estrategia.md](_memoria/estrategia.md).

**Candidatas a virar skill (mapear quando o usuário pedir):**
1. Carrosséis de novidades de mercado digital + IA filtradas pro público-alvo
2. Página web de briefing/onboarding com export em PDF, personalizada com a marca

---

## Regras do sistema

- Cada setor cria sua própria pasta na raiz **quando começar a gerar
  documentos** — não criar pasta vazia adiantada
- Propostas comerciais salvar em `comercial/propostas/` (criar quando precisar)
- Relatórios de campanha salvar em `dados/` ou `marketing/relatorios/`
- Cases prontos pra divulgação salvar em `marketing/cases/`
- Briefings de cliente novo salvar em `dados/briefings/<nome-do-cliente>/`
- Peças visuais geradas sempre seguir [identidade/design-guide.md](identidade/design-guide.md)
- Saída de PDF/export final salvar em `saidas/`

---

## Ferramentas conectadas

- [ ] Notion
- [ ] Gmail
- [ ] Google Calendar
- [ ] Google Ads
- [ ] Meta Ads
- [x] Supabase (MCP disponível na conta Claude)
- [x] Canva (MCP disponível)
- [x] Figma (MCP disponível)
- [ ] Kommo CRM
- [ ] Slack

*(Marcar conforme for instalando/conectando MCPs no projeto)*

---

## Contexto do negócio (regra padrão MazyOS)

No início de toda conversa, ler:

1. `_memoria/empresa.md` — quem é o usuário, o que faz, como funciona o negócio
2. `_memoria/preferencias.md` — tom de voz, estilo de escrita, o que evitar
3. `_memoria/estrategia.md` — foco atual, prioridades, prazos

Usar essas informações como base pra qualquer resposta ou decisão. Pra
qualquer tarefa visual (carrossel, post, landing page, slide), consultar
`identidade/design-guide.md`. Não confirmar a leitura — apenas usar o
contexto naturalmente.

---

## Fluxo de trabalho

Antes de executar qualquer tarefa, verificar se existe skill relevante
em `.claude/skills/`. Se encontrar, seguir as instruções da skill.

Ao concluir uma tarefa que não tinha skill mas parece repetível,
perguntar: *"Isso pode virar uma skill pra próxima vez. Quer que eu crie?"*

---

## Aprender com correções

Quando o usuário corrigir algo ou der instrução permanente ("na verdade
é assim", "evita isso", "sempre que..."), perguntar: *"Quer que eu
salve isso pra não precisar repetir?"*

Se sim, salvar onde fizer mais sentido:
- Negócio (clientes, serviços, equipe) → `_memoria/empresa.md`
- Tom / estilo / o que evitar → `_memoria/preferencias.md`
- Foco / prioridade / prazos → `_memoria/estrategia.md`
- Visual → `identidade/design-guide.md`
- Regra de comportamento no projeto → próprio `CLAUDE.md`

Adicionar uma linha nova, não reformatar o arquivo. Confirmar mostrando
a linha adicionada.

---

## Manter contexto atualizado

Ao terminar uma tarefa que mudou algo relevante (cliente novo, skill
nova, mudança de foco, processo novo, ferramenta instalada), perguntar:
*"Isso mudou algo no teu contexto. Quer que eu atualize a memória?"*

Não perguntar pra tarefas pontuais. Pra varredura completa, rodar
`/atualizar`.

---

## Criação de skills

Quando o usuário pedir skill nova:

1. Verificar template em `templates/skills/` e usar como base
2. Perguntar se é local (`.claude/skills/`) ou global (`~/.claude/skills/`)
3. Ler `_memoria/empresa.md` e `_memoria/preferencias.md` pra calibrar
4. Criar arquivos de apoio dentro da pasta da skill se precisar
5. Seguir o fluxo da skill-creator nativa do Claude Code
