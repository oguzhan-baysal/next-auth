import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js Auth0 Demo - Güvenli Kimlik Doğrulama",
  description: "Auth0 ile Next.js 14 yetkilendirme sistemi. TypeScript, TailwindCSS ve JWT tabanlı oturum yönetimi.",
  keywords: ["Next.js", "Auth0", "TypeScript", "TailwindCSS", "JWT", "OAuth", "Authentication"],
  authors: [{ name: "Next.js Auth0 Demo" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
