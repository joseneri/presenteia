import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { guides } from "@/data/guides";

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
  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Guias</p>
          <h1>Guias para escolher sem perder tempo.</h1>
          <p>
            Encontre ideias por pessoa, ocasião, interesse e faixa de preço.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid two">
          {guides.map((guide) => (
            <Link className="guide-card" href={`/presentes/${guide.slug}`} key={guide.slug}>
              <Search size={22} />
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
