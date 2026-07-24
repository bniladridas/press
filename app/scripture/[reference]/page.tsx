import Link from "next/link";
import { notFound } from "next/navigation";
import { getBooksByScripture, scriptureBooks, getAllBooks } from "@/lib/data";
import { Metadata } from "next";
import BookCard from "@/components/book-card";

type Props = {
  params: Promise<{ reference: string }>;
};

export function generateStaticParams() {
  const params: { reference: string }[] = [];

  for (const book of scriptureBooks) {
    params.push({ reference: encodeURIComponent(book.name) });
  }

  const allBooks = getAllBooks();
  for (const book of allBooks) {
    if (book.scriptureReferences) {
      for (const ref of book.scriptureReferences) {
        const encoded = encodeURIComponent(ref.book);
        if (!params.some((p) => p.reference === encoded)) {
          params.push({ reference: encoded });
        }
        if (ref.chapter) {
          const withChapter = `${encoded}-${ref.chapter}`;
          if (!params.some((p) => p.reference === withChapter)) {
            params.push({ reference: withChapter });
          }
        }
      }
    }
  }

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference).replace(/-(\d+)$/, " $1");
  return {
    title: `Books about ${decoded}.`,
    description: `Browse books that reference ${decoded} in Scripture.`,
  };
}

export default async function ScripturePage({ params }: Props) {
  const { reference } = await params;
  const decoded = decodeURIComponent(reference).replace(/-(\d+)$/, " $1");

  const matchingScripture = scriptureBooks.find(
    (s) =>
      s.name.toLowerCase() === decoded.toLowerCase() ||
      s.abbreviations.some(
        (a) => a.toLowerCase() === decoded.toLowerCase().split(" ")[0]
      )
  );

  const books = getBooksByScripture(decoded);

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent mb-3">
            Scripture Reference
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            {matchingScripture?.name || decoded}
          </h1>
          {matchingScripture && (
            <p className="text-sm text-text-muted">
              {matchingScripture.testament === "old"
                ? "Old Testament"
                : "New Testament"}{" "}
              · {matchingScripture.chapters} chapters
            </p>
          )}
          <p className="text-sm text-text-muted mt-4">
            {books.length} book{books.length !== 1 ? "s" : ""} reference this
            passage
          </p>
        </div>

        {books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-muted">
              No books reference this passage yet.
            </p>
          </div>
        )}

        <div className="mt-20">
          <h2
            className="text-xl font-semibold text-text-primary mb-6"
            style={{ fontFamily: "var(--serif)" }}
          >
            Browse by Scripture Book
          </h2>
          <h3 className="text-sm text-text-muted uppercase tracking-wider mb-3">
            New Testament
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {scriptureBooks
              .filter((s) => s.testament === "new")
              .map((s) => (
                <Link
                  key={s.name}
                  href={`/scripture/${encodeURIComponent(s.name)}`}
                  className="category-pill text-center"
                >
                  {s.name}
                </Link>
              ))}
          </div>
          <h3 className="text-sm text-text-muted uppercase tracking-wider mb-3">
            Old Testament
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {scriptureBooks
              .filter((s) => s.testament === "old")
              .map((s) => (
                <Link
                  key={s.name}
                  href={`/scripture/${encodeURIComponent(s.name)}`}
                  className="category-pill text-center"
                >
                  {s.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
