import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Recommendation } from "@/lib/recommend";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product | Recommendation;
  rank?: number;
};

const realProductImages: Record<string, string> = {
  "echo-dot":
    "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=720&q=82",
  kindle:
    "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=720&q=82",
  "kit-cafe":
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=720&q=82",
  massageador:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=720&q=82",
  "fone-bluetooth":
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=720&q=82",
  "luminaria-led":
    "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=720&q=82",
  "garrafa-termica":
    "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=720&q=82",
  "jogo-tabuleiro":
    "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=720&q=82",
  "organizador-cabos":
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=720&q=82",
  "moka-cafeteira":
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=720&q=82",
  "chaveiro-smart":
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=720&q=82",
  "caneca-termica":
    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=720&q=82",
  "skincare-kit":
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=720&q=82",
  "suporte-celular":
    "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=720&q=82",
  "lego-classic":
    "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=720&q=82",
  "livro-infantil":
    "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=720&q=82",
  "pelucia-bebe":
    "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=720&q=82",
  "quebra-cabeca":
    "https://images.unsplash.com/photo-1611996575749-79a3a250f948?auto=format&fit=crop&w=720&q=82",
  "kit-desenho":
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=720&q=82",
  "porta-retrato-casal":
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=720&q=82",
  planner:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=720&q=82",
  "kit-ciencia":
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=720&q=82",
  "brinquedo-musical":
    "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=720&q=82",
  "fone-infantil":
    "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=720&q=82",
  "mochila-escolar":
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=720&q=82",
  "tablet-infantil":
    "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=720&q=82"
};

export function ProductCard({ product, rank }: ProductCardProps) {
  const image = realProductImages[product.id] ?? product.image;
  const rankClass = rank ? ` rank-${rank}` : "";

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
        <a className="button" href={`/go/${product.id}`} target="_blank">
          Comprar na Amazon
          <ExternalLink size={16} />
        </a>
      </div>
    </article>
  );
}
