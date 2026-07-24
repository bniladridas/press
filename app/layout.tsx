import type { Metadata } from "next";
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
    url: "https://press.example.com",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <A11yProvider>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>

          <header className="site-header border-b border-border">
            <div className="container-wide py-6 flex items-center justify-between">
              <a href="/" className="flex items-center gap-3">
                <span
                  className="text-2xl font-semibold tracking-tight"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  Press
                </span>
              </a>
              <nav
                className="hidden md:flex items-center gap-8 text-sm text-text-secondary"
                aria-label="Main navigation"
              >
                <a
                  href="/#featured"
                  className="hover:text-accent transition-colors"
                >
                  Featured
                </a>
                <a
                  href="/#collections"
                  className="hover:text-accent transition-colors"
                >
                  Collections
                </a>
                <a
                  href="/search"
                  className="hover:text-accent transition-colors"
                >
                  Search
                </a>
                <a
                  href="/about"
                  className="hover:text-accent transition-colors"
                >
                  About
                </a>
                <a
                  href="/contact"
                  className="hover:text-accent transition-colors"
                >
                  Contact
                </a>
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
                    <a href="/#collections" className="hover:text-accent">
                      Collections
                    </a>
                    <a href="/search" className="hover:text-accent">
                      Search
                    </a>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-text-muted uppercase text-xs tracking-wider">
                      About
                    </span>
                    <a href="/about" className="hover:text-accent">
                      About Press
                    </a>
                    <a href="/editorial-policy" className="hover:text-accent">
                      Editorial Policy
                    </a>
                    <a href="/contact" className="hover:text-accent">
                      Contact
                    </a>
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
