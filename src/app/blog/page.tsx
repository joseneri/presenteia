import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { articles } from "@/data/articles";

const blogListLimit = 12;

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
  const listedArticles = articles.slice(0, blogListLimit);

  return (
    <>
      <section className="page-title" id="blog">
        <div className="container">
          <p className="eyebrow">Blog</p>
          <h1>Ideias de presentes para decidir melhor.</h1>
          <p>
            Conteúdo editorial curto, prático e pensado para buscas orgânicas.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid three">
          {listedArticles.map((article) => (
            <Link className="article-card" href={`/blog/${article.slug}`} key={article.slug}>
              <div className="article-body">
                <BookOpen size={22} />
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
