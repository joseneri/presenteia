import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { guides } from "@/data/guides";
import { products } from "@/data/products";

const baseUrl = "https://presenteia.com.br";

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
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Melhores ideias para comecar</h2>
            <p>
              Opcoes com utilidade clara, boas para comparar e comprar com
              poucos cliques.
            </p>
          </div>
          <ProductGrid ids={guide.productIds} />
        </div>
      </section>
    </>
  );
}
