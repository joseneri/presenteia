import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Blog de presentes | Artigos e ideias",
  description:
    "Artigos com ideias de presentes por pessoa, ocasiao, estilo e orcamento. Guias praticos para nao errar na escolha.",
  keywords: ["blog presentes", "artigos presentes", "dicas presentes", "ideias presentes"],
  alternates: { canonical: "https://presenteia.com.br/blog" },
  openGraph: {
    type: "website",
    url: "https://presenteia.com.br/blog",
    title: "Blog de presentes | PresenteIA",
    description: "Artigos com ideias de presentes por pessoa, ocasiao, estilo e orcamento.",
    locale: "pt_BR",
    siteName: "PresenteIA"
  }
};

export default function BlogPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Blog</p>
          <h1>Ideias de presentes para decidir melhor.</h1>
          <p>
            Conteudo editorial curto, pratico e pensado para buscas organicas.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid three">
          {articles.map((article) => (
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
