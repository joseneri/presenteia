export type Guide = {
  slug: string;
  title: string;
  description: string;
  persona: string;
  occasion: string;
  interest: string;
  productIds: string[];
};

export const guides: Guide[] = [
  {
    slug: "presentes-para-mae",
    title: "Presentes para mae",
    description: "Ideias para maes que gostam de conforto, leitura, casa e cafe.",
    persona: "mae",
    occasion: "dia das maes",
    interest: "autocuidado",
    productIds: ["massageador", "kindle", "kit-cafe", "echo-dot"]
  },
  {
    slug: "presentes-para-pai",
    title: "Presentes para pai",
    description: "Ideias uteis para pais que gostam de cafe, tecnologia e rotina pratica.",
    persona: "pai",
    occasion: "dia dos pais",
    interest: "util",
    productIds: ["caneca-termica", "echo-dot", "moka-cafeteira", "suporte-celular"]
  },
  {
    slug: "presentes-para-namorada",
    title: "Presentes para namorada",
    description: "Sugestoes carinhosas para autocuidado, leitura, decoracao e tecnologia.",
    persona: "namorada",
    occasion: "dia dos namorados",
    interest: "autocuidado",
    productIds: ["skincare-kit", "kindle", "luminaria-led", "fone-bluetooth"]
  },
  {
    slug: "presentes-para-namorado",
    title: "Presentes para namorado",
    description: "Sugestoes para tecnologia, setup, musica e rotina.",
    persona: "namorado",
    occasion: "dia dos namorados",
    interest: "tecnologia",
    productIds: ["fone-bluetooth", "echo-dot", "organizador-cabos", "kindle"]
  },
  {
    slug: "presentes-para-amigo-secreto",
    title: "Presentes para amigo secreto",
    description: "Presentes faceis de agradar sem estourar o orcamento.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "util",
    productIds: ["chaveiro-smart", "caneca-termica", "organizador-cabos", "garrafa-termica"]
  },
  {
    slug: "presentes-ate-50-reais",
    title: "Presentes ate 50 reais",
    description: "Lembrancas baratas, praticas e com cara de escolha pensada.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "barato",
    productIds: ["chaveiro-smart", "suporte-celular", "organizador-cabos"]
  },
  {
    slug: "presentes-ate-100-reais",
    title: "Presentes ate 100 reais",
    description: "Achados uteis para amigo secreto e lembrancas bem escolhidas.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "util",
    productIds: ["organizador-cabos", "garrafa-termica", "luminaria-led"]
  },
  {
    slug: "presentes-criativos",
    title: "Presentes criativos",
    description: "Ideias para fugir do obvio sem abrir mao de utilidade.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "criativo",
    productIds: ["jogo-tabuleiro", "luminaria-led", "moka-cafeteira", "kit-cafe"]
  },
  {
    slug: "presentes-tecnologia",
    title: "Presentes de tecnologia",
    description: "Achados para quem gosta de gadgets, setup e rotina conectada.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "tecnologia",
    productIds: ["echo-dot", "fone-bluetooth", "suporte-celular", "organizador-cabos"]
  },
  {
    slug: "presentes-para-gamers",
    title: "Presentes para gamers",
    description: "Itens para setup, som, organizacao e ambiente de jogo.",
    persona: "gamer",
    occasion: "aniversario",
    interest: "games",
    productIds: ["fone-bluetooth", "luminaria-led", "organizador-cabos"]
  }
];
