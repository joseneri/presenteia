# PresenteIA Agent Guide

Use este guia antes de fazer qualquer mudanca relevante no projeto. Atualize este arquivo sempre que descobrir uma regra, padrao, fluxo ou decisao que ajude a trabalhar melhor no PresenteIA.

## Objetivo Do Projeto

PresenteIA e um site Next.js de recomendacao de presentes com:

- quiz/recomendador com IA e fallback local;
- guias estaticos de presentes por pessoa, data, interesse e faixa de preco;
- artigos de blog para SEO;
- cards de produtos com links afiliados da Amazon;
- foco em busca organica no Brasil.

O objetivo principal e combinar conteudo util, indexavel e comercial com paginas rapidas, claras e confiaveis.

## Stack E Comandos

- Next.js App Router, React, TypeScript.
- Dados editoriais ficam em arquivos TypeScript, nao em CMS.
- Icones: `lucide-react`.
- Imagens remotas liberadas no `next.config.ts`: `images.unsplash.com` e `loremflickr.com`.

Comandos principais:

```bash
npm run lint
npm run typecheck
npm run build
npm run dev -- --hostname 127.0.0.1 --port 49152
```

Observacao local: portas baixas como `3000` e `3001` podem falhar com `EACCES` nesta maquina. Use uma porta alta, por exemplo `49152`.

## Arquivos-Chave

- `src/data/products.ts`: catalogo base de produtos, imagens, categorias, personas, ocasioes, interesses e links afiliados.
- `src/data/guides.ts`: paginas em `/presentes/[slug]`. Cada guia deve ter `slug`, titulo, descricao, persona, ocasiao, interesse, keywords e `productIds`.
- `src/data/articles.ts`: artigos em `/blog/[slug]`. Cada artigo pode ter capa, secoes, imagens internas, dicas, keywords e produtos relacionados.
- `src/app/presentes/page.tsx`: listagem de guias. Mantem destaque sazonal no topo.
- `src/app/presentes/[slug]/page.tsx`: pagina dinamica de guia. Se existir artigo com mesmo slug, puxa capa e conteudo editorial.
- `src/app/blog/page.tsx`: listagem do blog. Prioriza artigos sazonais de Dia dos Namorados e usa cards com imagem.
- `src/app/blog/[slug]/page.tsx`: pagina dinamica de artigo, com JSON-LD de `Article`.
- `src/app/sitemap.ts`: inclui guias e artigos automaticamente.
- `src/components/ProductGrid.tsx` e `src/components/ProductCard.tsx`: grade e card de produtos.
- `src/app/globals.css`: estilos globais, cards, grids, capas e responsividade.
- `data/market-trends-2026.md`: tendencias de mercado usadas como contexto/ranking.

## Fluxo Antes De Implementar

1. Leia este `AGENTS.md`.
2. Confira os arquivos relevantes com `rg` ou `Get-Content`.
3. Entenda se a mudanca e de conteudo, UX, SEO, recomendacao, afiliado ou infraestrutura.
4. Edite de forma localizada, respeitando os dados centralizados.
5. Atualize este guia se descobrir um novo padrao ou armadilha.
6. Rode verificacoes proporcionais ao risco.

## Padroes De Conteudo E SEO

- Conteudo e em portugues do Brasil.
- Preferir slugs claros, minusculos e com hifen.
- Para guias e artigos, usar termos de busca reais no titulo, descricao e keywords sem keyword stuffing.
- Artigos devem ter:
  - `slug`;
  - `title`;
  - `description`;
  - `date`;
  - `keywords`;
  - `relatedProductIds`;
  - `coverImage` quando possivel;
  - secoes com corpo util e, quando cabivel, `tips` e imagens internas.
- Guias devem apontar para produtos existentes em `products.ts`.
- Quando criar guia com potencial editorial forte, crie ou alinhe um artigo com o mesmo slug para enriquecer `/presentes/[slug]`.
- Datas sazonais importantes devem aparecer cedo em `/blog` e `/presentes` durante a janela de busca.
- Para Dia dos Namorados, termos fortes incluem `12 de junho`, `namorada`, `namorado`, `casal`, `relacionamento recente`, `a distancia`, `ultima hora`, `barato`, `premium`, `cesta`, `experiencia`.

## Padroes De UX

- Evitar paginas que sejam apenas listas secas.
- Usar imagem real quando ajuda o usuario a entender o contexto do presente.
- Manter cards escaneaveis: titulo curto, descricao clara, tags e chamada de compra.
- Em paginas comerciais, produtos devem aparecer cedo; conteudo editorial pode vir logo depois para SEO e confianca.
- Evitar texto explicativo dentro da UI sobre como usar a interface, salvo quando necessario.
- Checar responsividade e overflow horizontal em paginas novas ou alteradas.

## Produtos E Afiliados

- Links afiliados ficam em `src/data/products.ts` usando `affiliateTag`.
- Nao inserir link Amazon solto em artigos se ja existe produto relacionado.
- Se adicionar produto:
  - usar `id` estavel e slug-like;
  - preencher categorias/personas/occasions/interests;
  - conferir se a imagem existe ou se o fallback visual funciona;
  - atualizar guias/artigos que devem recomendar esse produto.

## Imagens

- Preferir imagens relevantes, claras e inspecionaveis.
- Unsplash ja esta autorizado no `next.config.ts`.
- Evitar imagens escuras, genericas demais ou puramente atmosfericas quando o usuario precisa entender o presente.
- Em `next/image`, sempre preencher `alt`, `width`, `height` e classe adequada.
- Verificar imagens quebradas quando possivel via navegador ou build.

## Validacao

Para mudancas de conteudo/dados:

```bash
npm run typecheck
npm run lint
```

Para mudancas em rotas, metadata, imagens ou componentes:

```bash
npm run build
```

Para validacao local em navegador:

```bash
npm run dev -- --hostname 127.0.0.1 --port 49152
```

Rotas importantes para testar depois de mudancas editoriais:

- `/blog`
- `/presentes`
- `/presentes/presentes-para-pai`
- `/presentes/presentes-dia-dos-namorados`
- um artigo novo em `/blog/[slug]`
- `/sitemap.xml`

Checklist rapido:

- pagina retorna 200;
- H1 coerente;
- cards aparecem;
- imagens carregam;
- nao ha overflow horizontal;
- produtos relacionados aparecem;
- artigo/guia novo esta no sitemap;
- `npm run build` passa.

## Armadilhas Conhecidas

- `next-env.d.ts` pode aparecer modificado por tooling; nao mexer nele sem necessidade.
- No PowerShell, caminhos com `[slug]` precisam de `-LiteralPath`.
- `articles.ts` e `guides.ts` sao grandes; use `rg` para localizar slugs antes de editar.
- Evitar duplicar conteudo manualmente em paginas quando os dados ja podem vir de `articles.ts` ou `guides.ts`.
- Se o Browser local bloquear ou travar, ainda rode `build`, `lint`, `typecheck` e tente validar por HTTP com porta alta.

## Como Manter Este Guia Atualizado

Atualize este arquivo quando:

- adicionar uma nova convencao de rota, componente ou conteudo;
- descobrir uma porta, comando ou validacao melhor;
- adicionar uma categoria editorial recorrente;
- mudar a estrategia sazonal;
- criar uma nova fonte de dados;
- perceber uma armadilha que pode atrasar a proxima mudanca.

Mantenha o guia pratico, direto e moderno. Ele deve reduzir procura repetida por arquivos e acelerar trabalho futuro sem virar documentacao inchada.
