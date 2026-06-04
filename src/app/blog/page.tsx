import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { articles } from "@/data/articles";

const blogListLimit = 30;
const seasonalTerms = ["namorados", "namorada", "namorado", "casal"];

export const metadata: Metadata = {
  title: "Blog de presentes | Artigos e ideias",
  description:
    "Artigos com ideias de presentes por pessoa, ocasião, estilo e orçamento. Guias práticos para não errar na escolha.",
  keywords: ["blog presentes", "artigos presentes", "dicas presentes", "ideias presentes"],
  alternates: { canonical: "https://presenteia.io/blog" },
  openGraph: {
    type: "website",
    url: "https://presenteia.io/blog",
    title: "Blog de presentes | PresenteIA",
    description: "Artigos com ideias de presentes por pessoa, ocasião, estilo e orçamento.",
    locale: "pt_BR",
    siteName: "PresenteIA"
  }
};

export default function BlogPage() {
  const seasonalArticles = articles.filter((article) =>
    seasonalTerms.some((term) => article.slug.includes(term))
  );
  const listedArticles = [
    ...seasonalArticles,
    ...articles.filter((article) => !seasonalArticles.includes(article))
  ].slice(0, blogListLimit);
  const featuredArticle = listedArticles[0];

  return (
    <>
      <section className="page-title" id="blog">
        <div className="container">
          <p className="eyebrow">Blog</p>
          <h1>Ideias de presentes para escolher com mais segurança.</h1>
          <p>
            Guias práticos por data, pessoa, orçamento e estilo. Neste momento,
            o destaque é Dia dos Namorados: 12 de junho chega rápido.
          </p>
        </div>
      </section>
      {featuredArticle ? (
        <section className="section blog-featured-section">
          <div className="container">
            <Link className="featured-article" href={`/blog/${featuredArticle.slug}`}>
              {featuredArticle.coverImage ? (
                <Image
                  src={featuredArticle.coverImage.src}
                  alt={featuredArticle.coverImage.alt}
                  width={960}
                  height={540}
                  className="featured-article-image"
                  priority
                />
              ) : null}
              <div className="featured-article-copy">
                <p className="eyebrow">Especial Dia dos Namorados</p>
                <h2>{featuredArticle.title}</h2>
                <p>{featuredArticle.description}</p>
              </div>
            </Link>
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Artigos recentes e sazonais</h2>
            <p>
              Conteúdos pensados para quem precisa decidir o presente sem cair
              no óbvio.
            </p>
          </div>
          <div className="grid three">
            {listedArticles.map((article) => (
              <Link
                className="article-card article-card-media"
                href={`/blog/${article.slug}`}
                key={article.slug}
              >
                {article.coverImage ? (
                  <Image
                    src={article.coverImage.src}
                    alt={article.coverImage.alt}
                    width={640}
                    height={360}
                    className="card-thumb"
                  />
                ) : null}
                <div className="article-body">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
