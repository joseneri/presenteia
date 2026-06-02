import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Search } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PresenteIA | Sugestoes de presentes com IA",
    template: "%s | PresenteIA"
  },
  description:
    "Encontre presentes criativos, uteis e bem escolhidos com ajuda de IA.",
  metadataBase: new URL("https://presenteia.com.br")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="site-shell">
          <header className="header">
            <nav className="container nav" aria-label="Principal">
              <Link href="/" className="brand">
                <span className="brand-mark" aria-hidden="true">
                  <Gift size={21} />
                  <span className="brand-spark" />
                </span>
                <span className="brand-word">
                  <span>Presente</span>
                  <span className="brand-ai">IA</span>
                </span>
              </Link>
              <form className="header-search" action="/buscar">
                <Search size={17} aria-hidden="true" />
                <input
                  name="q"
                  type="search"
                  placeholder="Busque por pessoa, data ou ideia de presente..."
                  aria-label="Pesquisar presentes"
                />
              </form>
              <div className="nav-links">
                <Link href="/presentes">Guias</Link>
                <Link href="/blog">Blog</Link>
                <Link href="/#recomendador">Recomendador</Link>
              </div>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">
            <div className="container footer-inner">
              <span>PresenteIA ajuda voce a escolher melhor, sem enrolar.</span>
              <span>
                Como Associado Amazon, podemos receber comissao por compras
                qualificadas.
              </span>
            </div>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
