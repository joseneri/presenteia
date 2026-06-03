"use client";

import { MouseEvent, FormEvent } from "react";
import Link from "next/link";
import { Gift, Search } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export function SiteHeader() {
  function onBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    trackEvent("navigation_click", { label: "brand", href: "/" });

    if (window.location.pathname !== "/") {
      return;
    }

    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onSearchSubmit(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("q") ?? "").trim();

    trackEvent("site_search", {
      search_term: query,
      location: "header"
    });
  }

  function onSectionLinkClick(
    event: MouseEvent<HTMLAnchorElement>,
    label: string,
    targetPath: string,
    targetId: string
  ) {
    const href = `${targetPath}#${targetId}`;

    trackEvent("navigation_click", { label, href });

    if (window.location.pathname !== targetPath) {
      return;
    }

    event.preventDefault();
    window.history.replaceState(null, "", href);
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  return (
    <header className="header">
      <nav className="container nav" aria-label="Principal">
        <Link
          href="/"
          className="brand"
          onClick={onBrandClick}
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
            href="/presentes#guias"
            onClick={(event) =>
              onSectionLinkClick(event, "Guias", "/presentes", "guias")
            }
          >
            Guias
          </Link>
          <Link
            href="/blog#blog"
            onClick={(event) =>
              onSectionLinkClick(event, "Blog", "/blog", "blog")
            }
          >
            Blog
          </Link>
          <Link
            href="/#ideias-populares"
            onClick={(event) =>
              onSectionLinkClick(event, "Explorar", "/", "ideias-populares")
            }
          >
            Explorar
          </Link>
        </div>
      </nav>
    </header>
  );
}
