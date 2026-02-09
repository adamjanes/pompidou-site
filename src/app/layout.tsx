import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL('https://pompidou.dev'),
  title: {
    default: "Pompidou - Autonomous Dev System Catalogue",
    template: "%s | Pompidou"
  },
  description: "A comprehensive catalogue of 130 evaluated tools for building autonomous AI development systems. From specification to deployment, discover the tools that power modern AI-assisted development workflows.",
  keywords: ["AI development", "autonomous systems", "developer tools", "AI agents", "DevOps", "automation", "Claude", "LLM tools"],
  authors: [{ name: "Pompidou Project" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pompidou.dev",
    title: "Pompidou - Autonomous Dev System Catalogue",
    description: "Comprehensive catalogue of 130 tools for building autonomous AI development systems",
    siteName: "Pompidou",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pompidou - Autonomous Dev System Catalogue",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pompidou - Autonomous Dev System Catalogue",
    description: "130 evaluated tools for building autonomous AI development systems",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
