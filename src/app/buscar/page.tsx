import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export const metadata: Metadata = {
  title: "Buscar presentes",
  description: "Busque ideias de presentes por produto, pessoa ou interesse."
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = normalize(q.trim());

  const results = query
    ? products.filter((product) => {
        const haystack = normalize(
          [
            product.title,
            product.description,
            product.priceRange,
            ...product.categories,
            ...product.personas,
            ...product.occasions,
            ...product.interests
          ].join(" ")
        );

        return query.split(/\s+/).every((term) => haystack.includes(term));
      })
    : products.slice(0, 8);

  return (
    <>
      <section className="page-title">
        <div className="container">
          <p className="eyebrow">Busca de presentes</p>
          <h1>{q ? `Resultados para "${q}"` : "Busque por produto ou ocasião"}</h1>
          <p>
            Pesquise por termos como fone, cafe, Dia das Maes, gamer ou ate 100
            reais.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {results.length > 0 ? (
            <div className="grid three">
              {results.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          ) : (
            <div className="status">
              Nao encontrei nada com esse termo ainda. Tente buscar por cafe,
              tecnologia, gamer, mae ou amigo secreto.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
