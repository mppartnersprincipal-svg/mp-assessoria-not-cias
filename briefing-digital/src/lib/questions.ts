/**
 * Catálogo de perguntas do briefing M|P.
 *
 * Seção 1 (Identificação) está com renderer completo no MVP.
 * Seções 2–15 estão em modo `stub` — os tipos de input específicos
 * (ranking, scale, fileUpload, date, moneyRange) ainda não foram
 * implementados, então essas perguntas exibem um placeholder na fase 1.
 */

export type InputType =
  | "short-text"
  | "long-text"
  | "single-choice"
  | "multi-choice"
  | "url"
  | "phone"
  | "cnpj"
  | "cidade-estado"
  | "redes-sociais"
  | "stub";

export type Choice = { value: string; label: string; description?: string };

export type Question = {
  id: string;
  section: number;
  type: InputType;
  title: string;
  help?: string;
  placeholder?: string;
  required?: boolean;
  choices?: Choice[];
  maxLength?: number;
};

export type Section = {
  index: number;
  title: string;
  pill: string;
  subtitle: string;
};

export const SECTIONS: Section[] = [
  {
    index: 1,
    title: "Identificação da empresa",
    pill: "Seção 1 de 15",
    subtitle: "Pra começar, queremos entender quem é a empresa por trás do briefing.",
  },
  {
    index: 2,
    title: "Sócios e responsáveis",
    pill: "Seção 2 de 15",
    subtitle: "Quem comanda, quem aparece, quem fala com a M|P.",
  },
  {
    index: 3,
    title: "História e propósito",
    pill: "Seção 3 de 15",
    subtitle: "Por que essa empresa existe, e onde ela quer chegar.",
  },
  { index: 4, title: "Produto e serviço", pill: "Seção 4 de 15", subtitle: "O que vocês vendem, como, por quanto." },
  { index: 5, title: "Mercado e concorrência", pill: "Seção 5 de 15", subtitle: "Contra quem disputam atenção e venda." },
  { index: 6, title: "Público-alvo", pill: "Seção 6 de 15", subtitle: "Pra quem isso aqui é, de verdade." },
  { index: 7, title: "Posicionamento e tom de voz", pill: "Seção 7 de 15", subtitle: "Como a marca soa, sente e se vende." },
  { index: 8, title: "Identidade visual", pill: "Seção 8 de 15", subtitle: "Logo, cores, fontes, referências." },
  { index: 9, title: "Histórico de marketing", pill: "Seção 9 de 15", subtitle: "O que já tentaram, o que funcionou, o que não." },
  { index: 10, title: "Objetivos e metas", pill: "Seção 10 de 15", subtitle: "Onde vocês querem chegar e em quanto tempo." },
  { index: 11, title: "Conteúdo e redes sociais", pill: "Seção 11 de 15", subtitle: "Como e onde vão aparecer." },
  { index: 12, title: "Site e landing pages", pill: "Seção 12 de 15", subtitle: "O que existe hoje, o que precisa existir." },
  { index: 13, title: "Funil de vendas", pill: "Seção 13 de 15", subtitle: "Do lead que chega à venda que entra." },
  { index: 14, title: "Operação com a M|P", pill: "Seção 14 de 15", subtitle: "Como vamos trabalhar juntos." },
  { index: 15, title: "Observações finais", pill: "Seção 15 de 15", subtitle: "Tudo o que não coube nas perguntas acima." },
];

// ============================================================================
// SEÇÃO 1 — Identificação da empresa (MVP funcional)
// ============================================================================
const section1: Question[] = [
  {
    id: "empresa.razao_social",
    section: 1,
    type: "short-text",
    title: "Qual é a razão social da empresa?",
    help: "O nome registrado no CNPJ. Se ainda não tem, escreve o nome que vai abrir.",
    placeholder: "Ex: M Comércio e Soluções Ltda",
    required: true,
    maxLength: 120,
  },
  {
    id: "empresa.nome_fantasia",
    section: 1,
    type: "short-text",
    title: "E o nome fantasia — como o mercado conhece vocês?",
    help: "É o nome que aparece na fachada, no Instagram, no boca a boca.",
    placeholder: "Ex: M|P Assessoria",
    required: false,
    maxLength: 80,
  },
  {
    id: "empresa.cnpj",
    section: 1,
    type: "cnpj",
    title: "Qual é o CNPJ?",
    help: "Pode escrever só os números — a máscara é aplicada automaticamente.",
    placeholder: "00.000.000/0000-00",
    required: false,
  },
  {
    id: "empresa.cidade_estado",
    section: 1,
    type: "cidade-estado",
    title: "Onde a empresa fica?",
    help: "Cidade-sede de operação — a gente usa pra entender mercado e logística.",
    required: true,
  },
  {
    id: "empresa.modelo_atuacao",
    section: 1,
    type: "single-choice",
    title: "Como vocês atendem hoje?",
    help: "Marca a opção que mais se aproxima da realidade — não precisa ser 100%.",
    required: true,
    choices: [
      { value: "online", label: "100% online", description: "Atendimento, venda e entrega digitais." },
      { value: "presencial", label: "100% presencial", description: "Atendimento e venda em loja, escritório ou no cliente." },
      { value: "hibrido", label: "Os dois", description: "Atende online e presencial em proporções variadas." },
    ],
  },
  {
    id: "empresa.tempo_mercado",
    section: 1,
    type: "single-choice",
    title: "Há quanto tempo a empresa existe?",
    required: true,
    choices: [
      { value: "<1", label: "Menos de 1 ano" },
      { value: "1-3", label: "1 a 3 anos" },
      { value: "3-10", label: "3 a 10 anos" },
      { value: "10+", label: "Mais de 10 anos" },
    ],
  },
  {
    id: "empresa.site",
    section: 1,
    type: "url",
    title: "Vocês têm site no ar?",
    help: "Se não tem, deixa em branco — a gente cuida disso depois.",
    placeholder: "https://...",
    required: false,
  },
  {
    id: "empresa.redes_sociais",
    section: 1,
    type: "redes-sociais",
    title: "Quais redes sociais a empresa usa?",
    help: "Marque as redes ativas e cole o link de cada uma.",
    required: false,
  },
];

// ============================================================================
// SEÇÕES 2-15 — Stubs (sem renderer no MVP, apenas placeholders)
// ============================================================================
function stub(section: number, ids: string[], titles: string[]): Question[] {
  return ids.map((id, i) => ({
    id,
    section,
    type: "stub" as const,
    title: titles[i] ?? "Pergunta em construção",
  }));
}

const section2 = stub(
  2,
  [
    "socios.nomes",
    "socios.cara_da_marca",
    "socios.disponibilidade_video",
    "socios.redes_pessoais",
    "socios.ponto_focal",
  ],
  [
    "Nome completo dos sócios",
    "Quem é a 'cara' da marca?",
    "Essa pessoa grava vídeos hoje?",
    "LinkedIn e Instagram pessoal dos sócios",
    "Quem será nosso ponto focal de contato?",
  ]
);

const section3 = stub(
  3,
  [
    "proposito.historia",
    "proposito.missao",
    "proposito.visao",
    "proposito.valores",
    "proposito.problema_resolvido",
    "proposito.diferencial",
  ],
  [
    "Conte a história da empresa em até 5 linhas",
    "Qual é a missão (propósito)?",
    "Qual é a visão (onde quer chegar)?",
    "3 a 5 valores que sustentam a empresa",
    "Que problema vocês resolvem na vida do cliente?",
    "Por que o cliente escolheria vocês e não o concorrente?",
  ]
);

const section4 = stub(
  4,
  [
    "produto.lista",
    "produto.carro_chefe",
    "produto.ticket_medio",
    "produto.margem",
    "produto.pagamento",
    "produto.sazonalidade",
  ],
  [
    "Liste todos os produtos/serviços oferecidos",
    "Qual é o carro-chefe?",
    "Ticket médio por produto/serviço",
    "Margem média (faixa)",
    "Formas de pagamento aceitas",
    "Há sazonalidade? Quais meses são mais fortes?",
  ]
);

const section5 = stub(
  5,
  [
    "mercado.concorrentes",
    "mercado.referencias",
    "mercado.referencias_porque",
    "mercado.anti_referencias",
  ],
  [
    "Os 3 principais concorrentes diretos",
    "Quais referências de comunicação vocês admiram?",
    "O que essas referências fazem bem que vocês também querem fazer?",
    "Como a marca NÃO pode parecer? (anti-referências)",
  ]
);

const section6 = stub(
  6,
  [
    "publico.perfil_demografico",
    "publico.localizacao",
    "publico.dores",
    "publico.desejos",
    "publico.objecoes",
    "publico.onde_esta",
    "publico.referencias_que_consome",
  ],
  [
    "Descreva o cliente ideal: idade, gênero, profissão, renda, escolaridade",
    "Onde mora geograficamente?",
    "As 3 maiores dores desse cliente",
    "Os 3 maiores desejos dele",
    "Quais objeções ele tem antes de comprar?",
    "Onde esse cliente está online?",
    "Que perfis/criadores ele consome?",
  ]
);

const section7 = stub(
  7,
  [
    "tom.percepcao_positiva",
    "tom.percepcao_negativa",
    "tom.formalidade",
    "tom.humor_giria_emoji",
    "tom.palavras_proibidas",
    "tom.manifesto",
  ],
  [
    "Em 3 palavras, como a marca DEVE ser percebida?",
    "Em 3 palavras, como a marca NÃO pode ser percebida?",
    "A comunicação é mais formal ou informal? (1–5)",
    "Pode usar humor, gírias, emojis?",
    "Alguma palavra 'proibida' no vocabulário da marca?",
    "Tem manifesto ou slogan consolidado?",
  ]
);

const section8 = stub(
  8,
  [
    "visual.logo",
    "visual.manual",
    "visual.cores",
    "visual.fontes",
    "visual.banco_fotos",
    "visual.referencias_visuais",
  ],
  [
    "Anexe a logo (se tiver)",
    "Anexe o manual de marca (se tiver)",
    "Cores oficiais (HEX se souber)",
    "Fontes oficiais",
    "Tem banco de fotos próprias? Vídeos brutos?",
    "Referências visuais que vocês gostam",
  ]
);

const section9 = stub(
  9,
  [
    "historico.trafego_pago",
    "historico.melhor_resultado",
    "historico.nao_funcionou",
    "historico.agencias_anteriores",
    "historico.investimento_midia",
    "historico.investimento_conteudo",
  ],
  [
    "Já fizeram tráfego pago antes?",
    "Qual o melhor resultado já obtido?",
    "O que NÃO funcionou em tentativas passadas?",
    "Trabalharam com outra agência antes? O que faltou?",
    "Investimento mensal disponível para mídia paga",
    "Investimento mensal disponível para produção de conteúdo",
  ]
);

const section10 = stub(
  10,
  [
    "metas.faturamento_atual",
    "metas.faturamento_3m",
    "metas.faturamento_6m",
    "metas.faturamento_12m",
    "metas.objetivos",
    "metas.kpi_principal",
  ],
  [
    "Faturamento médio mensal atual (faixa)",
    "Meta de faturamento em 3 meses",
    "Meta em 6 meses",
    "Meta em 12 meses",
    "3 principais objetivos com a M|P",
    "Qual é o KPI mais importante?",
  ]
);

const section11 = stub(
  11,
  [
    "conteudo.redes_prioritarias",
    "conteudo.frequencia",
    "conteudo.quem_produz",
    "conteudo.disponibilidade_gravacao",
    "conteudo.local_gravacao",
    "conteudo.foto_profissional",
    "conteudo.formato_preferido",
  ],
  [
    "Quais redes são prioritárias? (ranking)",
    "Frequência de postagem desejada por rede",
    "Quem produz conteúdo hoje?",
    "Quantos dias por mês a 'cara da marca' grava?",
    "Local de gravação: estúdio, casa, externa?",
    "Aceita aparecer em fotos profissionais?",
    "Tem preferência por formato? (Reels, carrossel, YouTube...)",
  ]
);

const section12 = stub(
  12,
  [
    "site.url",
    "site.precisa_novo",
    "site.funcionalidades",
    "site.fluxo_lead",
    "site.pixel_tag",
  ],
  [
    "Tem site? Link",
    "Precisa de site novo ou reformulação?",
    "Funcionalidades necessárias (blog, agendamento, e-commerce...)",
    "Como o lead chega hoje?",
    "Tem pixel da Meta e tag do Google instalados?",
  ]
);

const section13 = stub(
  13,
  [
    "funil.fluxo_atual",
    "funil.crm",
    "funil.equipe_comercial",
    "funil.responde_whatsapp",
    "funil.tempo_medio",
    "funil.taxa_conversao",
  ],
  [
    "Como o lead vira cliente hoje? Descreva o passo a passo",
    "Tem CRM? Qual?",
    "Tem equipe comercial? Quantas pessoas?",
    "Quem responde o WhatsApp / direct?",
    "Tempo médio entre primeiro contato e venda",
    "Taxa de conversão média (se souber)",
  ]
);

const section14 = stub(
  14,
  [
    "operacao.frequencia_reunioes",
    "operacao.horario_preferido",
    "operacao.canal_comunicacao",
    "operacao.aprovacao",
    "operacao.decisores",
  ],
  [
    "Frequência de reuniões preferida",
    "Dia/horário preferido para reuniões",
    "Canal de comunicação preferido",
    "Quem aprova as peças e quanto tempo leva?",
    "Há mais de um decisor? Quem são?",
  ]
);

const section15 = stub(
  15,
  [
    "final.observacoes",
    "final.anexos",
    "final.datas_importantes",
  ],
  [
    "Algo importante que ainda não perguntamos?",
    "Quer anexar arquivos adicionais?",
    "Há alguma data importante no horizonte?",
  ]
);

// ============================================================================
// Catálogo final
// ============================================================================
export const QUESTIONS: Question[] = [
  ...section1,
  ...section2,
  ...section3,
  ...section4,
  ...section5,
  ...section6,
  ...section7,
  ...section8,
  ...section9,
  ...section10,
  ...section11,
  ...section12,
  ...section13,
  ...section14,
  ...section15,
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export function isFirstOfSection(index: number): boolean {
  if (index <= 0) return true;
  return QUESTIONS[index].section !== QUESTIONS[index - 1].section;
}

export function getSection(sectionIndex: number): Section {
  return SECTIONS[sectionIndex - 1];
}

export function findQuestionIndex(id: string): number {
  return QUESTIONS.findIndex((q) => q.id === id);
}
