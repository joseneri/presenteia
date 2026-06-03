"use client";

import { FormEvent, FocusEvent, useEffect, useRef, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import type { Recommendation, RecommendationInput } from "@/lib/recommend";

const initialForm: RecommendationInput = {
  recipient: "",
  ageGroup: "",
  occasion: "",
  budget: "",
  interests: "",
  style: ""
};

const loadingSteps = [
  {
    title: "Lendo o perfil",
    description: "Entendendo pessoa, ocasião, orçamento e gostos."
  },
  {
    title: "Cruzando pistas",
    description: "Buscando ideias que combinam com o contexto informado."
  },
  {
    title: "Refinando motivos",
    description: "Escrevendo razões claras para cada sugestão."
  },
  {
    title: "Preparando resultado",
    description: "Organizando os melhores presentes e links de busca."
  }
];

const loadingStepIntervalMs = 7000;

type GiftQuizProps = {
  onRecommendations?: (recommendations: Recommendation[]) => void;
  variant?: "default" | "purchase";
};

type RecommendationResponse = {
  recommendations?: Recommendation[];
  error?: string;
  debugId?: string;
  source?: string;
  mode?: string;
};

type FieldLabelProps = {
  children: string;
  htmlFor: keyof RecommendationInput;
  required?: boolean;
};

function FieldLabel({ children, htmlFor, required = false }: FieldLabelProps) {
  return (
    <div className="field-label-row">
      <label htmlFor={htmlFor}>
        {children}
        {required ? (
          <>
            <span className="required-mark" aria-hidden="true">
              *
            </span>
            <span className="sr-only"> obrigatório</span>
          </>
        ) : null}
      </label>
    </div>
  );
}

export function GiftQuiz({ onRecommendations, variant = "default" }: GiftQuizProps) {
  const [form, setForm] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [loadingStep, setLoadingStep] = useState(0);
  const activeRequestRef = useRef<AbortController | null>(null);
  const hasTrackedStart = useRef(false);
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);
  const isPurchase = variant === "purchase";
  const activeLoadingStep = loadingSteps[loadingStep];

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      activeRequestRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingStep((currentStep) =>
        Math.min(currentStep + 1, loadingSteps.length - 1)
      );
    }, loadingStepIntervalMs);

    return () => window.clearInterval(interval);
  }, [isLoading]);

  function trackQuizStart(fieldName: string) {
    if (hasTrackedStart.current) {
      return;
    }

    hasTrackedStart.current = true;
    trackEvent("quiz_started", {
      field: fieldName,
      variant,
      recipient: form.recipient,
      age_group: form.ageGroup,
      occasion: form.occasion,
      budget: form.budget,
      style: form.style
    });
  }

  function onFormFocus(event: FocusEvent<HTMLFormElement>) {
    const fieldName =
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLSelectElement ||
      event.target instanceof HTMLTextAreaElement
        ? event.target.name || event.target.id
        : "form";

    trackQuizStart(fieldName);
  }

  function updateFormField<FieldName extends keyof RecommendationInput>(
    fieldName: FieldName,
    value: RecommendationInput[FieldName]
  ) {
    setForm((currentForm) => ({
      ...currentForm,
      [fieldName]: value
    }));

    if (validationError) {
      setValidationError("");
    }
  }

  function validateForm() {
    const requiredMissingFields = [
      !form.recipient ? "recipient" : ""
    ].filter(Boolean);
    const filledContextFields = [
      form.recipient,
      form.ageGroup,
      form.occasion,
      form.budget,
      form.style,
      form.interests
    ].filter((value) => value.trim().length > 0);

    if (requiredMissingFields.length > 0) {
      setValidationError(
        "Preencha para quem. Depois complete pelo menos 2 pistas no total."
      );
      document.getElementById(requiredMissingFields[0])?.focus();
      trackEvent("quiz_validation_failed", {
        variant,
        missing_fields: requiredMissingFields.join(","),
        filled_context_fields: filledContextFields.length
      });

      return false;
    }

    if (filledContextFields.length >= 2) {
      return true;
    }

    setValidationError(
      "Preencha pelo menos 2 pistas para a IA acertar melhor. Ex: faixa etária, estilo, ocasião ou gostos."
    );
    document
      .getElementById(
        !form.ageGroup
          ? "ageGroup"
          : !form.style
            ? "style"
            : !form.interests
              ? "interests"
              : "occasion"
      )
      ?.focus();
    trackEvent("quiz_validation_failed", {
      variant,
      missing_fields: "minimum_context_fields",
      filled_context_fields: filledContextFields.length
    });

    return false;
  }

  async function submitRecommendations() {
    if (isLoading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoadingStep(0);
    setIsLoading(true);
    setError("");
    onRecommendations?.([]);

    activeRequestRef.current?.abort();

    const requestId = requestIdRef.current + 1;
    const controller = new AbortController();

    requestIdRef.current = requestId;
    activeRequestRef.current = controller;

    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        signal: controller.signal
      });

      const data = (await response.json()) as RecommendationResponse;

      if (controller.signal.aborted || requestId !== requestIdRef.current) {
        return;
      }

      if (!response.ok || !data.recommendations) {
        const detail = data.debugId ? ` Código: ${data.debugId}` : "";
        throw new Error(
          `${data.error ?? "Não foi possível gerar recomendações agora."}${detail}`
        );
      }

      console.info("[recommendations] client_success", {
        source: data.source,
        mode: data.mode,
        debugId: data.debugId,
        count: data.recommendations.length,
        items: data.recommendations.map((product, index) => ({
          rank: index + 1,
          id: product.id,
          title: product.title,
          reason: product.reason
        }))
      });

      onRecommendations?.(data.recommendations);
      trackEvent("quiz_submitted", {
        ...form,
        variant,
        result_count: data.recommendations.length
      });
    } catch (requestError) {
      if (
        controller.signal.aborted ||
        (requestError instanceof DOMException &&
          requestError.name === "AbortError")
      ) {
        return;
      }

      trackEvent("quiz_failed", {
        variant,
        recipient: form.recipient,
        occasion: form.occasion,
        budget: form.budget
      });
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Algo saiu do esperado."
      );
    } finally {
      if (requestId === requestIdRef.current) {
        activeRequestRef.current = null;

        if (isMountedRef.current) {
          setIsLoading(false);
        }
      }
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void submitRecommendations();
  }

  return (
    <div>
      <form
        aria-busy={isLoading}
        aria-describedby={isLoading ? "quiz-loading-status" : undefined}
        className={`quiz-panel${isLoading ? " quiz-panel-loading" : ""}`}
        noValidate
        onFocus={onFormFocus}
        onSubmit={onSubmit}
      >
        <div className="quiz-heading">
          <span className="mini-icon" aria-hidden="true">
            <Sparkles size={16} />
          </span>
          <div>
            <h2>Conte sobre a pessoa</h2>
            <p>
              {isPurchase
                ? "Receba ideias explicadas com link para conferir na Amazon."
                : "Receba ideias explicadas para decidir com mais calma."}
            </p>
          </div>
        </div>

        {validationError ? (
          <div className="status form-error" role="alert">
            {validationError}
          </div>
        ) : null}

        <fieldset className="form-grid" disabled={isLoading}>
          <div className="field">
            <FieldLabel htmlFor="recipient" required>
              Para quem é?
            </FieldLabel>
            <select
              aria-invalid={validationError && !form.recipient ? true : undefined}
              id="recipient"
              name="recipient"
              required
              value={form.recipient}
              onChange={(event) =>
                updateFormField("recipient", event.target.value)
              }
            >
              <option value="">Escolha a pessoa</option>
              <optgroup label="Família">
                <option value="mae">Mãe</option>
                <option value="pai">Pai</option>
                <option value="avos">Avó ou avô</option>
                <option value="filho">Filho</option>
                <option value="filha">Filha</option>
                <option value="irma">Irmã</option>
                <option value="irmao">Irmão</option>
                <option value="sogra">Sogra</option>
              </optgroup>
              <optgroup label="Relacionamento">
                <option value="namorada">Namorada</option>
                <option value="namorado">Namorado</option>
                <option value="esposa">Esposa</option>
                <option value="marido">Marido</option>
                <option value="casal">Casal</option>
              </optgroup>
              <optgroup label="Social e trabalho">
                <option value="amiga">Amiga</option>
                <option value="amigo">Amigo</option>
                <option value="colega">Colega de trabalho</option>
                <option value="chefe">Chefe</option>
                <option value="professor">Professor(a)</option>
              </optgroup>
              <optgroup label="Crianças e jovens">
                <option value="bebe">Bebê</option>
                <option value="crianca">Criança</option>
                <option value="adolescente">Adolescente</option>
              </optgroup>
              <optgroup label="Outros">
                <option value="gamer">Gamer</option>
                <option value="pessoa dificil">Pessoa difícil de presentear</option>
              </optgroup>
            </select>
          </div>

          <div className="field">
            <FieldLabel htmlFor="ageGroup">Faixa etária</FieldLabel>
            <select
              id="ageGroup"
              name="ageGroup"
              value={form.ageGroup}
              onChange={(event) =>
                updateFormField("ageGroup", event.target.value)
              }
            >
              <option value="">Não sei / não importa</option>
              <option value="bebe 0 a 2 anos">Bebê: 0 a 2 anos</option>
              <option value="crianca 3 a 5 anos">Criança: 3 a 5 anos</option>
              <option value="crianca 6 a 9 anos">Criança: 6 a 9 anos</option>
              <option value="pre-adolescente 10 a 12 anos">10 a 12 anos</option>
              <option value="adolescente 13 a 17 anos">13 a 17 anos</option>
              <option value="jovem adulto 18 a 25 anos">18 a 25 anos</option>
              <option value="adulto 26 a 59 anos">26 a 59 anos</option>
              <option value="idoso 60 anos ou mais">60 anos ou mais</option>
            </select>
          </div>

          <div className="field">
            <FieldLabel htmlFor="occasion">
              Ocasião
            </FieldLabel>
            <select
              id="occasion"
              name="occasion"
              value={form.occasion}
              onChange={(event) =>
                updateFormField("occasion", event.target.value)
              }
            >
              <option value="">Escolha a ocasião</option>
              <option value="aniversario">Aniversário</option>
              <option value="natal">Natal</option>
              <option value="amigo secreto">Amigo secreto</option>
              <option value="dia dos namorados">Dia dos Namorados</option>
              <option value="dia das maes">Dia das Mães</option>
              <option value="dia dos pais">Dia dos Pais</option>
              <option value="dia das criancas">Dia das Crianças</option>
              <option value="cha de bebe">Chá de bebê</option>
              <option value="formatura">Formatura</option>
              <option value="casamento">Casamento</option>
              <option value="casa nova">Casa nova</option>
              <option value="agradecimento">Agradecimento</option>
              <option value="sem data surpresa">Sem data / surpresa</option>
            </select>
          </div>

          <div className="field">
            <FieldLabel htmlFor="budget">
              Orçamento
            </FieldLabel>
            <select
              id="budget"
              name="budget"
              value={form.budget}
              onChange={(event) =>
                updateFormField("budget", event.target.value)
              }
            >
              <option value="">Escolha uma faixa</option>
              <option value="ate 50 reais">Até R$50</option>
              <option value="ate 100 reais">R$50 a R$100</option>
              <option value="ate 150 reais">R$100 a R$150</option>
              <option value="ate 200 reais">R$150 a R$200</option>
              <option value="ate 300 reais">R$200 a R$300</option>
              <option value="ate 500 reais">R$300 a R$500</option>
              <option value="acima de 500 reais">Acima de R$500</option>
              <option value="varias faixas de preco">Quero ver várias faixas</option>
            </select>
          </div>

          <div className="field">
            <FieldLabel htmlFor="style">Estilo do presente</FieldLabel>
            <select
              id="style"
              name="style"
              value={form.style}
              onChange={(event) =>
                updateFormField("style", event.target.value)
              }
            >
              <option value="">Surpreenda-me</option>
              <option value="util e pratico">Útil e prático</option>
              <option value="criativo e diferente">Criativo e diferente</option>
              <option value="tecnologia e gadget">Tecnologia e gadget</option>
              <option value="bem-estar e autocuidado">Bem-estar e autocuidado</option>
              <option value="casa e decoracao">Casa e decoração</option>
              <option value="gastronomia e cafe">Gastronomia e café</option>
              <option value="livros e estudo">Livros e estudo</option>
              <option value="experiencia">Experiência</option>
              <option value="romantico">Romântico</option>
              <option value="premium">Premium</option>
              <option value="barato e lembranca">Barato e lembrança</option>
            </select>
          </div>

          <div className="field field-full">
            <FieldLabel htmlFor="interests">
              Do que a pessoa gosta?
            </FieldLabel>
            <textarea
              id="interests"
              name="interests"
              placeholder="Opcional: café, leitura, games, academia, plantas..."
              value={form.interests}
              onChange={(event) =>
                updateFormField("interests", event.target.value)
              }
            />
          </div>

          <button
            className={`button cta-button form-submit${isPurchase ? " cta-button-purchase" : ""}`}
            disabled={isLoading}
            onClick={() => {
              trackEvent("cta_click", {
                label: isPurchase ? "Ver ideias para comprar" : "Ver ideias",
                location: "quiz",
                variant,
                recipient: form.recipient,
                occasion: form.occasion,
                budget: form.budget
              });
              void submitRecommendations();
            }}
            type="button"
          >
            {isLoading ? <Loader2 size={16} /> : <Sparkles size={16} />}
            {isLoading
              ? "Montando curadoria..."
              : isPurchase
                ? "Ver ideias para comprar"
                : "Ver ideias"}
          </button>
        </fieldset>

        {isLoading ? (
          <div
            className="quiz-processing"
            id="quiz-loading-status"
            role="status"
            aria-live="polite"
          >
            <div className="quiz-processing-head">
              <span className="processing-orbit" aria-hidden="true">
                <Sparkles size={18} />
              </span>
              <div>
                <strong>Estamos montando sua curadoria</strong>
                <span>
                  Pode levar cerca de 30 segundos. Não feche esta tela.
                </span>
              </div>
            </div>

            <div className="processing-bar" aria-hidden="true">
              <span />
            </div>

            <ol className="processing-steps" aria-label="Etapas da curadoria">
              {loadingSteps.map((step, index) => {
                const isComplete = index < loadingStep;
                const isActive = index === loadingStep;

                return (
                  <li
                    className={
                      isActive
                        ? "processing-step is-active"
                        : isComplete
                          ? "processing-step is-complete"
                          : "processing-step"
                    }
                    key={step.title}
                  >
                    <span className="processing-dot" aria-hidden="true" />
                    <span>{step.title}</span>
                  </li>
                );
              })}
            </ol>

            <p className="processing-note">{activeLoadingStep.description}</p>
          </div>
        ) : null}

      </form>
      {error ? <div className="status quiz-status">{error}</div> : null}
    </div>
  );
}
