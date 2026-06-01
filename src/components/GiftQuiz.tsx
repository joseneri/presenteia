"use client";

import { FormEvent, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import type { Recommendation, RecommendationInput } from "@/lib/recommend";

const initialForm: RecommendationInput = {
  recipient: "mae",
  ageGroup: "adulto",
  occasion: "aniversario",
  budget: "ate 200 reais",
  interests: "",
  style: "util"
};

type GiftQuizProps = {
  onRecommendations?: (recommendations: Recommendation[]) => void;
};

export function GiftQuiz({ onRecommendations }: GiftQuizProps) {
  const [form, setForm] = useState(initialForm);
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
      onRecommendations?.(data.recommendations);
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
            <p>Receba um Top 10 com ideias para comprar agora.</p>
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
              <option value="filho">Filho</option>
              <option value="filha">Filha</option>
              <option value="crianca">Crianca</option>
              <option value="bebe">Bebe</option>
              <option value="namorada">Namorada</option>
              <option value="namorado">Namorado</option>
              <option value="esposa">Esposa</option>
              <option value="marido">Marido</option>
              <option value="amigo">Amigo</option>
              <option value="amiga">Amiga</option>
              <option value="colega">Colega de trabalho</option>
              <option value="chefe">Chefe</option>
              <option value="professor">Professor(a)</option>
              <option value="avos">Avos</option>
              <option value="casal">Casal</option>
              <option value="gamer">Gamer</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="ageGroup">Faixa etaria</label>
            <select
              id="ageGroup"
              value={form.ageGroup}
              onChange={(event) =>
                setForm({ ...form, ageGroup: event.target.value })
              }
            >
              <option value="bebe 0 a 2 anos">Bebe: 0 a 2 anos</option>
              <option value="crianca 3 a 7 anos">Crianca: 3 a 7 anos</option>
              <option value="crianca 8 a 12 anos">Crianca: 8 a 12 anos</option>
              <option value="adolescente">Adolescente</option>
              <option value="adulto">Adulto</option>
              <option value="idoso">Idoso</option>
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
              <option value="dia das maes">Dia das Maes</option>
              <option value="dia dos pais">Dia dos Pais</option>
              <option value="dia das criancas">Dia das Criancas</option>
              <option value="cha de bebe">Cha de bebe</option>
              <option value="formatura">Formatura</option>
              <option value="casamento">Casamento</option>
              <option value="casa nova">Casa nova</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor="budget">Orcamento</label>
            <select
              id="budget"
              value={form.budget}
              onChange={(event) =>
                setForm({ ...form, budget: event.target.value })
              }
            >
              <option value="ate 50 reais">Ate R$50</option>
              <option value="ate 100 reais">Ate R$100</option>
              <option value="ate 150 reais">Ate R$150</option>
              <option value="ate 200 reais">Ate R$200</option>
              <option value="ate 300 reais">Ate R$300</option>
              <option value="ate 500 reais">Ate R$500</option>
              <option value="acima de 500 reais">Acima de R$500</option>
            </select>
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
              <option value="educativo">Educativo</option>
              <option value="brinquedo">Brinquedo</option>
              <option value="premium">Premium</option>
              <option value="romantico">Romantico</option>
              <option value="casa">Casa</option>
            </select>
          </div>

          <div className="field field-full">
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

          <button className="button cta-button form-submit" disabled={isLoading} type="submit">
            {isLoading ? <Loader2 size={16} /> : <Sparkles size={16} />}
            {isLoading ? "Pensando..." : "Ver meu Top 10"}
          </button>
        </div>

        <p className="disclosure">
          Como Associado Amazon, podemos receber comissao por compras
          qualificadas, sem custo extra para voce.
        </p>
      </form>
      {error ? <div className="status quiz-status">{error}</div> : null}
    </div>
  );
}
