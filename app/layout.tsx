import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { A11yProvider } from "@/components/a11y-provider";
import A11yPanel from "@/components/a11y-panel";

export const metadata: Metadata = {
  title: {
    default: "Press. A bookshelf of Christian books",
    template: "%s. Press",
  },
  description:
    "A bookshelf of Christian books. Browse books on theology, Scripture, prayer, church history, and the Christian life.",
  openGraph: {
    title: "Press",
    description:
      "A bookshelf of Christian books.",
    url: "https://bniladridas.github.io/press",
    siteName: "Press",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Press",
    description:
      "A bookshelf of Christian books.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/press/favicon.ico" sizes="any" />
        <link rel="icon" href="/press/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <A11yProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <header className="site-header border-b border-border">
            <div className="container-wide py-6 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3">
                <span
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  Press
                </span>
              </Link>
              <nav
                className="hidden md:flex items-center gap-8 text-sm text-text-secondary"
                aria-label="Main navigation"
              >
                <a
                  href="/press/#featured"
                  className="hover:text-accent transition-colors"
                >
                  Featured
                </a>
                <a
                  href="/press/#collections"
                  className="hover:text-accent transition-colors"
                >
                  Collections
                </a>
                <Link
                  href="/search"
                  className="hover:text-accent transition-colors"
                >
                  Search
                </Link>
                <Link
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>
          </header>

          <main id="main-content" className="min-h-screen">
            {children}
          </main>

          <footer className="site-footer border-t border-border mt-24">
            <div className="container-wide py-12">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div>
                  <span
                    className="text-lg font-semibold"
                    style={{ fontFamily: "var(--serif)" }}
                  >
                    Press
                  </span>
                  <p className="text-sm text-text-muted mt-2 max-w-sm">
                    A quiet library of books centered on Jesus. A place to
                    discover, not a place to buy.
                  </p>
                </div>
                <div className="flex gap-12 text-sm text-text-secondary">
                  <div className="flex flex-col gap-2">
                    <span className="text-text-muted uppercase text-xs tracking-wider">
                      Browse
                    </span>
                    <a href="/press/#collections" className="hover:text-accent">
                      Collections
                    </a>
                    <Link href="/search" className="hover:text-accent">
                      Search
                    </Link>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-text-muted uppercase text-xs tracking-wider">
                      About
                    </span>
                    <Link href="/about" className="hover:text-accent">
                      About Press
                    </Link>
                    <Link href="/editorial-policy" className="hover:text-accent">
                      Editorial Policy
                    </Link>
                    <Link href="/contact" className="hover:text-accent">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-border-light text-xs text-text-muted">
                Press is a curated bookshelf, not a store. We do not sell books.
                We help people discover them.
              </div>
            </div>
          </footer>

          <A11yPanel />
        </A11yProvider>
      </body>
    </html>
  );
}
