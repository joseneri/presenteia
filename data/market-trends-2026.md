# Market trends for AI gift recommendations

Updated: 2026-06-03

Use this list as market context, not as a fixed catalog. The recommender should
prefer these products when they match the recipient, occasion, budget and style,
but it should not force them into every answer.

## Parameters

- defaultInfluence: 0.35
- defaultCategory: all
- influenceScale: 0 ignores this list; 1 strongly favors this list.

## Sources checked

- Mercado Livre "Mais vendidos", crawled 2026-05/2026-06.
- Mercado Livre 2026 category analysis from Base, Central do Varejo and seller discussions.
- Shopee 2026 category/product trend pages, including ShopRank daily data.
- NielsenIQ Brazil beauty market commentary, 2025.
- Marketplace/forum discussions from Reddit communities about Mercado Livre, Shopee and ecommerce Brazil.

## Category weights

| category | marketWeight | notes |
| --- | ---: | --- |
| beleza-e-cuidados | 0.90 | Strong demand, gift-friendly, low to mid ticket. |
| casa-e-decoracao | 0.86 | Useful gifts, decor, bedding, organizers and small home items. |
| tecnologia-e-gadgets | 0.84 | Electronics, smart home, accessories and small devices remain strong. |
| cozinha-e-cafe | 0.78 | Good fit for gift intent and recurring marketplace demand. |
| fitness-e-bem-estar | 0.72 | Health, massage, bottles, gym accessories and wellness items. |
| moda-e-acessorios | 0.68 | Popular, but higher sizing/taste risk for gift recommendations. |
| livros-e-papelaria | 0.62 | Lower universal volume but good emotional fit. |
| brinquedos-e-infantil | 0.66 | Seasonal and occasion-driven; strong for children. |
| games-e-entretenimento | 0.64 | Strong for younger/gamer personas. |
| pet | 0.58 | Useful for pet owners, but profile-dependent. |

## Product signals

| category | productIdea | searchQuery | budgetHint | giftFit | marketSignal | whenToUse |
| --- | --- | --- | --- | ---: | ---: | --- |
| beleza-e-cuidados | Kit skincare basico | kit skincare presente | R$50-R$180 | 0.88 | 0.90 | Mae, namorada, amiga, autocuidado, beleza. |
| beleza-e-cuidados | Protetor solar facial | protetor solar facial presente | R$40-R$120 | 0.72 | 0.84 | Pessoa pratica, rotina de cuidado, verao. |
| beleza-e-cuidados | Perfume acessivel | perfume feminino masculino presente | R$60-R$220 | 0.76 | 0.78 | Quando estilo indica beleza, cheiro, vaidade. |
| beleza-e-cuidados | Escova eletrica ou oral care | escova eletrica oral b presente | R$90-R$250 | 0.66 | 0.74 | Presente util e premium moderado. |
| casa-e-decoracao | Jogo de lencol | jogo de lencol casal 400 fios presente | R$80-R$220 | 0.78 | 0.88 | Casa nova, casal, conforto, presente util. |
| casa-e-decoracao | Organizador de casa | organizador casa gaveta armario presente | R$30-R$120 | 0.72 | 0.82 | Pessoa pratica, organizada, rotina. |
| casa-e-decoracao | Vela aromatica ou difusor | vela aromatica difusor presente | R$35-R$150 | 0.84 | 0.76 | Autocuidado, casa, decoracao, romantico. |
| casa-e-decoracao | Camera de seguranca | camera seguranca wifi presente | R$120-R$350 | 0.54 | 0.74 | Casa nova, pai, tecnologia, seguranca. |
| tecnologia-e-gadgets | Echo Dot ou speaker inteligente | echo dot alexa presente | R$250-R$450 | 0.84 | 0.82 | Casa inteligente, musica, tecnologia. |
| tecnologia-e-gadgets | Fire TV Stick ou streaming device | fire tv stick presente | R$180-R$350 | 0.80 | 0.80 | Filmes, series, familia, casa. |
| tecnologia-e-gadgets | Fone bluetooth | fone bluetooth presente | R$80-R$350 | 0.86 | 0.84 | Musica, trabalho, academia, gamer. |
| tecnologia-e-gadgets | Repetidor Wi-Fi | repetidor wifi tp-link presente | R$80-R$180 | 0.54 | 0.72 | Presente util para casa/trabalho remoto. |
| tecnologia-e-gadgets | Smartwatch de entrada | smartwatch presente | R$120-R$450 | 0.76 | 0.78 | Fitness, tecnologia, rotina. |
| cozinha-e-cafe | Kit cafe especial | kit cafe gourmet presente | R$70-R$220 | 0.92 | 0.76 | Cafe, mae, pai, amigo, casa nova. |
| cozinha-e-cafe | Cafeteira moka | cafeteira italiana moka presente | R$70-R$180 | 0.88 | 0.72 | Cafe forte, cozinha, ritual. |
| cozinha-e-cafe | Utensilios de cozinha | utensilios cozinha presente | R$40-R$150 | 0.72 | 0.76 | Cozinhar, casa, casamento, casa nova. |
| cozinha-e-cafe | Kit temperos gourmet | kit temperos gourmet presente | R$40-R$140 | 0.76 | 0.70 | Gastronomia, churrasco, cozinheiro. |
| fitness-e-bem-estar | Massageador portatil | massageador portatil presente | R$100-R$350 | 0.86 | 0.78 | Cansaco, autocuidado, pais, rotina pesada. |
| fitness-e-bem-estar | Garrafa termica | garrafa termica inox presente | R$50-R$180 | 0.82 | 0.74 | Academia, trabalho, viagem, rotina. |
| fitness-e-bem-estar | Tapete yoga ou kit treino | tapete yoga presente | R$50-R$180 | 0.72 | 0.68 | Bem-estar, yoga, meditacao, vida ativa. |
| moda-e-acessorios | Bolsa necessaire | necessaire bolsa organizadora presente | R$40-R$160 | 0.72 | 0.70 | Viagem, rotina, beleza, praticidade. |
| moda-e-acessorios | Oculos de sol | oculos de sol presente | R$50-R$220 | 0.58 | 0.66 | Verao, praia, estilo, moda. |
| livros-e-papelaria | Livro fisico bestseller | livro presente leitura bestseller | R$30-R$120 | 0.82 | 0.62 | Leitura, mae, amigo, professor, estudo. |
| livros-e-papelaria | Planner ou caderno premium | planner mesa presente | R$35-R$120 | 0.78 | 0.64 | Trabalho, estudo, organizacao. |
| brinquedos-e-infantil | Blocos de montar | blocos de montar crianca presente | R$80-R$220 | 0.86 | 0.66 | Crianca, criatividade, educativo. |
| brinquedos-e-infantil | Brinquedo sensorial bebe | brinquedo sensorial bebe presente | R$40-R$160 | 0.84 | 0.64 | Bebe, cha de bebe, desenvolvimento. |
| games-e-entretenimento | Gift card games | gift card playstation roblox presente | R$30-R$150 | 0.72 | 0.72 | Gamer, adolescente, presente rapido. |
| games-e-entretenimento | Controle ou headset gamer | headset gamer controle presente | R$100-R$350 | 0.78 | 0.70 | Gamer, tecnologia, setup. |
| pet | Brinquedo para cachorro | brinquedo cachorro pet presente | R$25-R$120 | 0.72 | 0.60 | Tutor de cachorro, presente afetivo. |
| pet | Brinquedo ou arranhador para gato | arranhador brinquedo gato presente | R$40-R$180 | 0.72 | 0.60 | Tutor de gato, casa, pet. |
