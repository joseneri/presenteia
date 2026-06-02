type GiftImageInput = {
  id?: string;
  title?: string;
  description?: string;
  searchQuery?: string;
  categories?: string[];
  personas?: string[];
  occasions?: string[];
  interests?: string[];
  recipient?: string;
  ageGroup?: string;
  occasion?: string;
  style?: string;
  fallback?: string;
  usedImages?: string[];
};

type SearchImage = {
  id: string;
  image: string;
  priority: number;
  terms: string[];
  topic: string;
};

type ImageTopic = {
  topic: string;
  priority: number;
  terms: string[];
  query: string;
  count: number;
  startLock: number;
};

const imageUrl = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=720&q=82`;

const flickrImageUrl = (query: string, lock: number) =>
  `https://loremflickr.com/720/540/${query}/all?lock=${lock}`;

const topicImages: ImageTopic[] = [
  {
    topic: "cafe",
    priority: 116,
    query: "coffee,gift,stilllife",
    count: 10,
    startLock: 1100,
    terms: ["cafe", "kit cafe", "cafe especial", "graos", "gourmet cafe"]
  },
  {
    topic: "cafeteira",
    priority: 109,
    query: "coffee,maker,kitchen",
    count: 8,
    startLock: 1120,
    terms: ["cafeteira", "moka", "espresso", "coador", "cafe forte"]
  },
  {
    topic: "caneca",
    priority: 108,
    query: "mug,coffee,cup",
    count: 8,
    startLock: 1140,
    terms: ["caneca", "caneca termica", "copo termico", "cafe trabalho"]
  },
  {
    topic: "cha",
    priority: 102,
    query: "tea,cup,gift",
    count: 6,
    startLock: 1160,
    terms: ["cha", "infusor", "erva", "bebida quente"]
  },
  {
    topic: "livros",
    priority: 100,
    query: "books,reading,gift",
    count: 9,
    startLock: 1200,
    terms: ["livro", "livros", "leitura", "leitor", "kindle", "biblioteca"]
  },
  {
    topic: "tecnologia",
    priority: 99,
    query: "technology,gadget,desk",
    count: 9,
    startLock: 1220,
    terms: ["tecnologia", "gadget", "alexa", "tablet", "smart", "eletronico"]
  },
  {
    topic: "fone",
    priority: 98,
    query: "headphones,music,gift",
    count: 8,
    startLock: 1240,
    terms: ["fone", "fone bluetooth", "audio", "chamadas", "headphone"]
  },
  {
    topic: "gamer",
    priority: 98,
    query: "gaming,setup,keyboard",
    count: 8,
    startLock: 1260,
    terms: ["gamer", "games", "jogos", "setup", "rgb", "controle"]
  },
  {
    topic: "home-office",
    priority: 97,
    query: "homeoffice,desk,workspace",
    count: 9,
    startLock: 1280,
    terms: ["home office", "trabalho", "escritorio", "produtividade", "colega", "chefe"]
  },
  {
    topic: "papelaria",
    priority: 96,
    query: "notebook,planner,stationery",
    count: 8,
    startLock: 1300,
    terms: [
      "planner",
      "agenda",
      "caderno",
      "diario",
      "gratidao",
      "papelaria",
      "papeteria",
      "anotacoes"
    ]
  },
  {
    topic: "cozinha",
    priority: 96,
    query: "kitchen,cooking,gift",
    count: 10,
    startLock: 1320,
    terms: ["cozinha", "cozinheiro", "gastronomia", "utensilio", "culinaria", "receita"]
  },
  {
    topic: "temperos",
    priority: 94,
    query: "spices,cooking,kitchen",
    count: 6,
    startLock: 1340,
    terms: ["tempero", "temperos", "ervas", "churrasco", "gourmet"]
  },
  {
    topic: "casa-decoracao",
    priority: 95,
    query: "home,decor,gift",
    count: 9,
    startLock: 1360,
    terms: ["casa", "casa nova", "decoracao", "porta retrato", "ambiente"]
  },
  {
    topic: "luminaria",
    priority: 94,
    query: "lamp,light,decor",
    count: 6,
    startLock: 1380,
    terms: ["luminaria", "led", "iluminacao", "abajur"]
  },
  {
    topic: "skincare",
    priority: 95,
    query: "skincare,beauty,cosmetics",
    count: 9,
    startLock: 1400,
    terms: ["beleza", "skincare", "rotina de beleza", "cosmetico", "spa"]
  },
  {
    topic: "bem-estar",
    priority: 94,
    query: "wellness,relax,spa",
    count: 8,
    startLock: 1420,
    terms: ["bem-estar", "relaxamento", "saude", "massageador", "descanso"]
  },
  {
    topic: "fitness",
    priority: 93,
    query: "fitness,gym,workout",
    count: 8,
    startLock: 1440,
    terms: ["fitness", "academia", "treino", "vida ativa", "garrafa"]
  },
  {
    topic: "viagem",
    priority: 93,
    query: "travel,backpack,gift",
    count: 8,
    startLock: 1460,
    terms: ["viagem", "viajante", "mochileiro", "mochila", "aventura"]
  },
  {
    topic: "crianca",
    priority: 93,
    query: "children,toys,gift",
    count: 10,
    startLock: 1480,
    terms: ["crianca", "brinquedo", "dia das criancas", "blocos", "lego"]
  },
  {
    topic: "bebe",
    priority: 92,
    query: "baby,toy,gift",
    count: 8,
    startLock: 1500,
    terms: ["bebe", "recem nascido", "cha de bebe", "pelucia", "sensorial"]
  },
  {
    topic: "arte",
    priority: 92,
    query: "art,painting,creative",
    count: 9,
    startLock: 1520,
    terms: [
      "arte",
      "desenho",
      "pintura",
      "caneta",
      "canetas",
      "lapis",
      "artistico",
      "artistica",
      "artisticas",
      "criativo",
      "original",
      "diferente"
    ]
  },
  {
    topic: "jogos",
    priority: 91,
    query: "boardgame,puzzle,family",
    count: 8,
    startLock: 1540,
    terms: ["jogo de tabuleiro", "tabuleiro", "quebra cabeca", "familia", "casal"]
  },
  {
    topic: "formatura",
    priority: 90,
    query: "graduation,student,study",
    count: 7,
    startLock: 1560,
    terms: ["formatura", "estudante", "estudo", "professor", "professora"]
  },
  {
    topic: "natal",
    priority: 98,
    query: "christmas,gift,present",
    count: 8,
    startLock: 1580,
    terms: ["natal", "presente de natal", "familia"]
  },
  {
    topic: "romantico",
    priority: 98,
    query: "couple,romantic,gift",
    count: 8,
    startLock: 1600,
    terms: ["namorada", "namorado", "esposa", "marido", "romantico", "dia dos namorados"]
  },
  {
    topic: "amigo-secreto",
    priority: 97,
    query: "small,gift,present",
    count: 8,
    startLock: 1620,
    terms: ["amigo secreto", "presente barato", "ate 50", "ate 100", "lembranca"]
  },
  {
    topic: "mae",
    priority: 96,
    query: "mother,gift,flowers",
    count: 6,
    startLock: 1640,
    terms: ["mae", "dia das maes", "sogra", "conforto"]
  },
  {
    topic: "pai",
    priority: 96,
    query: "father,gift,tools",
    count: 6,
    startLock: 1660,
    terms: ["pai", "dia dos pais", "ferramenta"]
  },
  {
    topic: "pets",
    priority: 89,
    query: "pet,dog,cat",
    count: 6,
    startLock: 1680,
    terms: ["pet", "pets", "cachorro", "gato", "animal"]
  },
  {
    topic: "sustentavel",
    priority: 88,
    query: "sustainable,eco,gift",
    count: 6,
    startLock: 1700,
    terms: ["sustentavel", "ecologico", "eco", "duravel"]
  },
  {
    topic: "jardim",
    priority: 88,
    query: "plants,garden,gift",
    count: 6,
    startLock: 1720,
    terms: ["planta", "plantas", "jardim", "jardinagem"]
  },
  {
    topic: "festa",
    priority: 88,
    query: "party,gift,celebration",
    count: 6,
    startLock: 1740,
    terms: ["festa", "celebracao", "aniversario"]
  },
  {
    topic: "premium",
    priority: 87,
    query: "luxury,gift,premium",
    count: 6,
    startLock: 1760,
    terms: ["premium", "luxo", "especial", "acima de 500"]
  },
  {
    topic: "musica",
    priority: 87,
    query: "music,instrument,gift",
    count: 6,
    startLock: 1780,
    terms: ["musica", "instrumento", "musical", "som"]
  },
  {
    topic: "fotografia",
    priority: 86,
    query: "photography,camera,gift",
    count: 6,
    startLock: 1800,
    terms: ["foto", "fotografia", "camera", "retrato"]
  },
  {
    topic: "chocolate",
    priority: 86,
    query: "chocolate,gourmet,gift",
    count: 6,
    startLock: 1820,
    terms: ["chocolate", "pascoa", "doce", "sobremesa"]
  },
  {
    topic: "vinho",
    priority: 86,
    query: "wine,gift,dinner",
    count: 6,
    startLock: 1840,
    terms: ["vinho", "bar", "bebida", "jantar"]
  },
  {
    topic: "ferramentas",
    priority: 86,
    query: "tools,diy,gift",
    count: 6,
    startLock: 1860,
    terms: ["ferramenta", "diy", "manual", "oficina"]
  },
  {
    topic: "artesanato",
    priority: 85,
    query: "craft,handmade,gift",
    count: 6,
    startLock: 1880,
    terms: ["artesanato", "manual", "costura", "feito a mao"]
  },
  {
    topic: "praia",
    priority: 85,
    query: "beach,summer,gift",
    count: 6,
    startLock: 1900,
    terms: ["praia", "verao", "sol", "piscina"]
  },
  {
    topic: "flores",
    priority: 84,
    query: "flowers,gift,bouquet",
    count: 6,
    startLock: 1920,
    terms: ["flor", "flores", "buque", "delicado"]
  },
  {
    topic: "generico-presente",
    priority: 1,
    query: "gift,present,box",
    count: 12,
    startLock: 2000,
    terms: ["presente", "surpresa", "afeto", "lembranca"]
  }
];

const curatedSearchImages: SearchImage[] = [
  {
    id: "curated-cafe-01",
    image: imageUrl("photo-1559056199-641a0ac8b55e"),
    priority: 130,
    topic: "cafe",
    terms: ["cafe", "kit cafe", "cafe especial", "graos"]
  },
  {
    id: "curated-cafe-02",
    image: imageUrl("photo-1495474472287-4d71bcdd2085"),
    priority: 136,
    topic: "cafe",
    terms: [
      "cafe",
      "cesta de cafe",
      "cesta cafe",
      "gourmet",
      "presente cafe"
    ]
  },
  {
    id: "curated-cafeteira-01",
    image: imageUrl("photo-1442512595331-e89e73853f31"),
    priority: 123,
    topic: "cafeteira",
    terms: ["cafeteira", "moka", "espresso"]
  },
  {
    id: "curated-cha-01",
    image: imageUrl("photo-1544787219-7f47ccb76574"),
    priority: 125,
    topic: "cha",
    terms: ["cha", "infusor", "bebida quente", "xicara", "caneca"]
  },
  {
    id: "curated-caneca-01",
    image: imageUrl("photo-1509042239860-f550ce710b93"),
    priority: 130,
    topic: "caneca",
    terms: [
      "caneca",
      "canecas",
      "xicara",
      "kit de canecas",
      "personalizada",
      "cafe"
    ]
  },
  {
    id: "curated-caneca-02",
    image: imageUrl("photo-1497515114629-f71d768fd07c"),
    priority: 124,
    topic: "caneca",
    terms: ["caneca", "xicara", "cafe", "graos", "presente"]
  },
  {
    id: "curated-livros-01",
    image: imageUrl("photo-1519682337058-a94d519337bc"),
    priority: 118,
    topic: "livros",
    terms: ["livro", "livros", "leitura", "kindle"]
  },
  {
    id: "curated-livros-02",
    image: imageUrl("photo-1497633762265-9d179a990aa6"),
    priority: 117,
    topic: "livros",
    terms: ["livro", "livros", "leitura", "poesia", "romance", "cultura"]
  },
  {
    id: "curated-livros-03",
    image: imageUrl("photo-1524995997946-a1c2e315a42f"),
    priority: 113,
    topic: "livros",
    terms: ["livro", "livros", "biblioteca", "estante", "leitor"]
  },
  {
    id: "curated-tecnologia-01",
    image: imageUrl("photo-1516321318423-f06f85e504b3"),
    priority: 116,
    topic: "tecnologia",
    terms: ["tecnologia", "gadget", "setup"]
  },
  {
    id: "curated-skincare-01",
    image: imageUrl("photo-1598440947619-2c35fc9aa908"),
    priority: 116,
    topic: "skincare",
    terms: ["beleza", "skincare", "autocuidado"]
  },
  {
    id: "curated-bem-estar-01",
    image: imageUrl("photo-1540555700478-4be289fbecef"),
    priority: 126,
    topic: "bem-estar",
    terms: [
      "bem-estar",
      "relaxamento",
      "aromatica",
      "aromatizador",
      "almofada",
      "spa",
      "descanso"
    ]
  },
  {
    id: "curated-arte-01",
    image: imageUrl("photo-1513364776144-60967b0f800f"),
    priority: 124,
    topic: "arte",
    terms: [
      "arte",
      "desenho",
      "pintura",
      "caneta",
      "canetas",
      "artistico",
      "artistica",
      "artisticas",
      "criativo"
    ]
  },
  {
    id: "curated-jogos-01",
    image: imageUrl("photo-1610890716171-6b1bb98ffd09"),
    priority: 113,
    topic: "jogos",
    terms: ["jogo de tabuleiro", "tabuleiro", "familia"]
  },
  {
    id: "curated-cozinha-01",
    image: imageUrl("photo-1556909114-f6e7ad7d3136"),
    priority: 124,
    topic: "cozinha",
    terms: ["cozinha", "cozinheiro", "gastronomia", "culinaria", "receita"]
  },
  {
    id: "curated-cozinha-02",
    image: imageUrl("photo-1556912172-45b7abe8b7e1"),
    priority: 122,
    topic: "cozinha",
    terms: ["cozinha", "utensilio", "culinaria", "tempero"]
  },
  {
    id: "curated-leitura-luz-01",
    image: imageUrl("photo-1507473885765-e6ed057f782c"),
    priority: 127,
    topic: "luminaria",
    terms: ["luz", "leitura", "luminaria", "abajur", "led"]
  },
  {
    id: "curated-casa-01",
    image: imageUrl("photo-1555041469-a586c61ea9bc"),
    priority: 122,
    topic: "casa-decoracao",
    terms: ["casa", "casa nova", "decoracao", "ambiente"]
  },
  {
    id: "curated-casa-02",
    image: imageUrl("photo-1586023492125-27b2c045efd7"),
    priority: 120,
    topic: "casa-decoracao",
    terms: ["casa", "decoracao", "luminaria", "porta retrato"]
  },
  {
    id: "curated-home-office-01",
    image: imageUrl("photo-1497366754035-f200968a6e72"),
    priority: 121,
    topic: "home-office",
    terms: ["home office", "trabalho", "escritorio", "produtividade"]
  },
  {
    id: "curated-papelaria-01",
    image: imageUrl("photo-1455390582262-044cdead277a"),
    priority: 132,
    topic: "papelaria",
    terms: [
      "planner",
      "agenda",
      "caderno",
      "diario",
      "gratidao",
      "papelaria",
      "anotacoes",
      "escrita"
    ]
  },
  {
    id: "curated-lembranca-01",
    image: imageUrl("photo-1513885535751-8b9238bd345a"),
    priority: 121,
    topic: "generico-presente",
    terms: ["mensagem", "mensagens", "lembranca", "lembrancas", "pote", "cartao", "bilhete"]
  },
  {
    id: "curated-fitness-01",
    image: imageUrl("photo-1571019613454-1cb2f99b2d8b"),
    priority: 120,
    topic: "fitness",
    terms: ["fitness", "academia", "treino", "vida ativa"]
  },
  {
    id: "curated-viagem-01",
    image: imageUrl("photo-1534802046520-4f27db7f3ae5"),
    priority: 119,
    topic: "viagem",
    terms: ["viagem", "viajante", "mochileiro", "aventura"]
  },
  {
    id: "curated-plantas-01",
    image: imageUrl("photo-1485955900006-10f4d324d411"),
    priority: 126,
    topic: "jardim",
    terms: ["planta", "plantas", "suculenta", "suculentas", "jardim", "verde"]
  },
  {
    id: "curated-crianca-01",
    image: imageUrl("photo-1515488042361-ee00e0ddd4e4"),
    priority: 119,
    topic: "crianca",
    terms: ["crianca", "brinquedo", "dia das criancas", "lego"]
  },
  {
    id: "curated-bebe-01",
    image: imageUrl("photo-1555252333-9f8e92e65df9"),
    priority: 118,
    topic: "bebe",
    terms: ["bebe", "recem nascido", "cha de bebe", "pelucia"]
  },
  {
    id: "curated-natal-01",
    image: imageUrl("photo-1512909006721-3d6018887383"),
    priority: 118,
    topic: "natal",
    terms: ["natal", "presente de natal", "familia"]
  },
  {
    id: "curated-romantico-01",
    image: imageUrl("photo-1519741497674-611481863552"),
    priority: 118,
    topic: "romantico",
    terms: ["namorada", "namorado", "esposa", "marido", "romantico"]
  },
  {
    id: "curated-gamer-01",
    image: imageUrl("photo-1593305841991-05c297ba4575"),
    priority: 117,
    topic: "gamer",
    terms: ["gamer", "games", "jogos", "setup"]
  },
  {
    id: "curated-flores-01",
    image: imageUrl("photo-1481391319762-47dff72954d9"),
    priority: 116,
    topic: "flores",
    terms: ["flor", "flores", "buque", "delicado"]
  },
  {
    id: "curated-artesanato-01",
    image: imageUrl("photo-1452860606245-08befc0ff44b"),
    priority: 122,
    topic: "artesanato",
    terms: ["artesanato", "artesanal", "feito a mao", "manual", "craft"]
  },
  {
    id: "curated-presente-01",
    image: imageUrl("photo-1549465220-1a8b9238cd48"),
    priority: 10,
    topic: "generico-presente",
    terms: ["presente", "surpresa", "afeto"]
  }
];

export const productImageRepository: Record<string, string> = {
  "echo-dot": imageUrl("photo-1543512214-318c7553f230"),
  kindle: imageUrl("photo-1519682337058-a94d519337bc"),
  "kit-cafe": imageUrl("photo-1559056199-641a0ac8b55e"),
  massageador: imageUrl("photo-1540555700478-4be289fbecef"),
  "fone-bluetooth": imageUrl("photo-1505740420928-5e560c06d30e"),
  "luminaria-led": imageUrl("photo-1507473885765-e6ed057f782c"),
  "garrafa-termica": imageUrl("photo-1602143407151-7111542de6e8"),
  "jogo-tabuleiro": imageUrl("photo-1610890716171-6b1bb98ffd09"),
  "organizador-cabos": imageUrl("photo-1516321318423-f06f85e504b3"),
  "moka-cafeteira": imageUrl("photo-1442512595331-e89e73853f31"),
  "chaveiro-smart": imageUrl("photo-1523293182086-7651a899d37f"),
  "caneca-termica": imageUrl("photo-1509042239860-f550ce710b93"),
  "skincare-kit": imageUrl("photo-1598440947619-2c35fc9aa908"),
  "suporte-celular": imageUrl("photo-1512428813834-c702c7702b78"),
  "lego-classic": imageUrl("photo-1587654780291-39c9404d746b"),
  "livro-infantil": imageUrl("photo-1512820790803-83ca734da794"),
  "pelucia-bebe": imageUrl("photo-1555252333-9f8e92e65df9"),
  "quebra-cabeca": imageUrl("photo-1611996575749-79a3a250f948"),
  "kit-desenho": imageUrl("photo-1513364776144-60967b0f800f"),
  "porta-retrato-casal": imageUrl("photo-1519741497674-611481863552"),
  planner: imageUrl("photo-1455390582262-044cdead277a"),
  "kit-ciencia": imageUrl("photo-1532094349884-543bc11b234d"),
  "brinquedo-musical": imageUrl("photo-1507838153414-b4b713384a76"),
  "fone-infantil": imageUrl("photo-1613040809024-b4ef7ba99bc3"),
  "mochila-escolar": imageUrl("photo-1553062407-98eeb64c6a62"),
  "tablet-infantil": imageUrl("photo-1585771724684-38269d6639fd")
};

export const popularSearchImageRepository: SearchImage[] = [
  ...curatedSearchImages,
  ...topicImages.flatMap((topic) =>
    Array.from({ length: topic.count }, (_, index) => ({
      id: `${topic.topic}-${index + 1}`,
      image: flickrImageUrl(topic.query, topic.startLock + index),
      priority: topic.priority - Math.floor(index / 4),
      terms: topic.terms,
      topic: topic.topic
    }))
  )
];

export const imageRepositorySize =
  Object.keys(productImageRepository).length + popularSearchImageRepository.length;

export function getProductImage(input: GiftImageInput) {
  const productImage = input.id ? productImageRepository[input.id] : undefined;

  if (productImage && !input.usedImages?.includes(productImage)) {
    return productImage;
  }

  return getGiftImage({
    ...input,
    fallback: productImage ?? input.fallback
  });
}

export function hasProductImage(id: string) {
  return Boolean(productImageRepository[id]);
}

export function getGiftImage(input: GiftImageInput) {
  const primaryText = normalize(
    [
      input.id,
      input.title,
      input.description,
      input.searchQuery,
      input.categories?.join(" "),
      input.personas?.join(" "),
      input.occasions?.join(" ")
    ]
      .filter(Boolean)
      .join(" ")
  );
  const contextText = normalize(
    [
      input.interests?.join(" "),
      input.recipient,
      input.ageGroup,
      input.occasion,
      input.style
    ]
      .filter(Boolean)
      .join(" ")
  );
  const seedText = [
    primaryText,
    contextText,
    input.id,
    input.title,
    input.searchQuery
  ].join("|");
  const matches = popularSearchImageRepository
    .map((entry, index) => ({
      entry,
      index,
      primaryScore: scoreTerms(entry.terms, primaryText, 3),
      contextScore: scoreTerms(entry.terms, contextText, 1)
    }))
    .map((match) => ({
      ...match,
      score: match.entry.priority + match.primaryScore + match.contextScore
    }))
    .filter((match) => match.primaryScore > 0 || match.contextScore > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.primaryScore - a.primaryScore ||
        a.index - b.index
    );

  if (matches.length > 0) {
    const bestScore = matches[0].score;
    const pool = matches.filter((match) => match.score >= bestScore - 8);
    const availablePool = pool.filter(
      (match) => !input.usedImages?.includes(match.entry.image)
    );

    if (availablePool.length > 0) {
      const curatedPool = availablePool.filter((match) =>
        match.entry.id.startsWith("curated-")
      );
      const selectedPool = curatedPool.length > 0 ? curatedPool : availablePool;

      return selectedPool[stableIndex(seedText, selectedPool.length)].entry.image;
    }

    const availableMatches = matches.filter(
      (match) => !input.usedImages?.includes(match.entry.image)
    );

    if (availableMatches.length > 0) {
      const curatedMatches = availableMatches.filter((match) =>
        match.entry.id.startsWith("curated-")
      );
      const selectedMatches =
        curatedMatches.length > 0 ? curatedMatches : availableMatches;

      return selectedMatches[
        stableIndex(seedText, Math.min(selectedMatches.length, 24))
      ].entry.image;
    }

    return pool[stableIndex(seedText, pool.length)].entry.image;
  }

  const genericImages = popularSearchImageRepository.filter(
    (entry) => entry.topic === "generico-presente"
  );
  const availableGenericImages = genericImages.filter(
    (entry) => !input.usedImages?.includes(entry.image)
  );
  const selectedGenericImages =
    availableGenericImages.length > 0 ? availableGenericImages : genericImages;

  return (
    selectedGenericImages[stableIndex(seedText, selectedGenericImages.length)]?.image ??
    input.fallback ??
    popularSearchImageRepository[popularSearchImageRepository.length - 1].image
  );
}

function scoreTerms(terms: string[], text: string, weight: number) {
  return terms.reduce((sum, term) => {
    const normalizedTerm = normalize(term);

    if (text.includes(normalizedTerm)) {
      return sum + normalizedTerm.length * weight;
    }

    return sum;
  }, 0);
}

function stableIndex(value: string, length: number) {
  if (length <= 1) {
    return 0;
  }

  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash % length;
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
