export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  sections: { title: string; body: string }[];
  relatedProductIds: string[];
};

export const articles: Article[] = [
  {
    slug: "presentes-para-mae",
    title: "Presentes para mae: ideias uteis, carinhosas e sem erro",
    description:
      "Sugestoes para maes praticas, vaidosas, tecnologicas e que merecem descanso.",
    date: "2026-06-01",
    relatedProductIds: ["massageador", "kindle", "kit-cafe"],
    sections: [
      {
        title: "Comece pelo estilo de rotina",
        body: "O melhor presente para mae costuma nascer da rotina dela: descanso, leitura, cafe, casa ou tecnologia. Antes de pensar no produto, pense no momento do dia que voce quer melhorar."
      },
      {
        title: "Evite o presente generico demais",
        body: "Flores e chocolates funcionam, mas um item que resolve uma dor real costuma ter mais impacto. Um massageador, um Kindle ou um kit de cafe mostram cuidado sem complicar."
      }
    ]
  },
  {
    slug: "presentes-criativos",
    title: "Presentes criativos para fugir do obvio",
    description:
      "Ideias com cara de escolha pensada para aniversario, amigo secreto e Natal.",
    date: "2026-06-01",
    relatedProductIds: ["jogo-tabuleiro", "luminaria-led", "kit-cafe"],
    sections: [
      {
        title: "Criativo nao precisa ser estranho",
        body: "Um bom presente criativo tem utilidade ou vira experiencia. Jogos, itens de setup e kits tematicos costumam acertar porque convidam a pessoa a usar de verdade."
      },
      {
        title: "Personalize pelo interesse",
        body: "A diferenca esta em conectar a ideia com algo que a pessoa ja curte: cafe, games, leitura, cozinha, decoracao ou noites com amigos."
      }
    ]
  },
  {
    slug: "presentes-ate-100-reais",
    title: "Presentes ate 100 reais que parecem bem escolhidos",
    description:
      "Opcoes baratas para amigo secreto, lembrancinhas e presentes de ultima hora.",
    date: "2026-06-01",
    relatedProductIds: ["organizador-cabos", "garrafa-termica", "luminaria-led"],
    sections: [
      {
        title: "Barato nao precisa parecer improvisado",
        body: "A chave e escolher algo especifico para a rotina da pessoa. Organizadores, garrafas e luminarias funcionam bem porque sao usados com frequencia."
      },
      {
        title: "Prefira utilidade clara",
        body: "Quando o orcamento e baixo, fuja de objetos decorativos muito pessoais. Itens de uso diario tem chance maior de agradar."
      }
    ]
  }
];
