import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import "./globals-mermaid.css";
import BuildInfo from "@/components/BuildInfo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Climate Leadership in Global Environmental Governance",
  description: "A research platform exploring climate leadership in global environmental governance through the lens of Thermal-Time-Environment Governance (TTEG) theory.",
  creator: "Design01",
};

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/chapters/en", label: "Chapters" },
  { href: "/concept-map", label: "Concept Map" },
  { href: "/design-system", label: "Design" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Site Header */}
        <header
          style={{ background: "var(--color-primary)", color: "#fff" }}
          className="flex-shrink-0"
        >
          <nav
            className="mx-auto px-4"
            style={{ maxWidth: "var(--page-max-width,1200px)" }}
          >
            <ul className="flex items-center gap-6 py-3 text-sm font-medium overflow-x-auto">
              <li className="flex-shrink-0 mr-2">
                <Link
                  href="/"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: "#fff", fontFamily: "var(--font-heading,Georgia,serif)" }}
                >
                  Climate Leadership
                </Link>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="flex-shrink-0">
                  <Link
                    href={link.href}
                    className="hover:opacity-80 transition-opacity"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-auto flex-shrink-0">
          <BuildInfo />
        </footer>
      </body>
    </html>
  );
}
