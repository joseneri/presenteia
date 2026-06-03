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

export type SearchImage = {
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

const productAsset = (fileName: string) => `/products/${fileName}.svg`;

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
    topic: "experiencia",
    priority: 97,
    query: "experience,gift,workshop",
    count: 5,
    startLock: 1940,
    terms: ["experiencia", "oficina", "aula", "workshop", "vivencia", "ingresso"]
  },
  {
    topic: "curso",
    priority: 95,
    query: "online,course,learning",
    count: 5,
    startLock: 1950,
    terms: ["curso", "aula", "aprendizado", "aprender", "estudo", "idioma"]
  },
  {
    topic: "assinatura",
    priority: 94,
    query: "subscription,box,gift",
    count: 5,
    startLock: 1960,
    terms: ["assinatura", "clube", "mensal", "box", "streaming", "servico"]
  },
  {
    topic: "moda-acessorios",
    priority: 93,
    query: "fashion,accessories,gift",
    count: 5,
    startLock: 1970,
    terms: ["moda", "acessorio", "acessorios", "bolsa", "carteira", "estilo"]
  },
  {
    topic: "relogio",
    priority: 92,
    query: "watch,accessory,gift",
    count: 5,
    startLock: 1980,
    terms: ["relogio", "smartwatch", "pulseira", "acessorio premium"]
  },
  {
    topic: "perfume",
    priority: 94,
    query: "perfume,fragrance,gift",
    count: 5,
    startLock: 1990,
    terms: ["perfume", "fragrancia", "aroma", "cheiro", "colonia"]
  },
  {
    topic: "barbearia",
    priority: 92,
    query: "beard,grooming,barber",
    count: 5,
    startLock: 2010,
    terms: ["barba", "barbear", "barbearia", "grooming", "cuidados masculinos"]
  },
  {
    topic: "esportes",
    priority: 92,
    query: "sports,equipment,gift",
    count: 5,
    startLock: 2020,
    terms: ["esporte", "esportes", "corrida", "futebol", "tenis", "ativo"]
  },
  {
    topic: "yoga-meditacao",
    priority: 91,
    query: "yoga,meditation,wellness",
    count: 5,
    startLock: 2030,
    terms: ["yoga", "meditacao", "mindfulness", "tapete", "respiracao"]
  },
  {
    topic: "bike",
    priority: 90,
    query: "bicycle,cycling,gift",
    count: 5,
    startLock: 2040,
    terms: ["bike", "bicicleta", "ciclismo", "pedal", "capacete"]
  },
  {
    topic: "cinema-series",
    priority: 90,
    query: "movie,cinema,popcorn",
    count: 5,
    startLock: 2050,
    terms: ["cinema", "filme", "filmes", "serie", "series", "pipoca"]
  },
  {
    topic: "viagem-organizacao",
    priority: 91,
    query: "travel,organizer,luggage",
    count: 5,
    startLock: 2060,
    terms: ["mala", "necessaire", "passaporte", "organizador de viagem", "viagem"]
  },
  {
    topic: "camping",
    priority: 89,
    query: "camping,outdoor,gift",
    count: 5,
    startLock: 2070,
    terms: ["camping", "trilha", "outdoor", "aventura", "natureza"]
  },
  {
    topic: "papelaria-premium",
    priority: 91,
    query: "premium,stationery,desk",
    count: 5,
    startLock: 2080,
    terms: ["caneta", "caneta premium", "moleskine", "caderno premium", "escrita"]
  },
  {
    topic: "organizacao",
    priority: 91,
    query: "organizer,storage,home",
    count: 5,
    startLock: 2090,
    terms: ["organizacao", "organizador", "arrumacao", "minimalista", "pratico"]
  },
  {
    topic: "games-digitais",
    priority: 91,
    query: "videogame,controller,gaming",
    count: 5,
    startLock: 2100,
    terms: ["videogame", "controle", "console", "gift card", "jogos digitais"]
  },
  {
    topic: "festa-aniversario",
    priority: 90,
    query: "birthday,party,gift",
    count: 5,
    startLock: 2110,
    terms: ["aniversario", "parabens", "festa", "celebrar", "comemoracao"]
  },
  {
    topic: "casamento",
    priority: 90,
    query: "wedding,gift,home",
    count: 5,
    startLock: 2120,
    terms: ["casamento", "noivos", "presente de casamento", "lista de casamento"]
  },
  {
    topic: "montessori",
    priority: 89,
    query: "montessori,toys,children",
    count: 5,
    startLock: 2130,
    terms: ["montessori", "sensorial", "educativo", "brinquedo educativo", "desenvolvimento"]
  },
  {
    topic: "personalizado",
    priority: 88,
    query: "personalized,gift,custom",
    count: 5,
    startLock: 2140,
    terms: ["personalizado", "personalizada", "nome gravado", "customizado", "sob medida"]
  },
  {
    topic: "joias-bijuterias",
    priority: 94,
    query: "jewelry,gift,accessory",
    count: 5,
    startLock: 2150,
    terms: ["joia", "joias", "colar", "brinco", "anel", "bijuteria", "semijoia"]
  },
  {
    topic: "maquiagem",
    priority: 93,
    query: "makeup,beauty,gift",
    count: 5,
    startLock: 2160,
    terms: ["maquiagem", "make", "batom", "paleta", "rimel", "pincel"]
  },
  {
    topic: "cabelo",
    priority: 92,
    query: "haircare,beauty,gift",
    count: 5,
    startLock: 2170,
    terms: ["cabelo", "haircare", "secador", "chapinha", "cacheado", "cronograma capilar"]
  },
  {
    topic: "banho-spa",
    priority: 92,
    query: "bath,spa,gift",
    count: 5,
    startLock: 2180,
    terms: ["banho", "sais de banho", "sabonete", "toalha", "spa em casa", "hidratante"]
  },
  {
    topic: "velas-aromas",
    priority: 93,
    query: "candles,aroma,home",
    count: 5,
    startLock: 2190,
    terms: ["vela", "velas", "aromatizador", "difusor", "essencia", "aromas"]
  },
  {
    topic: "cama-conforto",
    priority: 90,
    query: "bedroom,cozy,blanket",
    count: 5,
    startLock: 2200,
    terms: ["cama", "manta", "cobertor", "pijama", "travesseiro", "conforto"]
  },
  {
    topic: "mesa-posta",
    priority: 91,
    query: "tableware,dining,gift",
    count: 5,
    startLock: 2210,
    terms: ["mesa posta", "jantar", "prato", "taça", "talheres", "aparelho de jantar"]
  },
  {
    topic: "churrasco",
    priority: 92,
    query: "barbecue,grill,gift",
    count: 5,
    startLock: 2220,
    terms: ["churrasco", "churrasqueira", "carne", "grelha", "kit churrasco"]
  },
  {
    topic: "cerveja-artesanal",
    priority: 90,
    query: "craft,beer,gift",
    count: 5,
    startLock: 2230,
    terms: ["cerveja", "cerveja artesanal", "chope", "copo de cerveja", "petisco"]
  },
  {
    topic: "bar-drinks",
    priority: 90,
    query: "cocktail,bar,gift",
    count: 5,
    startLock: 2240,
    terms: ["drink", "drinks", "cocktail", "bar", "gin", "whisky", "coqueteleira"]
  },
  {
    topic: "doces-confeitaria",
    priority: 89,
    query: "dessert,baking,gift",
    count: 5,
    startLock: 2250,
    terms: ["confeitaria", "bolo", "doce", "doces", "cookies", "cupcake"]
  },
  {
    topic: "piquenique",
    priority: 88,
    query: "picnic,basket,gift",
    count: 5,
    startLock: 2260,
    terms: ["piquenique", "cesta", "parque", "toalha picnic", "lanche"]
  },
  {
    topic: "plantas-casa",
    priority: 104,
    query: "vase,ceramic,flowers",
    count: 5,
    startLock: 2270,
    terms: [
      "planta de casa",
      "vaso",
      "vasos",
      "vaso decorativo",
      "ceramica",
      "flores secas",
      "arranjo seco",
      "suculenta",
      "terrario",
      "jiboia",
      "samambaia"
    ]
  },
  {
    topic: "aquario",
    priority: 84,
    query: "aquarium,fish,tank",
    count: 5,
    startLock: 2280,
    terms: ["aquario", "peixe", "betta", "aquarismo", "tanque"]
  },
  {
    topic: "pet-caes",
    priority: 90,
    query: "dog,pet,gift",
    count: 5,
    startLock: 2290,
    terms: ["cachorro", "cao", "pet dog", "coleira", "brinquedo cachorro"]
  },
  {
    topic: "pet-gatos",
    priority: 90,
    query: "cat,pet,gift",
    count: 5,
    startLock: 2300,
    terms: ["gato", "gatos", "arranhador", "brinquedo gato", "catnip"]
  },
  {
    topic: "bebida-quente",
    priority: 89,
    query: "hot,chocolate,tea",
    count: 5,
    startLock: 2310,
    terms: ["chocolate quente", "capuccino", "bebida quente", "inverno", "xicara"]
  },
  {
    topic: "frio-inverno",
    priority: 88,
    query: "winter,cozy,gift",
    count: 5,
    startLock: 2320,
    terms: ["frio", "inverno", "cachecol", "luva", "meia", "quentinho"]
  },
  {
    topic: "verao-outdoor",
    priority: 88,
    query: "summer,outdoor,gift",
    count: 5,
    startLock: 2330,
    terms: ["verao", "outdoor", "sol", "cooler", "oculos de sol", "boné"]
  },
  {
    topic: "carro-acessorios",
    priority: 88,
    query: "car,accessories,gift",
    count: 5,
    startLock: 2340,
    terms: ["carro", "automotivo", "suporte veicular", "aspirador automotivo", "motorista"]
  },
  {
    topic: "moto",
    priority: 86,
    query: "motorcycle,accessories,gift",
    count: 5,
    startLock: 2350,
    terms: ["moto", "motociclista", "capacete", "luva moto", "motorcycle"]
  },
  {
    topic: "audio-casa",
    priority: 91,
    query: "speaker,audio,home",
    count: 5,
    startLock: 2360,
    terms: ["caixa de som", "speaker", "som ambiente", "audio casa", "bluetooth"]
  },
  {
    topic: "smart-home",
    priority: 92,
    query: "smart,home,technology",
    count: 5,
    startLock: 2370,
    terms: ["casa inteligente", "smart home", "lampada smart", "tomada inteligente", "alexa"]
  },
  {
    topic: "seguranca-casa",
    priority: 87,
    query: "home,security,camera",
    count: 5,
    startLock: 2380,
    terms: ["camera de seguranca", "seguranca", "videoporteiro", "fechadura digital"]
  },
  {
    topic: "setup-desk",
    priority: 93,
    query: "desk,setup,workspace",
    count: 5,
    startLock: 2390,
    terms: ["desk setup", "mousepad", "teclado", "monitor", "mesa gamer", "estacao de trabalho"]
  },
  {
    topic: "ergonomia",
    priority: 91,
    query: "ergonomic,office,chair",
    count: 5,
    startLock: 2400,
    terms: ["ergonomia", "cadeira", "apoio lombar", "apoio de pes", "postura"]
  },
  {
    topic: "professor",
    priority: 88,
    query: "teacher,desk,books",
    count: 5,
    startLock: 2410,
    terms: ["professor", "professora", "docente", "sala de aula", "ensino"]
  },
  {
    topic: "medicina-saude",
    priority: 86,
    query: "health,medical,gift",
    count: 5,
    startLock: 2420,
    terms: ["medicina", "medico", "enfermeira", "saude", "hospital", "plantao"]
  },
  {
    topic: "arquitetura-design",
    priority: 87,
    query: "architecture,design,desk",
    count: 5,
    startLock: 2430,
    terms: ["arquitetura", "design", "decorador", "desenho tecnico", "interiores"]
  },
  {
    topic: "engenharia-diy",
    priority: 87,
    query: "engineering,diy,tools",
    count: 5,
    startLock: 2440,
    terms: ["engenharia", "engenheiro", "projeto", "maker", "ferramenta precisa"]
  },
  {
    topic: "adolescente",
    priority: 90,
    query: "teen,room,gift",
    count: 5,
    startLock: 2450,
    terms: ["adolescente", "teen", "quarto jovem", "jovem", "estilo jovem"]
  },
  {
    topic: "idosos-conforto",
    priority: 89,
    query: "senior,comfort,gift",
    count: 5,
    startLock: 2460,
    terms: ["idoso", "idosa", "avos", "avó", "avô", "conforto para idosos"]
  },
  {
    topic: "recem-casados",
    priority: 89,
    query: "newlyweds,home,gift",
    count: 5,
    startLock: 2470,
    terms: ["recem casados", "recem-casados", "primeira casa", "vida a dois"]
  },
  {
    topic: "casa-nova",
    priority: 92,
    query: "new,home,gift",
    count: 5,
    startLock: 2480,
    terms: ["casa nova", "apartamento novo", "mudanca", "novo lar", "open house"]
  },
  {
    topic: "formatura-carreira",
    priority: 90,
    query: "graduation,career,gift",
    count: 5,
    startLock: 2490,
    terms: ["formatura", "formando", "carreira", "diploma", "novo emprego"]
  },
  {
    topic: "nascimento-bebe",
    priority: 91,
    query: "newborn,baby,gift",
    count: 5,
    startLock: 2500,
    terms: ["nascimento", "recem nascido", "maternidade", "enxoval", "bebe novo"]
  },
  {
    topic: "fotolivro-memorias",
    priority: 89,
    query: "photo,album,memories",
    count: 5,
    startLock: 2510,
    terms: ["album", "fotolivro", "memorias", "recordacao", "lembrancas", "foto impressa"]
  },
  {
    topic: "instrumentos-musicais",
    priority: 88,
    query: "musical,instrument,gift",
    count: 5,
    startLock: 2520,
    terms: ["violao", "teclado musical", "instrumento musical", "musico", "ukulele"]
  },
  {
    topic: "karaoke",
    priority: 86,
    query: "karaoke,microphone,party",
    count: 5,
    startLock: 2530,
    terms: ["karaoke", "microfone", "cantar", "festa musical", "cantoria"]
  },
  {
    topic: "colecionaveis",
    priority: 88,
    query: "collectible,figure,gift",
    count: 5,
    startLock: 2540,
    terms: ["colecionavel", "colecionaveis", "action figure", "funko", "miniatura"]
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
    id: "curated-vaso-01",
    image: imageUrl("photo-1485955900006-10f4d324d411"),
    priority: 142,
    topic: "vaso-decorativo",
    terms: [
      "vaso",
      "vasos",
      "vaso decorativo",
      "ceramica",
      "flores secas",
      "arranjo seco",
      "decorativo"
    ]
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
  "echo-dot": imageUrl("photo-1519558260268-cde7e03a0152"),
  kindle: imageUrl("photo-1603406136476-85d8c3ec76a5"),
  "kit-cafe": imageUrl("photo-1495474472287-4d71bcdd2085"),
  massageador: imageUrl("photo-1611908200005-b898ddde09cf"),
  "fone-bluetooth": imageUrl("photo-1505740420928-5e560c06d30e"),
  "luminaria-led": imageUrl("photo-1507473885765-e6ed057f782c"),
  "garrafa-termica": imageUrl("photo-1566408701071-cb5c545b6240"),
  "jogo-tabuleiro": imageUrl("photo-1610890716171-6b1bb98ffd09"),
  "organizador-cabos": imageUrl("photo-1760348213270-7cd00b8c3405"),
  "moka-cafeteira": imageUrl("photo-1604946327250-fbef76816bfe"),
  "chaveiro-smart": imageUrl("photo-1676276550349-580c49631496"),
  "caneca-termica": imageUrl("photo-1509042239860-f550ce710b93"),
  "skincare-kit": imageUrl("photo-1598440947619-2c35fc9aa908"),
  "suporte-celular": imageUrl("photo-1698314440014-3badb1e9c938"),
  "lego-classic": imageUrl("photo-1515488042361-ee00e0ddd4e4"),
  "livro-infantil": imageUrl("photo-1512820790803-83ca734da794"),
  "pelucia-bebe": imageUrl("photo-1555252333-9f8e92e65df9"),
  "quebra-cabeca": imageUrl("photo-1610890716171-6b1bb98ffd09"),
  "kit-desenho": imageUrl("photo-1513364776144-60967b0f800f"),
  "porta-retrato-casal": imageUrl("photo-1586023492125-27b2c045efd7"),
  planner: imageUrl("photo-1455390582262-044cdead277a"),
  "kit-ciencia": imageUrl("photo-1515488042361-ee00e0ddd4e4"),
  "brinquedo-musical": imageUrl("photo-1515488042361-ee00e0ddd4e4"),
  "fone-infantil": imageUrl("photo-1505740420928-5e560c06d30e"),
  "mochila-escolar": imageUrl("photo-1534802046520-4f27db7f3ae5"),
  "tablet-infantil": imageUrl("photo-1516321318423-f06f85e504b3"),
  "kit-cafe-gourmet": imageUrl("photo-1559056199-641a0ac8b55e"),
  "cafeteira-moka": imageUrl("photo-1604946327250-fbef76816bfe"),
  "livros-leitura": imageUrl("photo-1497633762265-9d179a990aa6"),
  "kindle-leitor": imageUrl("photo-1603406136476-85d8c3ec76a5"),
  "caixa-som": imageUrl("photo-1536571195711-1b796f9f9f7f"),
  "smart-home": imageUrl("photo-1519558260268-cde7e03a0152"),
  "setup-trabalho": imageUrl("photo-1497366754035-f200968a6e72"),
  "papelaria-planner": imageUrl("photo-1455390582262-044cdead277a"),
  "vaso-decorativo": imageUrl("photo-1485955900006-10f4d324d411"),
  "porta-retrato": imageUrl("photo-1586023492125-27b2c045efd7"),
  luminaria: imageUrl("photo-1507473885765-e6ed057f782c"),
  "plantas-casa": imageUrl("photo-1485955900006-10f4d324d411"),
  "spa-casa": imageUrl("photo-1540555700478-4be289fbecef"),
  "fitness-garrafa": imageUrl("photo-1566408701071-cb5c545b6240"),
  "utensilios-cozinha": imageUrl("photo-1556912172-45b7abe8b7e1"),
  "livro-receitas": imageUrl("photo-1556909114-f6e7ad7d3136"),
  "temperos-gourmet": imageUrl("photo-1556912172-45b7abe8b7e1"),
  "vinho-jantar": imageUrl("photo-1528825871115-3581a5387919"),
  "chocolate-gourmet": imageUrl("photo-1549465220-1a8b9238cd48"),
  "gamer-acessorio": imageUrl("photo-1593305841991-05c297ba4575"),
  "kit-arte": imageUrl("photo-1513364776144-60967b0f800f"),
  artesanato: imageUrl("photo-1452860606245-08befc0ff44b"),
  "viagem-organizador": imageUrl("photo-1534802046520-4f27db7f3ae5"),
  "praia-verao": imageUrl("photo-1507525428034-b723cf961d3e"),
  "pet-caes": imageUrl("photo-1552053831-71594a27632d"),
  "pet-gatos": imageUrl("photo-1514888286974-6c03e2ca1dba"),
  "brinquedo-crianca": imageUrl("photo-1515488042361-ee00e0ddd4e4"),
  "bebe-sensorial": imageUrl("photo-1555252333-9f8e92e65df9"),
  "flores-buque": imageUrl("photo-1481391319762-47dff72954d9"),
  "experiencia-oficina": imageUrl("photo-1452860606245-08befc0ff44b"),
  "assinatura-caixa": imageUrl("photo-1549465220-1a8b9238cd48")
};

const productFallbackImageRepository: Record<string, string> = {
  "echo-dot": productAsset("echo-dot"),
  kindle: productAsset("kindle"),
  "kit-cafe": productAsset("kit-cafe"),
  massageador: productAsset("massageador"),
  "fone-bluetooth": productAsset("fone-bluetooth"),
  "luminaria-led": productAsset("luminaria-led"),
  "garrafa-termica": productAsset("garrafa-termica"),
  "jogo-tabuleiro": productAsset("jogo-tabuleiro"),
  "organizador-cabos": productAsset("organizador-cabos"),
  "moka-cafeteira": productAsset("moka-cafeteira"),
  "chaveiro-smart": productAsset("chaveiro-smart"),
  "caneca-termica": productAsset("caneca-termica"),
  "skincare-kit": productAsset("skincare-kit"),
  "suporte-celular": productAsset("suporte-celular"),
  "lego-classic": productAsset("jogo-tabuleiro"),
  "livro-infantil": productAsset("kindle"),
  "pelucia-bebe": productAsset("skincare-kit"),
  "quebra-cabeca": productAsset("jogo-tabuleiro"),
  "kit-desenho": productAsset("luminaria-led"),
  "porta-retrato-casal": productAsset("porta-retrato"),
  planner: productAsset("kindle"),
  "kit-ciencia": productAsset("jogo-tabuleiro"),
  "brinquedo-musical": productAsset("skincare-kit"),
  "fone-infantil": productAsset("fone-bluetooth"),
  "mochila-escolar": productAsset("garrafa-termica"),
  "tablet-infantil": productAsset("kindle"),
  "kit-cafe-gourmet": productAsset("kit-cafe"),
  "cafeteira-moka": productAsset("moka-cafeteira"),
  "livros-leitura": productAsset("kindle"),
  "kindle-leitor": productAsset("kindle"),
  "caixa-som": productAsset("echo-dot"),
  "smart-home": productAsset("echo-dot"),
  "setup-trabalho": productAsset("organizador-cabos"),
  "papelaria-planner": productAsset("kindle"),
  "vaso-decorativo": productAsset("vaso-decorativo"),
  "porta-retrato": productAsset("porta-retrato"),
  luminaria: productAsset("luminaria-led"),
  "plantas-casa": productAsset("luminaria-led"),
  "spa-casa": productAsset("spa-casa"),
  "fitness-garrafa": productAsset("garrafa-termica"),
  "utensilios-cozinha": productAsset("moka-cafeteira"),
  "livro-receitas": productAsset("kindle"),
  "temperos-gourmet": productAsset("kit-cafe"),
  "vinho-jantar": productAsset("caneca-termica"),
  "chocolate-gourmet": productAsset("kit-cafe"),
  "gamer-acessorio": productAsset("fone-bluetooth"),
  "kit-arte": productAsset("luminaria-led"),
  artesanato: productAsset("organizador-cabos"),
  "viagem-organizador": productAsset("garrafa-termica"),
  "praia-verao": productAsset("garrafa-termica"),
  "pet-caes": productAsset("jogo-tabuleiro"),
  "pet-gatos": productAsset("jogo-tabuleiro"),
  "brinquedo-crianca": productAsset("jogo-tabuleiro"),
  "bebe-sensorial": productAsset("skincare-kit"),
  "flores-buque": productAsset("vaso-decorativo"),
  "experiencia-oficina": productAsset("kindle"),
  "assinatura-caixa": productAsset("kit-cafe")
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
  const fallbackProductImage = input.id
    ? productFallbackImageRepository[input.id]
    : undefined;

  if (productImage && !input.usedImages?.includes(productImage)) {
    return productImage;
  }

  return getGiftImage({
    ...input,
    fallback: fallbackProductImage ?? productImage ?? input.fallback
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
