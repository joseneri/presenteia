export type Guide = {
  slug: string;
  title: string;
  description: string;
  persona: string;
  occasion: string;
  interest: string;
  productIds: string[];
  keywords: string[];
};

export const guides: Guide[] = [
  {
    slug: "presentes-para-mae",
    title: "Presentes para mae",
    description: "Ideias para maes que gostam de conforto, leitura, casa e cafe.",
    persona: "mae",
    occasion: "dia das maes",
    interest: "autocuidado",
    keywords: ["presente mae", "dia das maes presente", "presente para mae"],
    productIds: ["massageador", "kindle", "kit-cafe", "echo-dot"]
  },
  {
    slug: "presentes-para-pai",
    title: "Presentes para pai",
    description: "Ideias uteis para pais que gostam de cafe, tecnologia e rotina pratica.",
    persona: "pai",
    occasion: "dia dos pais",
    interest: "util",
    keywords: ["presente pai", "dia dos pais presente", "presente para pai"],
    productIds: ["caneca-termica", "echo-dot", "moka-cafeteira", "suporte-celular"]
  },
  {
    slug: "presentes-para-namorada",
    title: "Presentes para namorada",
    description: "Sugestoes carinhosas para autocuidado, leitura, decoracao e tecnologia.",
    persona: "namorada",
    occasion: "dia dos namorados",
    interest: "autocuidado",
    keywords: ["presente namorada", "dia dos namorados namorada", "presente romantico namorada"],
    productIds: ["skincare-kit", "kindle", "luminaria-led", "fone-bluetooth"]
  },
  {
    slug: "presentes-para-namorado",
    title: "Presentes para namorado",
    description: "Sugestoes para tecnologia, setup, musica e rotina.",
    persona: "namorado",
    occasion: "dia dos namorados",
    interest: "tecnologia",
    keywords: ["presente namorado", "dia dos namorados namorado", "presente para namorado"],
    productIds: ["fone-bluetooth", "echo-dot", "organizador-cabos", "kindle"]
  },
  {
    slug: "presentes-para-amigo-secreto",
    title: "Presentes para amigo secreto",
    description: "Presentes faceis de agradar sem estourar o orcamento.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "util",
    keywords: ["amigo secreto", "presente amigo secreto", "ideia amigo secreto"],
    productIds: ["chaveiro-smart", "caneca-termica", "organizador-cabos", "garrafa-termica"]
  },
  {
    slug: "presentes-ate-50-reais",
    title: "Presentes ate 50 reais",
    description: "Lembrancas baratas, praticas e com cara de escolha pensada.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "barato",
    keywords: ["presente ate 50 reais", "presente barato", "presente economico"],
    productIds: ["chaveiro-smart", "suporte-celular", "organizador-cabos"]
  },
  {
    slug: "presentes-ate-100-reais",
    title: "Presentes ate 100 reais",
    description: "Achados uteis para amigo secreto e lembrancas bem escolhidas.",
    persona: "amigo",
    occasion: "amigo secreto",
    interest: "util",
    keywords: ["presente ate 100 reais", "presente barato bom", "presente 100 reais"],
    productIds: ["organizador-cabos", "garrafa-termica", "luminaria-led"]
  },
  {
    slug: "presentes-criativos",
    title: "Presentes criativos",
    description: "Ideias para fugir do obvio sem abrir mao de utilidade.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "criativo",
    keywords: ["presente criativo", "presente diferente", "presente original"],
    productIds: ["jogo-tabuleiro", "luminaria-led", "moka-cafeteira", "kit-cafe"]
  },
  {
    slug: "presentes-tecnologia",
    title: "Presentes de tecnologia",
    description: "Achados para quem gosta de gadgets, setup e rotina conectada.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "tecnologia",
    keywords: ["presente tecnologia", "presente gadget", "presente para quem gosta de tecnologia"],
    productIds: ["echo-dot", "fone-bluetooth", "suporte-celular", "organizador-cabos"]
  },
  {
    slug: "presentes-para-gamers",
    title: "Presentes para gamers",
    description: "Itens para setup, som, organizacao e ambiente de jogo.",
    persona: "gamer",
    occasion: "aniversario",
    interest: "games",
    keywords: ["presente gamer", "presente para gamer", "presente quem joga"],
    productIds: ["fone-bluetooth", "luminaria-led", "organizador-cabos"]
  },
  {
    slug: "presentes-para-avo",
    title: "Presentes para avo e ava",
    description: "Itens praticos e afetuosos para avos que merecem carinho e conforto.",
    persona: "avo",
    occasion: "aniversario",
    interest: "conforto",
    keywords: ["presente avo", "presente ava", "presente para avos"],
    productIds: ["echo-dot", "massageador", "caneca-termica", "kit-cafe"]
  },
  {
    slug: "presentes-para-criancas",
    title: "Presentes para criancas",
    description: "Brinquedos educativos e divertidos para criancas de diferentes idades.",
    persona: "crianca",
    occasion: "dia das criancas",
    interest: "educativo",
    keywords: ["presente crianca", "brinquedo educativo", "presente dia das criancas"],
    productIds: ["lego-classic", "kit-ciencia", "livro-infantil", "quebra-cabeca"]
  },
  {
    slug: "presentes-para-bebe",
    title: "Presentes para bebe",
    description: "Itens seguros, macios e estimulantes para bebes e recen-nascidos.",
    persona: "bebe",
    occasion: "cha de bebe",
    interest: "brinquedo",
    keywords: ["presente bebe", "presente recem-nascido", "cha de bebe presente"],
    productIds: ["pelucia-bebe", "brinquedo-musical", "livro-infantil"]
  },
  {
    slug: "presentes-para-adolescentes",
    title: "Presentes para adolescentes",
    description: "Presentes atuais, tecnologicos e que adolescentes realmente usam.",
    persona: "adolescente",
    occasion: "aniversario",
    interest: "tecnologia",
    keywords: ["presente adolescente", "presente teen", "presente para jovem"],
    productIds: ["fone-bluetooth", "fone-infantil", "mochila-escolar", "luminaria-led"]
  },
  {
    slug: "presentes-para-irma",
    title: "Presentes para irma",
    description: "Ideias para presentear a irma em qualquer data com cuidado e personalidade.",
    persona: "irma",
    occasion: "aniversario",
    interest: "autocuidado",
    keywords: ["presente irma", "presente para irma", "ideia presente irma"],
    productIds: ["skincare-kit", "kindle", "fone-bluetooth", "luminaria-led"]
  },
  {
    slug: "presentes-para-irmao",
    title: "Presentes para irmao",
    description: "Sugestoes diretas e praticas para presentear o irmao.",
    persona: "irmao",
    occasion: "aniversario",
    interest: "tecnologia",
    keywords: ["presente irmao", "presente para irmao", "ideia presente irmao"],
    productIds: ["fone-bluetooth", "echo-dot", "organizador-cabos", "jogo-tabuleiro"]
  },
  {
    slug: "presentes-para-esposa",
    title: "Presentes para esposa",
    description: "Ideias para surpreender a esposa no aniversario, Dia das Maes ou sem motivo.",
    persona: "esposa",
    occasion: "aniversario",
    interest: "autocuidado",
    keywords: ["presente esposa", "presente para esposa", "presente mulher casada"],
    productIds: ["skincare-kit", "massageador", "kindle", "luminaria-led"]
  },
  {
    slug: "presentes-para-marido",
    title: "Presentes para marido",
    description: "Presentes praticos que o marido vai realmente usar e apreciar.",
    persona: "marido",
    occasion: "aniversario",
    interest: "util",
    keywords: ["presente marido", "presente para marido", "presente homem casado"],
    productIds: ["echo-dot", "moka-cafeteira", "fone-bluetooth", "massageador"]
  },
  {
    slug: "presentes-para-sogra",
    title: "Presentes para sogra",
    description: "Opcoes elegantes e neutras para presentear a mae do parceiro ou parceira.",
    persona: "sogra",
    occasion: "dia das maes",
    interest: "util",
    keywords: ["presente sogra", "presente mae do namorado", "como presentear sogra"],
    productIds: ["kit-cafe", "skincare-kit", "caneca-termica", "kindle"]
  },
  {
    slug: "presentes-para-melhor-amiga",
    title: "Presentes para melhor amiga",
    description: "Ideias cheias de significado para a amiga que conhece voce de verdade.",
    persona: "melhor amiga",
    occasion: "aniversario",
    interest: "autocuidado",
    keywords: ["presente melhor amiga", "presente bff", "presente amiga especial"],
    productIds: ["skincare-kit", "kindle", "luminaria-led", "jogo-tabuleiro"]
  },
  {
    slug: "presentes-para-chefe",
    title: "Presentes para chefe",
    description: "Presentes elegantes e de bom gosto para o chefe ou lider.",
    persona: "chefe",
    occasion: "amigo secreto",
    interest: "trabalho",
    keywords: ["presente chefe", "presente lider", "amigo secreto chefe"],
    productIds: ["planner", "caneca-termica", "kit-cafe", "moka-cafeteira"]
  },
  {
    slug: "presentes-para-professor",
    title: "Presentes para professor",
    description: "Ideias para homenagear o professor no Dia dos Professores ou formatura.",
    persona: "professor",
    occasion: "dia dos professores",
    interest: "leitura",
    keywords: ["presente professor", "dia dos professores", "presente formatura professor"],
    productIds: ["planner", "caneca-termica", "kindle", "kit-cafe"]
  },
  {
    slug: "presentes-home-office",
    title: "Presentes para home office",
    description: "Itens que melhoram o setup, o conforto e a produtividade de quem trabalha em casa.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "trabalho",
    keywords: ["presente home office", "presente setup trabalho", "presente produtividade"],
    productIds: ["luminaria-led", "fone-bluetooth", "organizador-cabos", "suporte-celular"]
  },
  {
    slug: "presentes-para-quem-mora-sozinho",
    title: "Presentes para quem mora sozinho",
    description: "Itens essenciais e praticos para quem esta montando a primeira casa.",
    persona: "amigo",
    occasion: "casa nova",
    interest: "casa",
    keywords: ["presente quem mora sozinho", "presente casa nova", "presente primeira casa"],
    productIds: ["echo-dot", "moka-cafeteira", "garrafa-termica", "luminaria-led"]
  },
  {
    slug: "presentes-para-casal",
    title: "Presentes para casal",
    description: "Ideias para presentear os dois juntos em casamento ou casa nova.",
    persona: "casal",
    occasion: "casamento",
    interest: "casa",
    keywords: ["presente casal", "presente casamento", "presente para dois"],
    productIds: ["echo-dot", "jogo-tabuleiro", "porta-retrato-casal", "moka-cafeteira"]
  },
  {
    slug: "presentes-para-noiva",
    title: "Presentes para noiva",
    description: "Sugestoes para cha de panela, despedida de solteira e casamento.",
    persona: "noiva",
    occasion: "casamento",
    interest: "autocuidado",
    keywords: ["presente noiva", "cha de panela", "despedida de solteira presente"],
    productIds: ["skincare-kit", "massageador", "kindle", "porta-retrato-casal"]
  },
  {
    slug: "presentes-para-formatura",
    title: "Presentes de formatura",
    description: "Ideias para celebrar a conclusao de curso com um presente memoravel.",
    persona: "amigo",
    occasion: "formatura",
    interest: "trabalho",
    keywords: ["presente formatura", "presente formando", "presente conclusao curso"],
    productIds: ["kindle", "planner", "fone-bluetooth", "mochila-escolar"]
  },
  {
    slug: "presentes-natal",
    title: "Presentes de Natal",
    description: "Guia para presentes de Natal para toda a familia.",
    persona: "familia",
    occasion: "natal",
    interest: "util",
    keywords: ["presente natal", "presente de natal", "o que dar de natal"],
    productIds: ["echo-dot", "kindle", "kit-cafe", "jogo-tabuleiro"]
  },
  {
    slug: "presentes-amigos-secreto-trabalho",
    title: "Amigo secreto do trabalho",
    description: "Presentes corporativos neutros, uteis e dentro do orcamento.",
    persona: "colega",
    occasion: "amigo secreto",
    interest: "trabalho",
    keywords: ["amigo secreto trabalho", "presente corporativo", "presente colega trabalho"],
    productIds: ["caneca-termica", "planner", "organizador-cabos", "garrafa-termica"]
  },
  {
    slug: "presentes-dia-dos-namorados",
    title: "Presentes Dia dos Namorados",
    description: "Ideias romanticas para surpreender no dia 12 de junho.",
    persona: "namorado",
    occasion: "dia dos namorados",
    interest: "romantico",
    keywords: ["presente dia dos namorados", "presente romantico", "12 de junho presente"],
    productIds: ["skincare-kit", "kindle", "porta-retrato-casal", "fone-bluetooth"]
  },
  {
    slug: "presentes-para-fitness",
    title: "Presentes para quem e fitness",
    description: "Itens para academia, treino, recuperacao e vida ativa.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "fitness",
    keywords: ["presente fitness", "presente academia", "presente pessoa ativa"],
    productIds: ["fone-bluetooth", "garrafa-termica", "massageador"]
  },
  {
    slug: "presentes-para-viajante",
    title: "Presentes para viajante",
    description: "Itens compactos e praticos para quem vive viajando.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "viagem",
    keywords: ["presente viajante", "presente viagem", "presente mochileiro"],
    productIds: ["kindle", "fone-bluetooth", "garrafa-termica", "mochila-escolar"]
  },
  {
    slug: "presentes-amantes-cafe",
    title: "Presentes para amantes de cafe",
    description: "Do kit basico ao gourmet para quem leva o cafe a serio.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "cafe",
    keywords: ["presente cafe", "presente amante de cafe", "presente gourmet cafe"],
    productIds: ["kit-cafe", "moka-cafeteira", "caneca-termica", "echo-dot"]
  },
  {
    slug: "presentes-leitores",
    title: "Presentes para leitores",
    description: "Ideias para bibliofilo, leitor casual e quem esta comecando a ler.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "leitura",
    keywords: ["presente leitor", "presente para quem le", "presente bibliofilo"],
    productIds: ["kindle", "luminaria-led", "caneca-termica"]
  },
  {
    slug: "presentes-cozinheiros",
    title: "Presentes para cozinheiros",
    description: "Itens para quem ama a cozinha: rituais, utensilios e tecnologia.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "cozinha",
    keywords: ["presente cozinheiro", "presente gastronomia", "presente para quem cozinha"],
    productIds: ["moka-cafeteira", "kit-cafe", "echo-dot"]
  },
  {
    slug: "presentes-para-crianca-5-anos",
    title: "Presentes para crianca de 5 anos",
    description: "Brinquedos que estimulam criatividade e imaginacao para essa fase.",
    persona: "crianca",
    occasion: "aniversario",
    interest: "criativo",
    keywords: ["presente 5 anos", "brinquedo crianca 5 anos", "presente aniversario 5 anos"],
    productIds: ["lego-classic", "kit-desenho", "livro-infantil", "quebra-cabeca"]
  },
  {
    slug: "presentes-para-crianca-10-anos",
    title: "Presentes para crianca de 10 anos",
    description: "Desafios, ciencia e tecnologia para a fase de transicao.",
    persona: "crianca",
    occasion: "aniversario",
    interest: "educativo",
    keywords: ["presente 10 anos", "brinquedo 10 anos", "presente pre-adolescente"],
    productIds: ["kit-ciencia", "fone-infantil", "quebra-cabeca", "jogo-tabuleiro"]
  },
  {
    slug: "presentes-dia-das-criancas",
    title: "Presentes Dia das Criancas",
    description: "Guia completo para o Dia das Criancas por idade e interesse.",
    persona: "crianca",
    occasion: "dia das criancas",
    interest: "brinquedo",
    keywords: ["dia das criancas presente", "presente 12 de outubro", "brinquedo crianca"],
    productIds: ["lego-classic", "kit-ciencia", "kit-desenho", "quebra-cabeca"]
  },
  {
    slug: "presentes-para-cunhada",
    title: "Presentes para cunhada",
    description: "Opcoes elegantes e seguras para a cunhada em qualquer ocasiao.",
    persona: "cunhada",
    occasion: "aniversario",
    interest: "util",
    keywords: ["presente cunhada", "presente para cunhada", "ideia presente cunhada"],
    productIds: ["skincare-kit", "kit-cafe", "caneca-termica", "luminaria-led"]
  },
  {
    slug: "presentes-para-colega",
    title: "Presentes para colega",
    description: "Simples, uteis e sem gafe para colegas de trabalho ou faculdade.",
    persona: "colega",
    occasion: "amigo secreto",
    interest: "trabalho",
    keywords: ["presente colega", "presente colega trabalho", "presente amigo faculdade"],
    productIds: ["caneca-termica", "planner", "garrafa-termica", "organizador-cabos"]
  },
  {
    slug: "presentes-para-padrinho",
    title: "Presentes para padrinho e madrinha",
    description: "Lembrancas especiais para quem voce escolheu como padrinho ou madrinha.",
    persona: "padrinho",
    occasion: "casamento",
    interest: "util",
    keywords: ["presente padrinho", "presente madrinha", "lembranca padrinho casamento"],
    productIds: ["kit-cafe", "caneca-termica", "skincare-kit", "planner"]
  },
  {
    slug: "presentes-pascoa",
    title: "Presentes de Pascoa",
    description: "Alternativas ao chocolate: presentes com mais utilidade e durabilidade.",
    persona: "familia",
    occasion: "pascoa",
    interest: "util",
    keywords: ["presente pascoa", "alternativa ovo pascoa", "pascoa presente diferente"],
    productIds: ["kit-cafe", "livro-infantil", "lego-classic", "caneca-termica"]
  },
  {
    slug: "presentes-recen-casados",
    title: "Presentes para recem-casados",
    description: "Itens para a casa nova do casal na fase inicial do casamento.",
    persona: "casal",
    occasion: "casamento",
    interest: "casa",
    keywords: ["presente recem casado", "presente casa nova casal", "presente casal novo"],
    productIds: ["echo-dot", "moka-cafeteira", "kit-cafe", "luminaria-led"]
  },
  {
    slug: "presentes-acima-300",
    title: "Presentes acima de R$300",
    description: "Opcoes premium para quem quer dar um presente realmente especial.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "premium",
    keywords: ["presente premium", "presente caro qualidade", "presente especial acima 300"],
    productIds: ["kindle", "echo-dot", "fone-bluetooth", "tablet-infantil"]
  },
  {
    slug: "presentes-para-recen-formado",
    title: "Presentes para recen-formado",
    description: "Comemore a conquista com um presente que apoia a proxima fase.",
    persona: "amigo",
    occasion: "formatura",
    interest: "trabalho",
    keywords: ["presente recen formado", "presente formatura", "presente conclusao faculdade"],
    productIds: ["kindle", "mochila-escolar", "fone-bluetooth", "planner"]
  },
  {
    slug: "presentes-ultima-hora",
    title: "Presentes de ultima hora",
    description: "Classicos que funcionam sempre, mesmo com pouco tempo para escolher.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "util",
    keywords: ["presente ultima hora", "presente urgente", "esqueci aniversario"],
    productIds: ["caneca-termica", "kit-cafe", "chaveiro-smart", "garrafa-termica"]
  },
  {
    slug: "presentes-para-quem-tem-tudo",
    title: "Presentes para quem tem tudo",
    description: "Estrategias e itens certos para a pessoa mais dificil de presentear.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "criativo",
    keywords: ["presente quem tem tudo", "pessoa dificil presentear", "presente sem ideia"],
    productIds: ["kit-cafe", "kindle", "massageador", "jogo-tabuleiro"]
  },
  {
    slug: "presentes-para-quem-trabalha-muito",
    title: "Presentes para quem trabalha muito",
    description: "Itens que oferecem conforto, eficiencia e bem-estar para pessoas ocupadas.",
    persona: "colega",
    occasion: "aniversario",
    interest: "trabalho",
    keywords: ["presente workaholic", "presente quem trabalha muito", "presente produtividade"],
    productIds: ["massageador", "fone-bluetooth", "caneca-termica", "planner"]
  },
  {
    slug: "presentes-para-estudantes",
    title: "Presentes para estudantes",
    description: "Itens que facilitam os estudos, a organizacao e a rotina academica.",
    persona: "estudante",
    occasion: "aniversario",
    interest: "estudo",
    keywords: ["presente estudante", "presente universitario", "presente para quem estuda"],
    productIds: ["kindle", "fone-bluetooth", "luminaria-led", "planner"]
  },
  {
    slug: "presentes-para-medicos-enfermeiros",
    title: "Presentes para profissionais de saude",
    description: "Itens praticos e de bem-estar para medicos, enfermeiros e profissionais de saude.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "saude",
    keywords: ["presente medico", "presente enfermeiro", "presente profissional saude"],
    productIds: ["garrafa-termica", "massageador", "fone-bluetooth", "caneca-termica"]
  },
  {
    slug: "presentes-para-professora",
    title: "Presentes para professora",
    description: "Ideias especiais para homenagear a professora com carinho.",
    persona: "professora",
    occasion: "dia dos professores",
    interest: "leitura",
    keywords: ["presente professora", "dia dos professores professora", "homenagem professora"],
    productIds: ["kindle", "caneca-termica", "planner", "kit-cafe"]
  },
  {
    slug: "presentes-minimalistas",
    title: "Presentes para minimalistas",
    description: "Opcoes discretas, uteis e sem excesso para quem prefere o essencial.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "minimalista",
    keywords: ["presente minimalista", "presente discreto", "presente simples util"],
    productIds: ["caneca-termica", "garrafa-termica", "organizador-cabos", "suporte-celular"]
  },
  {
    slug: "presentes-para-mochileiros",
    title: "Presentes para mochileiros",
    description: "Itens leves, compactos e essenciais para aventuras e viagens longas.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "viagem",
    keywords: ["presente mochileiro", "presente backpacker", "presente viagem aventura"],
    productIds: ["mochila-escolar", "garrafa-termica", "fone-bluetooth", "kindle"]
  },
  {
    slug: "presentes-para-pets",
    title: "Presentes para donos de pets",
    description: "Ideias para presentear quem ama seus animais de estimacao.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "pets",
    keywords: ["presente dono de pet", "presente amante de animais", "presente para quem tem cachorro"],
    productIds: ["caneca-termica", "jogo-tabuleiro", "garrafa-termica"]
  },
  {
    slug: "presentes-sustentaveis",
    title: "Presentes sustentaveis",
    description: "Opcoes com maior durabilidade, menor impacto e valor real.",
    persona: "amigo",
    occasion: "aniversario",
    interest: "sustentabilidade",
    keywords: ["presente sustentavel", "presente ecologico", "presente com proposito"],
    productIds: ["garrafa-termica", "caneca-termica", "kindle", "organizador-cabos"]
  },
  {
    slug: "presentes-sem-data",
    title: "Presentes sem motivo: surpresas inesperadas",
    description: "Presentes espontaneos para demonstrar afeto sem precisar de uma data especial.",
    persona: "amigo",
    occasion: "sem data",
    interest: "afeto",
    keywords: ["presente sem data", "presente surpresa", "presente espontaneo"],
    productIds: ["kit-cafe", "caneca-termica", "luminaria-led", "livro-infantil"]
  }
];
