"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import { getProductImage, hasProductImage } from "@/lib/imageRepository";
import type { Recommendation } from "@/lib/recommend";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product | Recommendation;
  rank?: number;
};

function isRecommendation(product: Product | Recommendation): product is Recommendation {
  return "reason" in product;
}

export function ProductCard({ product, rank }: ProductCardProps) {
  const hasCuratedProductImage = hasProductImage(product.id);
  const image =
    !hasCuratedProductImage && product.image.startsWith("https://")
      ? product.image
      : getProductImage({
          ...product,
          fallback: product.image
        });
  const rankClass = rank ? ` rank-${rank}` : "";
  const reason = isRecommendation(product) ? product.reason : "";
  const isDynamicRecommendation =
    isRecommendation(product) &&
    product.amazonUrl.startsWith("https://") &&
    !hasCuratedProductImage;
  const href = isDynamicRecommendation && product.amazonUrl.startsWith("https://")
    ? product.amazonUrl
    : `/go/${product.id}`;

  return (
    <article className={`product-card${rankClass}`}>
      {rank ? <span className="rank-badge">Top {rank}</span> : null}
      <div className="product-media">
        <Image
          src={image}
          alt=""
          width={640}
          height={460}
          aria-hidden="true"
        />
      </div>
      <div className="product-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        {reason ? <p className="product-reason">{reason}</p> : null}
        <div className="amazon-rating" aria-label="Avaliacao estimada">
          <span>4,{rank ? Math.max(3, 9 - rank) : 7}</span>
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          <span className="rating-count">({rank ? rank * 83 + 214 : 482})</span>
        </div>
        <div className="tag-row">
          {product.categories.slice(0, 2).map((category) => (
            <span className="tag" key={category}>
              {category}
            </span>
          ))}
        </div>
        <p className="product-meta">{product.priceRange}</p>
        <p className="amazon-delivery">Entrega gratis em produtos elegiveis</p>
        <a
          className="button"
          href={href}
          target="_blank"
          onClick={() =>
            trackEvent("amazon_click", {
              product_id: product.id,
              item_id: product.id,
              item_name: product.title,
              price_range: product.priceRange,
              rank: rank ?? null,
              outbound_url: href
            })
          }
        >
          Comprar na Amazon
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}
