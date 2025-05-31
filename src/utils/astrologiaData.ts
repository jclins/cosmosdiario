
// Utilitário para gerenciar dados astrológicos
// Este arquivo pode ser expandido para carregar dados de arquivos .md ou .json externos

export interface Signo {
  nome: string;
  emoji: string;
  cor: string;
  elemento: string;
  regente: string;
  datas: string;
  caracteristicas: string[];
}

export interface PrevisaoDiaria {
  signo: string;
  data: string;
  previsaoGeral: string;
  amor: string;
  trabalho: string;
  saude: string;
  numeroSorte: number;
  corSorte: string;
}

export const SIGNOS: Signo[] = [
  {
    nome: "Áries",
    emoji: "♈",
    cor: "text-red-500",
    elemento: "Fogo",
    regente: "Marte",
    datas: "21/03 - 19/04",
    caracteristicas: ["Determinado", "Corajoso", "Impulsivo", "Líder natural", "Aventureiro"]
  },
  {
    nome: "Touro",
    emoji: "♉",
    cor: "text-green-500",
    elemento: "Terra",
    regente: "Vênus",
    datas: "20/04 - 20/05",
    caracteristicas: ["Estável", "Determinado", "Sensual", "Prático", "Persistente"]
  },
  {
    nome: "Gêmeos",
    emoji: "♊",
    cor: "text-yellow-500",
    elemento: "Ar",
    regente: "Mercúrio",
    datas: "21/05 - 20/06",
    caracteristicas: ["Comunicativo", "Versátil", "Curioso", "Inteligente", "Adaptável"]
  },
  {
    nome: "Câncer",
    emoji: "♋",
    cor: "text-blue-400",
    elemento: "Água",
    regente: "Lua",
    datas: "21/06 - 22/07",
    caracteristicas: ["Emotivo", "Protetor", "Intuitivo", "Familiar", "Sensível"]
  },
  {
    nome: "Leão",
    emoji: "♌",
    cor: "text-orange-500",
    elemento: "Fogo",
    regente: "Sol",
    datas: "23/07 - 22/08",
    caracteristicas: ["Orgulhoso", "Generoso", "Criativo", "Dramático", "Carismático"]
  },
  {
    nome: "Virgem",
    emoji: "♍",
    cor: "text-green-600",
    elemento: "Terra",
    regente: "Mercúrio",
    datas: "23/08 - 22/09",
    caracteristicas: ["Perfeccionista", "Analítico", "Prático", "Organizado", "Detalhista"]
  },
  {
    nome: "Libra",
    emoji: "♎",
    cor: "text-pink-400",
    elemento: "Ar",
    regente: "Vênus",
    datas: "23/09 - 22/10",
    caracteristicas: ["Equilibrado", "Diplomático", "Estético", "Harmonioso", "Sociável"]
  },
  {
    nome: "Escorpião",
    emoji: "♏",
    cor: "text-red-700",
    elemento: "Água",
    regente: "Plutão",
    datas: "23/10 - 21/11",
    caracteristicas: ["Intenso", "Misterioso", "Transformador", "Magnético", "Investigativo"]
  },
  {
    nome: "Sagitário",
    emoji: "♐",
    cor: "text-purple-500",
    elemento: "Fogo",
    regente: "Júpiter",
    datas: "22/11 - 21/12",
    caracteristicas: ["Aventureiro", "Filosófico", "Otimista", "Livre", "Expansivo"]
  },
  {
    nome: "Capricórnio",
    emoji: "♑",
    cor: "text-gray-600",
    elemento: "Terra",
    regente: "Saturno",
    datas: "22/12 - 19/01",
    caracteristicas: ["Ambicioso", "Disciplinado", "Responsável", "Estratégico", "Maduro"]
  },
  {
    nome: "Aquário",
    emoji: "♒",
    cor: "text-cyan-500",
    elemento: "Ar",
    regente: "Urano",
    datas: "20/01 - 18/02",
    caracteristicas: ["Inovador", "Independente", "Humanitário", "Original", "Progressista"]
  },
  {
    nome: "Peixes",
    emoji: "♓",
    cor: "text-blue-500",
    elemento: "Água",
    regente: "Netuno",
    datas: "19/02 - 20/03",
    caracteristicas: ["Intuitivo", "Compassivo", "Artístico", "Espiritual", "Sonhador"]
  }
];

// Função para gerar previsões mock (substituir por carregamento de arquivo real)
export const gerarPrevisoesDiarias = (): PrevisaoDiaria[] => {
  const hoje = new Date().toISOString().split('T')[0];
  
  const previsoes = [
    "As energias cósmicas estão alinhadas para trazer mudanças positivas em sua vida.",
    "Momento favorável para novos começos e projetos criativos.",
    "A influência planetária favorece relacionamentos e parcerias.",
    "Dia propício para reflexão e autoconhecimento profundo.",
    "As estrelas indicam oportunidades financeiras no horizonte.",
    "Período de crescimento pessoal e expansão de horizontes.",
    "Momento ideal para fortalecer vínculos familiares e afetivos.",
    "As energias favorecem comunicação e expressão criativa.",
    "Dia de sorte e realizações em projetos pessoais.",
    "Influências astrais trazem clareza mental e decisões assertivas.",
    "Período de renovação e transformação interior.",
    "As estrelas alinham-se para trazer harmonia e equilíbrio."
  ];

  const amores = [
    "Vênus favorece encontros românticos e demonstrações de carinho.",
    "Momento propício para diálogos importantes com o par.",
    "Energia favorável para reconciliações e novos relacionamentos.",
    "Lua em aspecto harmonioso intensifica as emoções amorosas.",
    "Período ideal para fortalecer vínculos existentes.",
    "As estrelas favorecem paixões intensas e conexões profundas."
  ];

  const trabalhos = [
    "Mercúrio favorece negociações e apresentações importantes.",
    "Momento propício para liderança e tomada de decisões.",
    "Período favorável para parcerias profissionais e colaborações.",
    "As energias cósmicas impulsionam projetos criativos.",
    "Júpiter traz oportunidades de crescimento na carreira.",
    "Dia ideal para networking e expansão profissional."
  ];

  const saudes = [
    "Momento ideal para iniciar novos hábitos saudáveis.",
    "As energias favorecem atividades físicas e exercícios.",
    "Período propício para cuidados com a alimentação.",
    "Influências astrais favorecem o equilíbrio mental e emocional.",
    "Lua nova traz renovação de energias vitais.",
    "Momento favorável para práticas de relaxamento e meditação."
  ];

  const cores = ["Dourado", "Azul", "Verde", "Roxo", "Vermelho", "Rosa", "Laranja", "Prata"];

  return SIGNOS.map((signo, index) => ({
    signo: signo.nome,
    data: hoje,
    previsaoGeral: previsoes[index],
    amor: amores[index % amores.length],
    trabalho: trabalhos[index % trabalhos.length],
    saude: saudes[index % saudes.length],
    numeroSorte: Math.floor(Math.random() * 99) + 1,
    corSorte: cores[index % cores.length]
  }));
};

// Função para carregar dados de arquivo JSON (implementar conforme necessário)
export const carregarPrevisoes = async (data?: string): Promise<PrevisaoDiaria[]> => {
  try {
    // Aqui você pode implementar a lógica para carregar de um arquivo JSON real
    // Por exemplo: const response = await fetch(`/api/previsoes/${data || 'hoje'}.json`);
    // return await response.json();
    
    // Por enquanto, retorna dados mock
    return gerarPrevisoesDiarias();
  } catch (error) {
    console.error('Erro ao carregar previsões:', error);
    return gerarPrevisoesDiarias();
  }
};

export const obterSignoPorNome = (nome: string): Signo | undefined => {
  return SIGNOS.find(signo => 
    signo.nome.toLowerCase() === nome.toLowerCase()
  );
};
