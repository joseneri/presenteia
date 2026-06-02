import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o PresenteIA usa dados informados no quiz, analytics e links afiliados."
};

export default function PrivacyPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Privacidade</p>
          <h1>Política de Privacidade</h1>
          <p>
            Esta página resume como tratamos as informações usadas para gerar
            sugestões de presentes e melhorar o PresenteIA.
          </p>
        </div>
      </section>

      <article className="article-content">
        <section>
          <h2>Dados que você informa</h2>
          <p>
            Quando você usa o quiz, podemos processar respostas como pessoa,
            faixa etária, ocasião, orçamento, estilo e interesses. Esses dados
            são usados para gerar recomendações de presentes e melhorar a
            qualidade da experiência.
          </p>
        </section>

        <section>
          <h2>Inteligência artificial e cache</h2>
          <p>
            As respostas do quiz podem ser enviadas a provedores de IA para
            criar sugestões. Também podemos armazenar resultados em cache para
            evitar chamadas repetidas, reduzir custos e acelerar respostas
            futuras. O cache guarda o resultado da recomendação, não chaves de
            API ou dados de pagamento.
          </p>
        </section>

        <section>
          <h2>Analytics e identificadores</h2>
          <p>
            Usamos ferramentas como Vercel Analytics e, quando configurado,
            Google Analytics para entender uso, páginas visitadas, cliques e
            erros. Essas ferramentas podem usar cookies ou identificadores
            técnicos conforme suas próprias políticas.
          </p>
        </section>

        <section>
          <h2>Links afiliados</h2>
          <p>
            Alguns links para lojas, incluindo Amazon, podem conter códigos de
            afiliado. Isso significa que podemos receber comissão por compras
            qualificadas, sem custo extra para você.
          </p>
        </section>

        <section>
          <h2>Contato</h2>
          <p>
            Para dúvidas sobre privacidade, remoção de informações ou ajustes
            nesta política, entre em contato pelo e-mail:
            contato@presenteia.io.
          </p>
        </section>
      </article>
    </>
  );
}
