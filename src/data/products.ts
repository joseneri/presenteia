export type Product = {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  amazonUrl: string;
  image: string;
  categories: string[];
  personas: string[];
  occasions: string[];
  interests: string[];
};

const affiliateTag = "seu-codigo-20";

export const products: Product[] = [
  {
    id: "echo-dot",
    title: "Echo Dot com Alexa",
    description:
      "Um presente util para casa, musica, timers, rotina e comandos por voz.",
    priceRange: "R$250-R$400",
    amazonUrl: `https://www.amazon.com.br/s?k=echo+dot&tag=${affiliateTag}`,
    image: "/products/echo-dot.svg",
    categories: ["tecnologia", "casa"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["aniversario", "natal", "casa nova"],
    interests: ["tecnologia", "musica", "casa inteligente"]
  },
  {
    id: "kindle",
    title: "Kindle",
    description:
      "Boa escolha para quem gosta de leitura e quer carregar muitos livros sem peso.",
    priceRange: "R$350-R$600",
    amazonUrl: `https://www.amazon.com.br/s?k=kindle&tag=${affiliateTag}`,
    image: "/products/kindle.svg",
    categories: ["leitura", "tecnologia"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["aniversario", "natal", "dia dos namorados"],
    interests: ["livros", "estudo", "viagem"]
  },
  {
    id: "kit-cafe",
    title: "Kit cafe especial",
    description:
      "Um presente sensorial e facil de acertar para quem curte rituais de cafe.",
    priceRange: "R$80-R$220",
    amazonUrl: `https://www.amazon.com.br/s?k=kit+cafe+especial&tag=${affiliateTag}`,
    image: "/products/kit-cafe.svg",
    categories: ["gastronomia", "casa"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["aniversario", "amigo secreto", "natal"],
    interests: ["cafe", "cozinha", "gourmet"]
  },
  {
    id: "massageador",
    title: "Massageador portatil",
    description:
      "Combina com pessoas cansadas, que trabalham muito ou gostam de autocuidado.",
    priceRange: "R$120-R$350",
    amazonUrl: `https://www.amazon.com.br/s?k=massageador+portatil&tag=${affiliateTag}`,
    image: "/products/massageador.svg",
    categories: ["bem-estar", "autocuidado"],
    personas: ["mae", "pai", "namorada", "namorado"],
    occasions: ["aniversario", "dia das maes", "dia dos pais"],
    interests: ["relaxamento", "saude", "autocuidado"]
  },
  {
    id: "fone-bluetooth",
    title: "Fone bluetooth",
    description:
      "Pratico para academia, trabalho, estudo e chamadas durante o dia.",
    priceRange: "R$100-R$450",
    amazonUrl: `https://www.amazon.com.br/s?k=fone+bluetooth&tag=${affiliateTag}`,
    image: "/products/fone-bluetooth.svg",
    categories: ["tecnologia", "musica"],
    personas: ["namorada", "namorado", "amigo", "gamer"],
    occasions: ["aniversario", "natal", "amigo secreto"],
    interests: ["musica", "academia", "trabalho", "games"]
  },
  {
    id: "luminaria-led",
    title: "Luminaria LED de mesa",
    description:
      "Ajuda no setup, leitura e decoracao sem ser um presente generico demais.",
    priceRange: "R$70-R$220",
    amazonUrl: `https://www.amazon.com.br/s?k=luminaria+led+mesa&tag=${affiliateTag}`,
    image: "/products/luminaria-led.svg",
    categories: ["decoracao", "casa", "tecnologia"],
    personas: ["namorada", "namorado", "amigo", "gamer"],
    occasions: ["aniversario", "casa nova", "amigo secreto"],
    interests: ["decoracao", "estudo", "setup", "games"]
  },
  {
    id: "garrafa-termica",
    title: "Garrafa termica inox",
    description:
      "Presente util para rotina, academia, escritorio e viagens curtas.",
    priceRange: "R$60-R$180",
    amazonUrl: `https://www.amazon.com.br/s?k=garrafa+termica+inox&tag=${affiliateTag}`,
    image: "/products/garrafa-termica.svg",
    categories: ["util", "bem-estar"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["amigo secreto", "aniversario", "natal"],
    interests: ["academia", "trabalho", "viagem", "rotina"]
  },
  {
    id: "jogo-tabuleiro",
    title: "Jogo de tabuleiro moderno",
    description:
      "Bom para pessoas sociaveis, casais e familias que gostam de noite de jogos.",
    priceRange: "R$80-R$250",
    amazonUrl: `https://www.amazon.com.br/s?k=jogo+de+tabuleiro&tag=${affiliateTag}`,
    image: "/products/jogo-tabuleiro.svg",
    categories: ["diversao", "criativo"],
    personas: ["amigo", "namorada", "namorado", "familia"],
    occasions: ["aniversario", "natal", "amigo secreto"],
    interests: ["jogos", "familia", "criatividade"]
  },
  {
    id: "organizador-cabos",
    title: "Organizador de cabos e mesa",
    description:
      "Pequeno, barato e certeiro para quem gosta de escritorio ou setup arrumado.",
    priceRange: "R$30-R$90",
    amazonUrl: `https://www.amazon.com.br/s?k=organizador+de+cabos&tag=${affiliateTag}`,
    image: "/products/organizador-cabos.svg",
    categories: ["util", "tecnologia"],
    personas: ["amigo", "namorado", "namorada", "gamer"],
    occasions: ["amigo secreto", "aniversario"],
    interests: ["setup", "organizacao", "trabalho", "games"]
  },
  {
    id: "moka-cafeteira",
    title: "Cafeteira italiana moka",
    description:
      "Presente bonito e funcional para quem gosta de cafe forte e ritual de cozinha.",
    priceRange: "R$70-R$180",
    amazonUrl: `https://www.amazon.com.br/s?k=cafeteira+italiana+moka&tag=${affiliateTag}`,
    image: "/products/moka-cafeteira.svg",
    categories: ["gastronomia", "casa"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["aniversario", "natal", "casa nova"],
    interests: ["cafe", "cozinha", "decoracao", "gourmet"]
  },
  {
    id: "chaveiro-smart",
    title: "Chaveiro organizador",
    description:
      "Lembranca util, barata e facil de encaixar em amigo secreto ou presente rapido.",
    priceRange: "R$20-R$50",
    amazonUrl: `https://www.amazon.com.br/s?k=chaveiro+organizador&tag=${affiliateTag}`,
    image: "/products/chaveiro-smart.svg",
    categories: ["util", "barato"],
    personas: ["pai", "namorada", "namorado", "amigo"],
    occasions: ["amigo secreto", "aniversario"],
    interests: ["organizacao", "rotina", "trabalho"]
  },
  {
    id: "caneca-termica",
    title: "Caneca termica",
    description:
      "Funciona bem para cafe, escritorio, estudo e pessoas que gostam de rotina pratica.",
    priceRange: "R$40-R$100",
    amazonUrl: `https://www.amazon.com.br/s?k=caneca+termica&tag=${affiliateTag}`,
    image: "/products/caneca-termica.svg",
    categories: ["util", "casa"],
    personas: ["mae", "pai", "namorada", "namorado", "amigo"],
    occasions: ["amigo secreto", "aniversario", "natal"],
    interests: ["cafe", "trabalho", "estudo", "rotina"]
  },
  {
    id: "skincare-kit",
    title: "Kit skincare",
    description:
      "Opcao de autocuidado para quem gosta de rotina de beleza e momentos de descanso.",
    priceRange: "R$60-R$180",
    amazonUrl: `https://www.amazon.com.br/s?k=kit+skincare&tag=${affiliateTag}`,
    image: "/products/skincare-kit.svg",
    categories: ["autocuidado", "beleza"],
    personas: ["mae", "namorada", "amigo"],
    occasions: ["aniversario", "dia das maes", "dia dos namorados"],
    interests: ["beleza", "autocuidado", "relaxamento"]
  },
  {
    id: "suporte-celular",
    title: "Suporte para celular",
    description:
      "Pequeno, acessivel e muito usado em mesa de trabalho, estudos ou chamadas.",
    priceRange: "R$25-R$70",
    amazonUrl: `https://www.amazon.com.br/s?k=suporte+para+celular&tag=${affiliateTag}`,
    image: "/products/suporte-celular.svg",
    categories: ["util", "tecnologia"],
    personas: ["pai", "namorada", "namorado", "amigo", "gamer"],
    occasions: ["amigo secreto", "aniversario"],
    interests: ["tecnologia", "trabalho", "estudo", "setup"]
  }
];
