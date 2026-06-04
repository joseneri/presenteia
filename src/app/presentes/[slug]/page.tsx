import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { products } from "@/data/products";

const baseUrl = "https://presenteia.io";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    return {};
  }

  const url = `${baseUrl}/presentes/${guide.slug}`;
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: guide.title,
      description: guide.description,
      locale: "pt_BR",
      siteName: "PresenteIA",
      images: [{ url: `${baseUrl}/og-default.png`, width: 1200, height: 630, alt: guide.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description
    }
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  const guideProducts = products.filter((p) => guide.productIds.includes(p.id));
  const guideArticle = articles.find((article) => article.slug === guide.slug);
  const relatedArticles = articles
    .filter(
      (article) =>
        article.slug !== guide.slug &&
        (article.keywords.some((keyword) => guide.keywords.includes(keyword)) ||
          article.slug.includes(guide.persona) ||
          article.slug.includes(guide.occasion.replaceAll(" ", "-")))
    )
    .slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: guide.title,
    description: guide.description,
    url: `${baseUrl}/presentes/${guide.slug}`,
    numberOfItems: guideProducts.length,
    itemListElement: guideProducts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      description: p.description,
      url: `${baseUrl}/go/${p.id}`
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Guia de presentes</p>
          <h1>{guide.title}</h1>
          <p>{guide.description}</p>
          <div className="tag-row">
            <span className="tag">{guide.persona}</span>
            <span className="tag">{guide.occasion}</span>
            <span className="tag">{guide.interest}</span>
          </div>
        </div>
      </section>
      {guideArticle?.coverImage ? (
        <div className="article-cover guide-cover">
          <Image
            src={guideArticle.coverImage.src}
            alt={guideArticle.coverImage.alt}
            width={1200}
            height={630}
            className="article-cover-img"
            priority
          />
        </div>
      ) : null}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Melhores ideias para começar</h2>
            <p>
              Opções com utilidade clara, boas para comparar e comprar com
              poucos cliques.
            </p>
          </div>
          <ProductGrid ids={guide.productIds} />
        </div>
      </section>
      {guideArticle ? (
        <article className="article-content guide-editorial">
          {guideArticle.sections.slice(0, 4).map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
              {section.tips ? (
                <ul className="article-tips">
                  {section.tips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              ) : null}
              {section.image ? (
                <Image
                  src={section.image.src}
                  alt={section.image.alt}
                  width={800}
                  height={450}
                  className="section-image"
                />
              ) : null}
            </section>
          ))}
          <Link className="button secondary guide-read-more" href={`/blog/${guideArticle.slug}`}>
            Ler guia completo
          </Link>
        </article>
      ) : null}
      {relatedArticles.length > 0 ? (
        <section className="section band">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Mais ideias</p>
              <h2>Artigos relacionados</h2>
            </div>
            <div className="grid three">
              {relatedArticles.map((article) => (
                <Link className="article-card article-card-media" href={`/blog/${article.slug}`} key={article.slug}>
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
      ) : null}
    </>
  );
}
