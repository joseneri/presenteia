"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUp,
  BookOpen,
  HeartHandshake,
  MousePointerClick,
  Search,
  Sparkles,
  Trophy
} from "lucide-react";
import { GiftQuiz } from "@/components/GiftQuiz";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import { articles } from "@/data/articles";
import { guides } from "@/data/guides";
import { trackEvent } from "@/lib/analytics";
import type { Recommendation } from "@/lib/recommend";

const homeGuideLimit = 2;
const homeArticleLimit = 3;
const popularProductLimit = 4;

export function HomeExperience() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const quizSectionRef = useRef<HTMLDivElement | null>(null);
  const resultsSectionRef = useRef<HTMLElement | null>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const featuredGuides = guides.slice(0, homeGuideLimit);
  const featuredArticles = articles.slice(0, homeArticleLimit);

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

  function scrollToQuiz() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    quizSectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center"
    });

    window.setTimeout(
      () => {
        document
          .getElementById("interests")
          ?.focus({ preventScroll: true });
      },
      prefersReducedMotion ? 0 : 360
    );

    trackEvent("results_refine_click", {
      result_count: recommendations.length
    });
  }

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy-column">
            <p className="eyebrow">Escolhas com afeto e menos dúvida</p>
            <h1>Acerte no presente com mais carinho.</h1>
            <p className="hero-copy">
              Conte quem vai receber, a data e o jeito da pessoa. O PresenteIA
              transforma pistas simples em ideias com alma, utilidade e motivo
              para sorrir.
            </p>
            <div className="proof-row" aria-label="Diferenciais">
              <span>
                <Sparkles size={16} />
                IA para inspirar sem perder o toque humano
              </span>
              <span>
                <HeartHandshake size={16} />
                ideias com motivo, carinho e utilidade
              </span>
              <span>
                <MousePointerClick size={16} />
                escolha por pessoa, data e momento
              </span>
            </div>
            <div className="hero-actions">
              <a
                className="button"
                href="#ideias-populares"
                onClick={() =>
                  trackEvent("cta_click", {
                    label: "Explorar ideias",
                    location: "hero",
                    href: "#ideias-populares"
                  })
                }
              >
                Explorar ideias
                <Sparkles size={16} />
              </a>
            </div>
          </div>
          <div className="hero-visual" aria-hidden="true">
            <Image
              className="hero-photo hero-photo-large"
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=920&q=82&auto=format&fit=crop"
              alt=""
              unoptimized
              width={920}
              height={780}
            />
            <Image
              className="hero-photo hero-photo-small hero-photo-top"
              src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=520&q=82&auto=format&fit=crop"
              alt=""
              unoptimized
              width={520}
              height={420}
            />
            <Image
              className="hero-photo hero-photo-small hero-photo-bottom"
              src="https://images.unsplash.com/photo-1512909006721-3d6018887383?w=520&q=82&auto=format&fit=crop"
              alt=""
              unoptimized
              width={520}
              height={420}
            />
          </div>
          <div ref={quizSectionRef}>
            <GiftQuiz onRecommendations={setRecommendations} />
          </div>
        </div>
      </section>

      {recommendations.length > 0 ? (
        <section
          className="section results-section"
          data-card-theme="amazon"
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
              <div className="results-actions">
                <span className="result-pill">
                  <Trophy size={16} />
                  Ranqueado por afinidade
                </span>
                <button
                  className="button result-refine-button"
                  onClick={scrollToQuiz}
                  type="button"
                >
                  <ArrowUp size={16} />
                  Ajustar busca
                </button>
              </div>
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
            <div className="results-refine">
              <p>Quer tentar outro caminho?</p>
              <button
                className="button result-refine-button"
                onClick={scrollToQuiz}
                type="button"
              >
                <ArrowUp size={16} />
                Tentar de novo
              </button>
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
              Em vez de abrir uma vitrine aleatória, o PresenteIA organiza
              perfil, momento e orçamento para priorizar opções que fazem
              sentido de verdade.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature-card">
              <HeartHandshake size={24} />
              <h3>Entende a pessoa</h3>
              <p>
                Considera gostos, rotina, ocasião e estilo para sair do presente
                genérico.
              </p>
            </article>
            <article className="feature-card">
              <Sparkles size={24} />
              <h3>Explica o motivo</h3>
              <p>
                Cada sugestão vem com uma razão simples, para você entender por
                que aquele presente combina com a pessoa.
              </p>
            </article>
            <article className="feature-card">
              <MousePointerClick size={24} />
              <h3>Vai direto para a compra</h3>
              <p>
                Gostou de uma ideia? Confira os detalhes, compare e compre no
                seu tempo.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section band popular-ideas-section" id="ideias-populares">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Ideias populares</p>
            <h2>Presentes que costumam funcionar bem</h2>
            <p>
              Comece por opções versáteis para aniversário, amigo secreto,
              Natal e datas especiais.
            </p>
          </div>
          <ProductGrid limit={popularProductLimit} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Guias rápidos</p>
            <h2>Escolha por pessoa, data ou orçamento</h2>
          </div>
          <div className="grid two">
            {featuredGuides.map((guide) => (
              <Link
                className="guide-card"
                href={`/presentes/${guide.slug}`}
                key={guide.slug}
                onClick={() =>
                  trackEvent("guide_click", {
                    slug: guide.slug,
                    title: guide.title,
                    location: "home_guides"
                  })
                }
              >
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
            <h2>Inspiração para acertar no presente</h2>
          </div>
          <div className="grid three">
            {featuredArticles.map((article) => (
              <Link
                className="article-card"
                href={`/blog/${article.slug}`}
                key={article.slug}
                onClick={() =>
                  trackEvent("article_click", {
                    slug: article.slug,
                    title: article.title,
                    location: "home_blog"
                  })
                }
              >
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
