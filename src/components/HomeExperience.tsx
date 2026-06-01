"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  HeartHandshake,
  MousePointerClick,
  Search,
  ShieldCheck,
  Sparkles,
  Timer,
  Trophy
} from "lucide-react";
import { GiftQuiz } from "@/components/GiftQuiz";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import type { Recommendation } from "@/lib/recommend";

export function HomeExperience() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy-column">
            <div className="hero-glow" aria-hidden="true" />
            <p className="eyebrow">IA que entende o presente antes da compra</p>
            <h1>Presentes certeiros, escolhidos por IA.</h1>
            <p className="hero-copy">
              Diga quem vai ganhar, o orcamento e alguns gostos da pessoa. O
              Presenteia monta um Top 10 com ideias explicadas e prontas para
              comprar.
            </p>
            <div className="proof-row" aria-label="Diferenciais">
              <span>
                <Timer size={16} />
                menos de 1 minuto
              </span>
              <span>
                <ShieldCheck size={16} />
                sem cadastro
              </span>
              <span>
                <MousePointerClick size={16} />
                pronto para comprar
              </span>
            </div>
            <div className="hero-actions">
              <a className="button" href="#recomendador">
                Encontrar presente
                <Sparkles size={16} />
              </a>
              <Link className="button secondary" href="/presentes">
                Explorar ideias
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div id="recomendador">
            <GiftQuiz onRecommendations={setRecommendations} />
          </div>
        </div>
      </section>

      {recommendations.length > 0 ? (
        <section className="section results-section" aria-live="polite">
          <div className="container">
            <div className="results-head">
              <div>
                <p className="eyebrow">Resultado</p>
                <h2>Top {recommendations.length} ideias para esse perfil</h2>
              </div>
              <span className="result-pill">
                <Trophy size={16} />
                Ranqueado por afinidade
              </span>
            </div>
            <div className="grid results-grid">
              {recommendations.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Como a IA ajuda</p>
            <h2>Menos chute, mais presente com contexto</h2>
            <p>
              Em vez de mostrar uma vitrine aleatoria, o Presenteia combina
              perfil, momento e orcamento para priorizar opcoes com mais chance
              de agradar.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <Brain size={24} />
              <h3>Entende a pessoa</h3>
              <p>
                A IA considera gostos, rotina, ocasiao e estilo para sair do
                presente generico.
              </p>
            </article>
            <article className="feature-card">
              <HeartHandshake size={24} />
              <h3>Explica o motivo</h3>
              <p>
                Cada sugestao vem com uma razao simples, para voce decidir sem
                ficar pulando de aba em aba.
              </p>
            </article>
            <article className="feature-card">
              <MousePointerClick size={24} />
              <h3>Vai direto para a compra</h3>
              <p>
                Gostou de uma ideia? Abra o link, compare na Amazon e compre no
                seu tempo.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ideias populares</p>
            <h2>Presentes que costumam funcionar bem</h2>
            <p>
              Comece por opcoes versateis para aniversario, amigo secreto,
              Natal e datas especiais.
            </p>
          </div>
          <ProductGrid limit={6} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Guias rapidos</p>
            <h2>Escolha por pessoa, data ou orcamento</h2>
          </div>
          <div className="grid two">
            {guides.map((guide) => (
              <Link className="guide-card" href={`/presentes/${guide.slug}`} key={guide.slug}>
                <Search size={22} />
                <h3>{guide.title}</h3>
                <p>{guide.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Blog</p>
            <h2>Inspiracao para acertar no presente</h2>
          </div>
          <div className="grid three">
            {articles.map((article) => (
              <Link className="article-card" href={`/blog/${article.slug}`} key={article.slug}>
                <div className="article-body">
                  <BookOpen size={22} />
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
