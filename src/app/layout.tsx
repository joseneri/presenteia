import type { Metadata } from "next";
import Link from "next/link";
import { Gift, Search } from "lucide-react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = "https://presenteia.com.br";

export const metadata: Metadata = {
  title: {
    default: "PresenteIA | Sugestoes de presentes com IA",
    template: "%s | PresenteIA"
  },
  description:
    "Encontre presentes criativos, uteis e bem escolhidos com ajuda de IA. Recomendador inteligente por pessoa, ocasiao e orcamento.",
  metadataBase: new URL(baseUrl),
  keywords: [
    "presente", "ideia de presente", "presente aniversario", "presente natal",
    "presente dia dos namorados", "presente dia das maes", "presente dia dos pais",
    "amigo secreto", "recomendador de presentes", "presente barato"
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: baseUrl,
    siteName: "PresenteIA",
    title: "PresenteIA | Sugestoes de presentes com IA",
    description: "Recomendador inteligente de presentes por pessoa, ocasiao, orcamento e interesse.",
    images: [
      {
        url: `${baseUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: "PresenteIA — Sugestoes de presentes com IA"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PresenteIA | Sugestoes de presentes com IA",
    description: "Recomendador inteligente de presentes por pessoa, ocasiao, orcamento e interesse.",
    images: [`${baseUrl}/og-default.png`]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
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
