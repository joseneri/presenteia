import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductGrid";
import { guides } from "@/data/guides";

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

  return {
    title: guide.title,
    description: guide.description
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = guides.find((item) => item.slug === slug);

  if (!guide) {
    notFound();
  }

  return (
    <>
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
