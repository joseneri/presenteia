import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Recommendation } from "@/lib/recommend";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product | Recommendation;
  rank?: number;
};

export function ProductCard({ product, rank }: ProductCardProps) {
  return (
    <article className="product-card">
      {rank ? <span className="rank-badge">Top {rank}</span> : null}
      <div className="product-media">
        <Image
          src={product.image}
          alt=""
          width={640}
          height={460}
          aria-hidden="true"
        />
      </div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="tag-row">
          {product.categories.slice(0, 2).map((category) => (
            <span className="tag" key={category}>
              {category}
            </span>
          ))}
        </div>
        <p className="product-meta">{product.priceRange}</p>
        <a className="button" href={`/go/${product.id}`} target="_blank">
          Comprar na Amazon
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}
