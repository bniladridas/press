import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Contact.",
  description:
    "Report an issue, suggest a correction, recommend a book, or reach the editor.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        <h1
          className="text-4xl md:text-5xl font-semibold text-text-primary mb-8"
          style={{ fontFamily: "var(--serif)" }}
        >
          Editorial Contact
        </h1>

        <div className="prose max-w-none">
          <p className="text-text-secondary leading-relaxed text-lg">
            Press is maintained by a small editorial effort. If you have a
            question, correction, or suggestion, you are welcome to reach out.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Report an issue
          </h2>

          <p className="text-text-secondary leading-relaxed">
            If you notice incorrect metadata, a broken link, a misclassified
            book, or any other factual error, please report it. Corrections are
            made promptly when errors are confirmed.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Suggest a correction
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Factual corrections (wrong ISBN, incorrect page count, wrong
            publication date, inaccurate description) are addressed immediately.
            Disagreements with editorial summaries are noted but may not result
            in changes, since summaries are intended to be neutral and
            descriptive rather than comprehensive.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Recommend a book
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press welcomes suggestions for books to include in the library. If
            you know of a book that serves readers well and fits the purpose of
            Press, please share it. Not all suggestions will be added, but all
            are considered.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Copyright inquiry
          </h2>

          <p className="text-text-secondary leading-relaxed">
            If you are a publisher or rights holder and have a concern about how
            your work is represented on Press, please reach out. Press respects
            copyright and will respond promptly to legitimate requests.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Accessibility feedback
          </h2>

          <p className="text-text-secondary leading-relaxed">
            Press is committed to being accessible to all readers. If you
            encounter an accessibility issue, please report it. Your feedback
            helps improve the experience for everyone.
          </p>

          <div className="divider" />

          <h2
            className="text-2xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Contact the editor
          </h2>

          <p className="text-text-secondary leading-relaxed">
            For general questions, partnerships, or anything else, you may
            contact the editor directly. Press does not accept paid placements,
            sponsored content, or promotional considerations of any kind.
          </p>
        </div>
      </div>
    </div>
  );
}
