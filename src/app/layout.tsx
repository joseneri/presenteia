import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SiteHeader } from "@/components/SiteHeader";
import { activeTheme } from "@/lib/themes";
import "./globals.css";

const baseUrl = "https://presenteia.io";

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
    <html lang="pt-BR" data-theme={activeTheme.id}>
      <body>
        <div className="site-shell">
          <SiteHeader />
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
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
