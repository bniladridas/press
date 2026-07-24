import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Press.",
  description:
    "About Press, a quiet library of books centered on Jesus.",
};

export default function AboutPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        <h1
          className="text-4xl md:text-5xl font-semibold text-text-primary mb-8"
          style={{ fontFamily: "var(--serif)" }}
        >
          About Press
        </h1>

        <div className="prose max-w-none">
          <p className="text-text-secondary leading-relaxed text-lg">
            Press is a curated bookshelf of books about Jesus, Christianity,
            theology, church history, and the Christian life. It does not host
            books. It helps people discover them.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            A quiet place to browse
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Think of a small monastery library rather than an online store. The
            design is intentional: warm white backgrounds, soft gray text, muted
            gold accents, plenty of whitespace. The page should feel peaceful.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Every book in the collection has been chosen with care. The metadata
            is accurate. The descriptions are honest. The links point to
            official sources where you can learn more or acquire the book through
            legitimate channels.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Not a bookstore
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press does not sell books, offer discounts, or run promotions. There
            are no affiliate links, no sponsored placements, and no advertising.
            The purpose is to help readers find books, not to persuade them to
            buy.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Press is not a publisher. It does not produce, print, or distribute
            books. It is a guide to books that already exist.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Browsing by Scripture
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press allows you to browse books by Scripture reference. If you are
            studying Romans, you can see what books are available. If you are
            looking for works on the Sermon on the Mount, Press can help you find
            them. This feature exists to serve those who want to go deeper into
            God&apos;s Word.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            How we speak about books
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Books may come from different Christian traditions. Press does not
            present one tradition as the default. Authors speak for themselves.
            Descriptions help readers understand the subject without replacing
            the author&apos;s work or overstating its conclusions.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Where topics are debated, Press uses careful language: &ldquo;this
            author argues,&rdquo; &ldquo;within the Reformed tradition,&rdquo;
            &ldquo;often understood as.&rdquo; The goal is honesty, not
            certainty where the authors themselves may differ.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Principles
          </h2>

          <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside">
            <li>Books before commerce</li>
            <li>Discovery before promotion</li>
            <li>Accurate metadata</li>
            <li>Respect for copyright</li>
            <li>Links to official previews when available</li>
            <li>
              A calm, readable experience that encourages thoughtful reading
            </li>
          </ul>

          <div className="divider" />

          <p className="text-text-muted text-sm">
            Press is built on{" "}
            <a
              href="https://palmshed.github.io/base"
              className="underline hover:text-accent"
            >
              Base
            </a>
            , an open source foundation maintained by{" "}
            <a
              href="https://github.com/palmshed"
              className="underline hover:text-accent"
            >
              Palmshed
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
