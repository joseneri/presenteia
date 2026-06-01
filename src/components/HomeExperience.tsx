"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  HeartHandshake,
  MousePointerClick,
  Palette,
  Search,
  Sparkles,
  Trophy
} from "lucide-react";
import { GiftQuiz } from "@/components/GiftQuiz";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import type { Recommendation } from "@/lib/recommend";

const themes = [
  { id: "verde-azul-vivo", label: "Vivo" },
  { id: "verde-azul-vivo-amarelo", label: "Vivo amarelo" },
  { id: "verde-azul-classico", label: "Classico" },
  { id: "verde-azul-claro", label: "Claro" },
  { id: "verde-azul-profundo", label: "Profundo" },
  { id: "verde-azul-menta", label: "Menta" },
  { id: "verde-azul-petroleo", label: "Petroleo" }
];

export function HomeExperience() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [theme, setTheme] = useState("verde-azul-vivo-amarelo");
  const resultsSectionRef = useRef<HTMLElement | null>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (recommendations.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    window.requestAnimationFrame(() => {
      resultsSectionRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
      });
      resultsHeadingRef.current?.focus({ preventScroll: true });
    });
  }, [recommendations.length]);

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy-column">
            <p className="eyebrow">Escolhas com mais afeto e menos duvida</p>
            <h1>Acerte no presente com mais carinho.</h1>
            <p className="hero-copy">
              Conte quem vai receber, o momento e o carinho que voce quer
              entregar. O Presenteia transforma pistas simples em ideias com
              alma, utilidade e motivo para sorrir.
            </p>
            <div className="proof-row" aria-label="Diferenciais">
              <span>
                <Sparkles size={16} />
                IA para inspirar sem perder o toque humano
              </span>
              <span>
                <HeartHandshake size={16} />
                ideias com contexto, carinho e utilidade
              </span>
              <span>
                <MousePointerClick size={16} />
                escolha por pessoa, data e estilo
              </span>
            </div>
            <div className="theme-switcher" aria-label="Escolher tema de cor">
              <span>
                <Palette size={16} />
                Tema
              </span>
              <div className="theme-options">
                {themes.map((option) => (
                  <button
                    aria-pressed={theme === option.id}
                    className={`theme-dot theme-${option.id}`}
                    key={option.id}
                    onClick={() => setTheme(option.id)}
                    title={option.label}
                    type="button"
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
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
          <div className="hero-visual" aria-hidden="true">
            <Image
              className="hero-photo hero-photo-large"
              src="https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=920&q=82"
              alt=""
              width={920}
              height={780}
            />
            <Image
              className="hero-photo hero-photo-small hero-photo-top"
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=520&q=82"
              alt=""
              width={520}
              height={420}
            />
            <Image
              className="hero-photo hero-photo-small hero-photo-bottom"
              src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=520&q=82"
              alt=""
              width={520}
              height={420}
            />
            <div className="hero-note">
              <Sparkles size={18} />
              <span>Ideias com historia, nao so preco.</span>
            </div>
          </div>
          <div id="recomendador">
            <GiftQuiz onRecommendations={setRecommendations} />
          </div>
        </div>
      </section>

      {recommendations.length > 0 ? (
        <section
          className="section results-section"
          id="resultado"
          ref={resultsSectionRef}
          aria-live="polite"
        >
          <div className="container">
            <div className="results-head">
              <div>
                <p className="eyebrow">Resultado</p>
                <h2 ref={resultsHeadingRef} tabIndex={-1}>
                  Top {recommendations.length} ideias para esse perfil
                </h2>
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
            <p className="eyebrow">Como o Presenteia ajuda</p>
            <h2>Menos chute, mais contexto e carinho</h2>
            <p>
              Em vez de mostrar uma vitrine aleatoria, o Presenteia combina
              perfil, momento e orcamento para priorizar opcoes com mais chance
              de agradar.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <HeartHandshake size={24} />
              <h3>Entende a pessoa</h3>
              <p>
                Considera gostos, rotina, ocasiao e estilo para sair do presente
                generico.
              </p>
            </article>
            <article className="feature-card">
              <Sparkles size={24} />
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
