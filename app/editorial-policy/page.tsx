import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Policy.",
  description:
    "How books are selected, described, and presented on Press.",
};

export default function EditorialPolicyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        <h1
          className="text-4xl md:text-5xl font-semibold text-text-primary mb-8"
          style={{ fontFamily: "var(--serif)" }}
        >
          Editorial Policy
        </h1>

        <div className="prose max-w-none">
          <p className="text-text-secondary leading-relaxed text-lg">
            Press exists to help readers discover books about Jesus, Christian
            theology, church history, and the Christian life. This page explains
            how books are chosen, how descriptions are written, and how the
            library is maintained.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            How books are selected
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Books are included based on their relevance to Christian life,
            theology, Scripture study, church history, and spiritual formation.
            Press does not evaluate books by popularity, sales, or critical
            acclaim. A book is included because it may serve a reader.
          </p>

          <p className="text-text-secondary leading-relaxed">
            The library represents multiple Christian traditions. No single
            tradition is treated as the default. Catholic, Eastern Orthodox,
            Reformed, Lutheran, Anglican, Baptist, Methodist, Pentecostal, and
            ecumenical works are all represented when they serve the purpose of
            the library.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Books are not excluded because Press editors may disagree with them.
            The purpose of the library is to present books faithfully, not to
            curate only those with which the editors agree.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            How descriptions are written
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Every book page contains two kinds of written content:
          </p>

          <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside mb-4">
            <li>
              <strong>Metadata</strong> &mdash; title, author, publisher, ISBN,
              page count, and similar factual information. This is sourced from
              publisher records and ISBN databases.
            </li>
            <li>
              <strong>Editorial summary</strong> &mdash; a description written by
              Press. These summaries explain what a book is about, not whether
              it is good. They describe the author&apos;s argument, the
              book&apos;s context, and the tradition it represents.
            </li>
          </ul>

          <p className="text-text-secondary leading-relaxed">
            Where a description is adapted from the publisher&apos;s materials,
            this is noted on the page. Where Press has written an original
            summary, this is also noted.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Descriptions avoid evaluative language. Words like &ldquo;brilliant,
            &rdquo; &ldquo;powerful,&rdquo; &ldquo;essential,&rdquo; and
            &ldquo;groundbreaking&rdquo; do not appear in Press summaries.
            Instead, descriptions use language like &ldquo;explores,&rdquo;
            &ldquo;examines,&rdquo; &ldquo;argues,&rdquo; and
            &ldquo;reflects on.&rdquo;
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            How traditions are identified
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Each book is assigned a tradition when there is clear evidence for
            doing so. Tradition is indicated when:
          </p>

          <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside mb-4">
            <li>
              The author is formally affiliated with a tradition (e.g., a
              Reformed pastor, a Catholic religious)
            </li>
            <li>
              The work is written within a clearly identifiable theological
              framework
            </li>
            <li>
              The book is published by a tradition-specific press or for a
              tradition-specific audience
            </li>
          </ul>

          <p className="text-text-secondary leading-relaxed">
            When no single tradition applies, Press uses &ldquo;Ecumenical&rdquo;
            or omits the tradition field entirely. Press does not infer
            tradition from subject matter alone.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Availability and links
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press does not sell books. Where links to bookstores or publishers
            are provided, they are labeled as &ldquo;availability&rdquo;
            information, not as calls to purchase. The language used is:
          </p>

          <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside mb-4">
            <li>View at [publisher]</li>
            <li>View at [bookstore]</li>
            <li>Learn more</li>
          </ul>

          <p className="text-text-secondary leading-relaxed">
            Press does not use &ldquo;Buy,&rdquo; &ldquo;Add to cart,&rdquo; or
            &ldquo;Add to wish list.&rdquo; The purpose of these links is to
            help readers find books, not to encourage purchases.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Copyright and previews
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press does not host copyrighted material without permission.
            Where book previews are available through official channels
            (Google Books, publisher websites, Internet Archive where
            permitted), Press links to them. Press does not reproduce book
            content beyond brief quotations necessary for description.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Public domain texts (those published before 1929 in the United
            States, or where copyright has expired) may be referenced more
            extensively, but Press does not host full texts.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Corrections
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press aims for accuracy in all metadata and descriptions. If you
            notice an error in a book&apos;s description, publication details,
            or classification, you are welcome to report it. Corrections are
            made promptly when errors are confirmed.
          </p>

          <p className="text-text-secondary leading-relaxed">
            Factual corrections (wrong ISBN, incorrect page count, wrong
            publication date) are addressed immediately. Disagreements with
            editorial summaries are noted but may not result in changes,
            since summaries are intended to be neutral and descriptive rather
            than comprehensive.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Long-term direction
          </h2>

          <p className="text-text-secondary leading-relaxed">
            As the library grows, Press will add richer metadata to help
            readers find books more precisely. Future additions may include:
          </p>

          <ul className="text-text-secondary leading-relaxed space-y-2 list-disc list-inside mb-4">
            <li>Scripture references</li>
            <li>Historical periods (Early Church, Reformation, Modern)</li>
            <li>Church councils and confessions</li>
            <li>Reading level and audience</li>
            <li>Original language and translator information</li>
          </ul>

          <p className="text-text-secondary leading-relaxed">
            These additions help readers understand books without making
            judgments about them. The goal is always to serve the reader, not
            to promote any particular book or tradition.
          </p>
        </div>
      </div>
    </div>
  );
}
