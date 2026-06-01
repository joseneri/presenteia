import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { guides } from "@/data/guides";

export const metadata: Metadata = {
  title: "Guias de presentes",
  description:
    "Guias de presentes por pessoa, ocasiao, faixa de preco e interesse."
};

export default function GuidesPage() {
  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Guias</p>
          <h1>Guias para escolher sem perder tempo.</h1>
          <p>
            Encontre ideias por pessoa, ocasiao, interesse e faixa de preco.
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
