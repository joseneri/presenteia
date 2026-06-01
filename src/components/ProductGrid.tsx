import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type ProductGridProps = {
  ids?: string[];
  limit?: number;
};

export function ProductGrid({ ids, limit = 6 }: ProductGridProps) {
  const selected = ids
    ? ids.map((id) => products.find((product) => product.id === id)).filter(Boolean)
    : products.slice(0, limit);

  return (
    <div className="grid three">
      {selected.map((product, index) =>
        product ? (
          <ProductCard key={product.id} product={product} rank={index + 1} />
        ) : null
      )}
    </div>
  );
}
