import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { articles } from "@/data/articles";
import { ProductGrid } from "@/components/ProductGrid";

const baseUrl = "https://presenteia.io";

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

  const url = `${baseUrl}/blog/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.description,
      publishedTime: article.date,
      locale: "pt_BR",
      siteName: "PresenteIA",
      images: [{ url: `${baseUrl}/og-default.png`, width: 1200, height: 630, alt: article.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description
    }
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    url: `${baseUrl}/blog/${article.slug}`,
    publisher: {
      "@type": "Organization",
      name: "PresenteIA",
      url: baseUrl
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blog/${article.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Artigo</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
        </div>
      </section>
      {article.coverImage && (
        <div className="article-cover">
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            width={1200}
            height={630}
            className="article-cover-img"
            priority
          />
        </div>
      )}
      <article className="article-content">
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
            {section.tips && (
              <ul className="article-tips">
                {section.tips.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            )}
            {section.image && (
              <Image
                src={section.image.src}
                alt={section.image.alt}
                width={800}
                height={450}
                className="section-image"
              />
            )}
          </section>
        ))}
      </article>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Sugestões relacionadas</p>
            <h2>Produtos citados neste guia</h2>
          </div>
          <ProductGrid ids={article.relatedProductIds} />
        </div>
      </section>
    </>
  );
}
