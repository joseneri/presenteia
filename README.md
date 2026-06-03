# Presenteia

MVP de um recomendador de presentes com IA, artigos estáticos e links afiliados.

## Rodar localmente

```bash
npm install
npm run dev
```

Crie um `.env.local` opcional:

```bash
OPENAI_API_KEY=...
MARKET_TRENDS_INFLUENCE=0.35
MARKET_TRENDS_CATEGORY=all
```

Sem a chave, o recomendador usa um ranking local baseado nas respostas do quiz.

`MARKET_TRENDS_INFLUENCE` vai de `0` a `1`: `0` ignora a lista de mercado,
`0.35` usa como desempate moderado e `1` prioriza fortemente a lista.
`MARKET_TRENDS_CATEGORY` pode ser `all` ou uma categoria do arquivo
`data/market-trends-2026.md`, como `beleza-e-cuidados`, `casa-e-decoracao`,
`tecnologia-e-gadgets`, `cozinha-e-cafe` ou `fitness-e-bem-estar`.
