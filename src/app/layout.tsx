import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pompidou - Autonomous Dev System Catalogue",
  description: "A comprehensive guide to building autonomous AI development systems - 80+ evaluated tools across 5 phases",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
