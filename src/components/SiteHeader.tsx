"use client";

import { FormEvent } from "react";
import Link from "next/link";
import { Gift, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function SiteHeader() {
  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();

    trackEvent("site_search", {
      search_term: query,
      location: "header"
    });
  }

  return (
    <header className="header">
      <nav className="container nav" aria-label="Principal">
        <Link
          href="/"
          className="brand"
          onClick={() => trackEvent("navigation_click", { label: "brand", href: "/" })}
        >
          <span className="brand-mark" aria-hidden="true">
            <Gift size={21} />
            <span className="brand-spark" />
          </span>
          <span className="brand-word">
            <span>Presente</span>
            <span className="brand-ai">IA</span>
          </span>
        </Link>
        <form className="header-search" action="/buscar" onSubmit={onSearchSubmit}>
          <Search size={17} aria-hidden="true" />
          <input
            name="q"
            type="search"
            placeholder="Busque por pessoa, data ou ideia de presente..."
            aria-label="Pesquisar presentes"
            onFocus={() => trackEvent("search_focus", { location: "header" })}
          />
        </form>
        <div className="nav-links">
          <Link
            href="/presentes"
            onClick={() =>
              trackEvent("navigation_click", { label: "Guias", href: "/presentes" })
            }
          >
            Guias
          </Link>
          <Link
            href="/blog"
            onClick={() =>
              trackEvent("navigation_click", { label: "Blog", href: "/blog" })
            }
          >
            Blog
          </Link>
          <Link
            href="/#explorar"
            onClick={() =>
              trackEvent("navigation_click", { label: "Explorar", href: "/#explorar" })
            }
          >
            Explorar
          </Link>
        </div>
      </nav>
    </header>
  );
}
