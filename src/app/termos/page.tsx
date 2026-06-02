import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Termos de uso do PresenteIA, incluindo recomendações, links afiliados e limitações do serviço."
};

export default function TermsPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Termos</p>
          <h1>Termos de Uso</h1>
          <p>
            Ao usar o PresenteIA, você concorda com estes termos simples para o
            MVP do serviço.
          </p>
        </div>
      </section>

      <article className="article-content">
        <section>
          <h2>Uso do serviço</h2>
          <p>
            O PresenteIA oferece ideias de presentes com base nas informações
            fornecidas por você. As sugestões são informativas e podem não
            refletir preço, disponibilidade, prazo de entrega ou qualidade final
            dos produtos em lojas externas.
          </p>
        </section>

        <section>
          <h2>Compras e lojas externas</h2>
          <p>
            Ao clicar em links de compra, você pode ser direcionado para sites
            de terceiros, como Amazon. A compra, pagamento, entrega, troca,
            garantia e atendimento são responsabilidade da loja escolhida.
          </p>
        </section>

        <section>
          <h2>Programa de afiliados</h2>
          <p>
            Como Associado Amazon, podemos receber comissão por compras
            qualificadas feitas a partir dos nossos links, sem custo extra para
            você.
          </p>
        </section>

        <section>
          <h2>Disponibilidade e IA</h2>
          <p>
            O serviço pode usar inteligência artificial e caches para gerar ou
            recuperar recomendações. Podemos alterar modelos, critérios, páginas
            e funcionalidades a qualquer momento para melhorar o produto.
          </p>
        </section>

        <section>
          <h2>Contato</h2>
          <p>
            Para dúvidas sobre estes termos, fale com a gente pelo e-mail:
            contato@presenteia.io.
          </p>
        </section>
      </article>
    </>
  );
}
