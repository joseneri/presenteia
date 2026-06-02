export type VisualGiftAnchor = {
  id: string;
  label: string;
  description: string;
  searchQuery: string;
  categories: string[];
  terms: string[];
};

export const visualGiftCatalog: VisualGiftAnchor[] = [
  {
    id: "kit-cafe-gourmet",
    label: "Kit de cafe gourmet",
    description: "Cafes especiais, biscoitos ou acessorios para ritual de cafe.",
    searchQuery: "kit cafe gourmet presente",
    categories: ["cafe", "gastronomia"],
    terms: ["cafe", "kit cafe", "cafe especial", "gourmet", "cesta cafe"]
  },
  {
    id: "cafeteira-moka",
    label: "Cafeteira moka ou espresso",
    description: "Cafeteira compacta para quem gosta de cafe forte em casa.",
    searchQuery: "cafeteira moka presente",
    categories: ["cafe", "cozinha"],
    terms: ["cafeteira", "moka", "espresso", "cafe"]
  },
  {
    id: "caneca-termica",
    label: "Caneca ou copo termico",
    description: "Caneca util para cafe, cha, trabalho ou estudo.",
    searchQuery: "caneca termica presente",
    categories: ["cafe", "util"],
    terms: ["caneca", "caneca termica", "copo termico", "xicara"]
  },
  {
    id: "livros-leitura",
    label: "Livro ou presente de leitura",
    description: "Livro fisico, box ou acessorio para quem gosta de ler.",
    searchQuery: "livro presente leitura",
    categories: ["leitura", "cultura"],
    terms: ["livro", "livros", "leitura", "biblioteca"]
  },
  {
    id: "kindle-leitor",
    label: "Leitor digital",
    description: "Leitor digital para rotina de leitura e praticidade.",
    searchQuery: "kindle leitor digital",
    categories: ["leitura", "tecnologia"],
    terms: ["kindle", "leitor", "leitura", "livro"]
  },
  {
    id: "fone-bluetooth",
    label: "Fone bluetooth",
    description: "Fone para musica, chamadas, academia ou concentracao.",
    searchQuery: "fone bluetooth presente",
    categories: ["tecnologia", "musica"],
    terms: ["fone", "headphone", "bluetooth", "musica"]
  },
  {
    id: "caixa-som",
    label: "Caixa de som bluetooth",
    description: "Caixa de som para casa, encontros, praia ou churrasco.",
    searchQuery: "caixa de som bluetooth presente",
    categories: ["tecnologia", "musica"],
    terms: ["caixa de som", "speaker", "bluetooth", "audio casa"]
  },
  {
    id: "smart-home",
    label: "Item de casa inteligente",
    description: "Echo, lampada, tomada ou acessorio para automacao simples.",
    searchQuery: "casa inteligente presente alexa",
    categories: ["tecnologia", "casa"],
    terms: ["casa inteligente", "smart home", "alexa", "lampada smart"]
  },
  {
    id: "setup-trabalho",
    label: "Acessorio de setup ou escritorio",
    description: "Item para mesa, produtividade, cabos, suporte ou organizacao.",
    searchQuery: "acessorio setup escritorio presente",
    categories: ["trabalho", "tecnologia"],
    terms: ["setup", "escritorio", "trabalho", "produtividade", "organizador"]
  },
  {
    id: "papelaria-planner",
    label: "Planner ou papelaria bonita",
    description: "Planner, caderno, bloquinho ou kit de papelaria.",
    searchQuery: "planner papelaria presente",
    categories: ["papelaria", "trabalho"],
    terms: ["planner", "agenda", "caderno", "papelaria", "anotacoes"]
  },
  {
    id: "vaso-decorativo",
    label: "Vaso decorativo",
    description: "Vaso, ceramica, arranjo seco ou detalhe bonito para ambiente.",
    searchQuery: "vaso decorativo ceramica flores secas",
    categories: ["decoracao", "casa"],
    terms: ["vaso", "vaso decorativo", "ceramica", "flores secas", "arranjo seco"]
  },
  {
    id: "porta-retrato",
    label: "Porta-retrato ou quadro afetivo",
    description: "Porta-retrato, quadro pequeno ou lembranca com foto.",
    searchQuery: "porta retrato decorativo presente",
    categories: ["decoracao", "afetivo"],
    terms: ["porta retrato", "foto", "memorias", "decoracao"]
  },
  {
    id: "luminaria",
    label: "Luminaria ou luz de leitura",
    description: "Luminaria de mesa, abajur, luz para leitura ou setup.",
    searchQuery: "luminaria mesa leitura presente",
    categories: ["decoracao", "util"],
    terms: ["luminaria", "abajur", "luz", "leitura", "led"]
  },
  {
    id: "plantas-casa",
    label: "Planta ou terrario",
    description: "Planta de casa, suculenta, terrario ou vaso verde.",
    searchQuery: "planta casa suculenta terrario presente",
    categories: ["decoracao", "casa"],
    terms: ["planta", "plantas", "suculenta", "terrario", "vaso"]
  },
  {
    id: "skincare-kit",
    label: "Kit de skincare",
    description: "Produtos de autocuidado, beleza e rotina de pele.",
    searchQuery: "kit skincare presente",
    categories: ["beleza", "autocuidado"],
    terms: ["skincare", "beleza", "autocuidado", "cosmetico"]
  },
  {
    id: "spa-casa",
    label: "Experiencia de spa em casa",
    description: "Velas, oleos, sais, roupao ou itens de relaxamento.",
    searchQuery: "kit spa em casa presente",
    categories: ["bem-estar", "experiencia"],
    terms: ["spa", "bem-estar", "relaxamento", "vela", "banho"]
  },
  {
    id: "massageador",
    label: "Massageador ou conforto",
    description: "Massageador, almofada ou item para descanso.",
    searchQuery: "massageador presente relaxamento",
    categories: ["bem-estar", "util"],
    terms: ["massageador", "relaxamento", "descanso", "bem-estar"]
  },
  {
    id: "fitness-garrafa",
    label: "Garrafa ou item fitness",
    description: "Garrafa, acessorio de treino ou cuidado para rotina ativa.",
    searchQuery: "garrafa termica academia presente",
    categories: ["fitness", "util"],
    terms: ["fitness", "academia", "treino", "garrafa", "vida ativa"]
  },
  {
    id: "utensilios-cozinha",
    label: "Utensilios de cozinha",
    description: "Utensilios, tabuas, medidores ou acessorios culinarios.",
    searchQuery: "utensilios cozinha presente",
    categories: ["cozinha", "gastronomia"],
    terms: ["cozinha", "utensilio", "culinaria", "receita"]
  },
  {
    id: "livro-receitas",
    label: "Livro de receitas",
    description: "Livro ou caderno de receitas para cozinhar em familia.",
    searchQuery: "livro de receitas presente",
    categories: ["cozinha", "leitura"],
    terms: ["livro de receitas", "receita", "cozinha", "culinaria"]
  },
  {
    id: "temperos-gourmet",
    label: "Kit de temperos gourmet",
    description: "Temperos, especiarias, molhos ou ervas para cozinhar melhor.",
    searchQuery: "kit temperos gourmet presente",
    categories: ["cozinha", "gastronomia"],
    terms: ["tempero", "temperos", "ervas", "gourmet", "cozinha"]
  },
  {
    id: "vinho-jantar",
    label: "Vinho ou kit jantar",
    description: "Vinho, tacas ou itens para um jantar especial.",
    searchQuery: "kit vinho jantar presente",
    categories: ["gastronomia", "experiencia"],
    terms: ["vinho", "jantar", "tacas", "romantico"]
  },
  {
    id: "chocolate-gourmet",
    label: "Chocolate gourmet",
    description: "Chocolate, doce especial ou caixa de degustacao.",
    searchQuery: "chocolate gourmet presente",
    categories: ["gastronomia", "doce"],
    terms: ["chocolate", "doce", "gourmet", "sobremesa"]
  },
  {
    id: "jogo-tabuleiro",
    label: "Jogo de tabuleiro",
    description: "Jogo para casal, familia, amigos ou noite em casa.",
    searchQuery: "jogo de tabuleiro presente",
    categories: ["jogos", "experiencia"],
    terms: ["jogo de tabuleiro", "tabuleiro", "familia", "casal"]
  },
  {
    id: "gamer-acessorio",
    label: "Acessorio gamer",
    description: "Controle, gift card, suporte ou item para setup gamer.",
    searchQuery: "acessorio gamer presente",
    categories: ["games", "tecnologia"],
    terms: ["gamer", "games", "controle", "console", "setup"]
  },
  {
    id: "kit-arte",
    label: "Kit de arte ou desenho",
    description: "Canetas, sketchbook, pintura ou material criativo.",
    searchQuery: "kit desenho arte presente",
    categories: ["arte", "criativo"],
    terms: ["arte", "desenho", "pintura", "canetas", "criativo"]
  },
  {
    id: "artesanato",
    label: "Kit artesanal ou feito a mao",
    description: "Presente manual, craft, bordado ou kit criativo.",
    searchQuery: "kit artesanato presente",
    categories: ["criativo", "artesanal"],
    terms: ["artesanato", "artesanal", "feito a mao", "manual"]
  },
  {
    id: "viagem-organizador",
    label: "Organizador de viagem",
    description: "Necessaire, mala, mochila ou organizadores para viajar.",
    searchQuery: "organizador viagem presente",
    categories: ["viagem", "util"],
    terms: ["viagem", "necessaire", "mala", "mochila", "organizador de viagem"]
  },
  {
    id: "praia-verao",
    label: "Item de praia ou verao",
    description: "Bolsa, cooler, toalha, oculos ou acessorio de sol.",
    searchQuery: "kit praia verao presente",
    categories: ["praia", "lazer"],
    terms: ["praia", "verao", "sol", "piscina", "cooler"]
  },
  {
    id: "pet-caes",
    label: "Presente para cachorro",
    description: "Brinquedo, coleira, cama ou mimo para cachorro.",
    searchQuery: "presente cachorro brinquedo pet",
    categories: ["pet", "casa"],
    terms: ["cachorro", "cao", "pet dog", "coleira", "brinquedo cachorro"]
  },
  {
    id: "pet-gatos",
    label: "Presente para gato",
    description: "Arranhador, brinquedo, cama ou mimo para gato.",
    searchQuery: "presente gato brinquedo arranhador",
    categories: ["pet", "casa"],
    terms: ["gato", "gatos", "arranhador", "brinquedo gato"]
  },
  {
    id: "brinquedo-crianca",
    label: "Brinquedo infantil",
    description: "Brinquedo educativo, blocos, pelucia ou jogo infantil.",
    searchQuery: "brinquedo educativo presente crianca",
    categories: ["crianca", "brinquedo"],
    terms: ["crianca", "brinquedo", "educativo", "lego", "blocos"]
  },
  {
    id: "bebe-sensorial",
    label: "Presente para bebe",
    description: "Pelucia, brinquedo sensorial ou item delicado para bebe.",
    searchQuery: "brinquedo sensorial bebe presente",
    categories: ["bebe", "brinquedo"],
    terms: ["bebe", "pelucia", "sensorial", "recem nascido"]
  },
  {
    id: "flores-buque",
    label: "Flores ou buque",
    description: "Buque, flores secas ou arranjo delicado.",
    searchQuery: "buque flores presente",
    categories: ["flores", "romantico"],
    terms: ["flor", "flores", "buque", "delicado"]
  },
  {
    id: "experiencia-oficina",
    label: "Experiencia ou oficina",
    description: "Aula, curso, workshop, degustacao ou programa especial.",
    searchQuery: "voucher experiencia oficina presente",
    categories: ["experiencia", "criativo"],
    terms: ["experiencia", "oficina", "aula", "curso", "workshop"]
  },
  {
    id: "assinatura-caixa",
    label: "Assinatura ou caixa mensal",
    description: "Clube, assinatura, caixa surpresa ou presente recorrente.",
    searchQuery: "assinatura caixa presente",
    categories: ["assinatura", "experiencia"],
    terms: ["assinatura", "clube", "caixa mensal", "box"]
  }
];

export function getVisualAnchor(id: string | undefined) {
  const normalizedId = normalizeVisualText(id ?? "");

  return visualGiftCatalog.find((anchor) => anchor.id === normalizedId);
}

export function findBestVisualAnchor(input: {
  title?: string;
  description?: string;
  searchQuery?: string;
  categories?: string[];
}) {
  const text = normalizeVisualText(
    [
      input.title,
      input.description,
      input.searchQuery,
      input.categories?.join(" ")
    ]
      .filter(Boolean)
      .join(" ")
  );
  const scored = visualGiftCatalog
    .map((anchor, index) => ({
      anchor,
      index,
      score: anchor.terms.reduce((sum, term) => {
        const normalizedTerm = normalizeVisualText(term);
        return text.includes(normalizedTerm) ? sum + normalizedTerm.length : sum;
      }, 0)
    }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index);

  return scored[0]?.anchor;
}

export function getVisualCatalogForPrompt() {
  return visualGiftCatalog.map((anchor) => ({
    id: anchor.id,
    label: anchor.label,
    categories: anchor.categories,
    terms: anchor.terms.slice(0, 5)
  }));
}

function normalizeVisualText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}
