import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Gift, Search } from "lucide-react";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";

const guideListLimit = 36;
const seasonalTerms = ["namorados", "namorada", "namorado", "casal"];

export const metadata: Metadata = {
  title: "Guias de presentes | Por pessoa, ocasião e preço",
  description:
    "Guias completos de presentes organizados por pessoa, ocasião, faixa de preço e interesse. Encontre a ideia certa.",
  keywords: ["guia presentes", "lista presentes", "presente por ocasião", "presente por pessoa"],
  alternates: { canonical: "https://presenteia.io/presentes" },
  openGraph: {
    type: "website",
    url: "https://presenteia.io/presentes",
    title: "Guias de presentes | PresenteIA",
    description: "Guias completos organizados por pessoa, ocasião, faixa de preço e interesse.",
    locale: "pt_BR",
    siteName: "PresenteIA"
  }
};

export default function GuidesPage() {
  const seasonalGuides = guides.filter((guide) =>
    seasonalTerms.some((term) => guide.slug.includes(term) || guide.occasion.includes("namorados"))
  );
  const listedGuides = [
    ...seasonalGuides,
    ...guides.filter((guide) => !seasonalGuides.includes(guide))
  ].slice(0, guideListLimit);
  const guideImageBySlug = new Map(
    articles
      .filter((article) => article.coverImage)
      .map((article) => [article.slug, article.coverImage])
  );

  return (
    <>
      <section className="page-title" id="guias">
        <div className="container">
          <p className="eyebrow">Guias</p>
          <h1>Guias de presentes por pessoa, data e orçamento.</h1>
          <p>
            Encontre ideias por pessoa, ocasião, interesse e faixa de preço.
            Para junho, os guias de Dia dos Namorados aparecem primeiro.
          </p>
        </div>
      </section>
      <section className="section band">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">12 de junho</p>
            <h2>Guias em alta para Dia dos Namorados</h2>
            <p>
              Presentes romanticos, uteis e de ultima hora para namorada,
              namorado, casal e relacionamento recente.
            </p>
          </div>
          <div className="grid three">
            {seasonalGuides.map((guide) => {
              const image = guideImageBySlug.get(guide.slug);

              return (
                <Link className="guide-card guide-card-featured" href={`/presentes/${guide.slug}`} key={guide.slug}>
                  {image ? (
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={640}
                      height={360}
                      className="card-thumb"
                    />
                  ) : (
                    <div className="guide-card-icon">
                      <Gift size={28} />
                    </div>
                  )}
                  <div className="guide-card-copy">
                    <h3>{guide.title}</h3>
                    <p>{guide.description}</p>
                    <div className="tag-row">
                      <span className="tag">{guide.persona}</span>
                      <span className="tag">{guide.interest}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>Todos os guias de presentes</h2>
            <p>
              Navegue por perfis, datas e faixas de preço para encontrar uma
              ideia com contexto antes de comprar.
            </p>
          </div>
          <div className="grid two">
            {listedGuides.map((guide) => (
              <Link className="guide-card" href={`/presentes/${guide.slug}`} key={guide.slug}>
                <Search size={22} />
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
