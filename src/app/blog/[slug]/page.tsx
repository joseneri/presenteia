import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { ProductGrid } from "@/components/ProductGrid";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    title: article.title,
    description: article.description
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Artigo</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </section>
      <article className="article-content">
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sugestoes relacionadas</p>
            <h2>Produtos citados neste guia</h2>
          </div>
          <ProductGrid ids={article.relatedProductIds} />
        </div>
      </section>
    </>
  );
}
