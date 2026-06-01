"use client";

import { FormEvent, useState } from "react";
import { Loader2, Sparkles, Trophy } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import type { Recommendation, RecommendationInput } from "@/lib/recommend";

const initialForm: RecommendationInput = {
  recipient: "mae",
  occasion: "aniversario",
  budget: "ate 200 reais",
  interests: "",
  style: "util"
};

export function GiftQuiz() {
  const [form, setForm] = useState(initialForm);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error("Nao foi possivel gerar recomendacoes agora.");
      }

      const data = (await response.json()) as {
        recommendations: Recommendation[];
      };
      setRecommendations(data.recommendations);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Algo saiu do esperado."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form className="quiz-panel" onSubmit={onSubmit}>
        <div className="quiz-heading">
          <span className="mini-icon" aria-hidden="true">
            <Sparkles size={16} />
          </span>
          <div>
            <h2>Conte sobre a pessoa</h2>
            <p>A IA monta um Top 10 com ideias para comprar agora.</p>
          </div>
        </div>

        <div className="form-grid">
          <div className="field">
            <label htmlFor="recipient">Para quem e?</label>
            <select
              id="recipient"
              value={form.recipient}
              onChange={(event) =>
                setForm({ ...form, recipient: event.target.value })
              }
            >
              <option value="mae">Mae</option>
              <option value="pai">Pai</option>
              <option value="namorada">Namorada</option>
              <option value="namorado">Namorado</option>
              <option value="amigo">Amigo</option>
              <option value="gamer">Gamer</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="occasion">Ocasiao</label>
            <select
              id="occasion"
              value={form.occasion}
              onChange={(event) =>
                setForm({ ...form, occasion: event.target.value })
              }
            >
              <option value="aniversario">Aniversario</option>
              <option value="natal">Natal</option>
              <option value="amigo secreto">Amigo secreto</option>
              <option value="dia dos namorados">Dia dos Namorados</option>
              <option value="casa nova">Casa nova</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="budget">Orcamento</label>
            <input
              id="budget"
              placeholder="ex: ate 150 reais"
              value={form.budget}
              onChange={(event) =>
                setForm({ ...form, budget: event.target.value })
              }
            />
          </div>

          <div className="field">
            <label htmlFor="style">Estilo</label>
            <select
              id="style"
              value={form.style}
              onChange={(event) =>
                setForm({ ...form, style: event.target.value })
              }
            >
              <option value="util">Util</option>
              <option value="criativo">Criativo</option>
              <option value="tecnologia">Tecnologia</option>
              <option value="bem-estar">Bem-estar</option>
              <option value="barato">Barato</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="interests">Do que a pessoa gosta?</label>
            <textarea
              id="interests"
              placeholder="ex: cafe, leitura, games, academia, decoracao..."
              value={form.interests}
              onChange={(event) =>
                setForm({ ...form, interests: event.target.value })
              }
            />
          </div>

          <button className="button cta-button" disabled={isLoading} type="submit">
            {isLoading ? <Loader2 size={16} /> : <Sparkles size={16} />}
            {isLoading ? "Pensando..." : "Ver meu Top 10"}
          </button>
        </div>

        <p className="disclosure">
          Como Associado Amazon, podemos receber comissao por compras
          qualificadas, sem custo extra para voce.
        </p>
      </form>

      <div className="recommendations" aria-live="polite">
        {error ? <div className="status">{error}</div> : null}
        {recommendations.length > 0 ? (
          <>
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
            <div className="grid three">
              {recommendations.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  rank={index + 1}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
