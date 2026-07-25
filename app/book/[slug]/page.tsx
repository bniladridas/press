import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBook, getBooksByAuthor, getAllBooks } from "@/lib/data";
import { Metadata } from "next";
import ReadingModeToggle from "@/components/reading-mode-toggle";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ slug: book.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: "Book Not Found" };
  return {
    title: `${book.title}. by ${book.author}`,
    description: book.description,
  };
}

export default async function BookPage({ params }: Props) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const relatedBooks = getBooksByAuthor(book.authorSlug).filter(
    (b) => b.id !== book.id
  );

  const allBooks = getAllBooks();
  const relatedBySubject = allBooks
    .filter(
      (b) =>
        b.id !== book.id &&
        b.subjects.some((s) => book.subjects.includes(s))
    )
    .slice(0, 3);

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="reading-content">
          <div className="flex items-center justify-end mb-6">
            <ReadingModeToggle />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div
                className="book-cover w-full max-w-sm mx-auto"
              >
                {book.cover ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH}${book.cover}`}
                    alt={`Cover of ${book.title}`}
                    width={400}
                    height={600}
                    className="w-full h-full object-cover rounded-md"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center p-8 h-full">
                    <div className="text-center">
                      <div
                        className="text-2xl font-semibold text-text-primary leading-tight mb-3"
                        style={{ fontFamily: "var(--serif)" }}
                      >
                        {book.title}
                      </div>
                      {book.subtitle && (
                        <div className="text-sm text-text-muted italic mb-3">
                          {book.subtitle}
                        </div>
                      )}
                      <div className="text-xs text-text-muted uppercase tracking-wider">
                        {book.author}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {book.coverSource && (
                <p className="text-[10px] text-text-muted mt-2 text-center italic">
                  {book.coverSource}
                </p>
              )}

              {book.availability && book.availability.length > 0 && (
                <div className="availability-section mt-8">
                  <h3 className="text-xs uppercase tracking-wider text-text-muted mb-3">
                    Availability
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {book.availability.map((link) => (
                      <a
                        key={link.store}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-all"
                      >
                        {link.label || `View at ${link.store}`}
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 reading-content">
            <div className="mb-2">
              {book.tradition && (
                <span className="category-pill mr-2 mb-2">
                  {book.tradition}
                </span>
              )}
              {book.categories.map((cat) => (
                <span key={cat} className="category-pill mr-2 mb-2">
                  {cat}
                </span>
              ))}
            </div>

            <h1
              className="text-4xl md:text-5xl font-semibold text-text-primary mb-3"
              style={{ fontFamily: "var(--serif)" }}
            >
              {book.title}
            </h1>

            {book.subtitle && (
              <p className="text-xl text-text-secondary italic mb-4">
                {book.subtitle}
              </p>
            )}

            <p className="text-lg text-text-secondary mb-6">
              by{" "}
              <Link
                href={`/author/${book.authorSlug}`}
                className="hover:text-accent transition-colors"
              >
                {book.author}
              </Link>
            </p>

            {book.published && (
              <p className="text-sm text-text-muted mb-8">
                Originally published {book.published}
              </p>
            )}

            {/* Publication Details */}
            <div className="mb-10 p-6 bg-surface rounded-lg border border-border">
              <h2 className="text-xs uppercase tracking-wider text-text-muted mb-4">
                Publication details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {book.publisher && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Publisher
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.publisher}
                    </div>
                  </div>
                )}
                {book.published && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Original publication
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.published}
                    </div>
                  </div>
                )}
                {book.edition && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Edition
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.edition}
                    </div>
                  </div>
                )}
                {book.translator && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Translator
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.translator}
                    </div>
                  </div>
                )}
                {book.editor && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Editor
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.editor}
                    </div>
                  </div>
                )}
                {book.language && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Language
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.language}
                    </div>
                  </div>
                )}
                {book.originalLanguage && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Original language
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.originalLanguage}
                    </div>
                  </div>
                )}
                {book.pages && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Pages
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.pages}
                    </div>
                  </div>
                )}
                {book.isbn13 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      ISBN
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.isbn13}
                    </div>
                  </div>
                )}
                {book.readingLevel && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Reading level
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.readingLevel}
                    </div>
                  </div>
                )}
                {book.audience && book.audience.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Audience
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.audience.join(", ")}
                    </div>
                  </div>
                )}
                {book.categories.length > 0 && (
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Categories
                    </div>
                    <div className="text-sm text-text-primary">
                      {book.categories.join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2
                className="text-xl font-semibold text-text-primary mb-4"
                style={{ fontFamily: "var(--serif)" }}
              >
                About the book
              </h2>
              <div className="prose max-w-none">
                <p className="text-text-secondary leading-relaxed">
                  {book.description}
                </p>
                {book.longDescription && (
                  <p className="text-text-secondary leading-relaxed mt-4">
                    {book.longDescription}
                  </p>
                )}
              </div>
              {book.descriptionSource && (
                <p className="text-[10px] text-text-muted mt-4 italic">
                  {book.descriptionSource}
                </p>
              )}
            </div>

            {/* Scripture References */}
            {book.scriptureReferences &&
              book.scriptureReferences.length > 0 && (
                <div className="mb-10">
                  <h2
                    className="text-xl font-semibold text-text-primary mb-4"
                    style={{ fontFamily: "var(--serif)" }}
                  >
                    Scripture references
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {book.scriptureReferences.map((ref, i) => (
                      <Link
                        key={i}
                        href={`/scripture/${encodeURIComponent(ref.book)}${ref.chapter ? `-${ref.chapter}` : ""}`}
                        className="category-pill"
                      >
                        {ref.book}
                        {ref.chapter ? ` ${ref.chapter}` : ""}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Tags */}
            {book.tags.length > 0 && (
              <div className="mb-10">
                <h2
                  className="text-xl font-semibold text-text-primary mb-4"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  Tags
                </h2>
                <div className="flex flex-wrap gap-2">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 rounded-full bg-border-light text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Related Books */}
            {(relatedBooks.length > 0 || relatedBySubject.length > 0) && (
              <div className="related-section mt-12 pt-10 border-t border-border">
                <h2
                  className="text-xl font-semibold text-text-primary mb-6"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  More from this library
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {[...relatedBooks, ...relatedBySubject]
                    .slice(0, 6)
                    .map((b) => (
                       <Link
                         key={b.id}
                         href={`/book/${b.id}`}
                         className="group block"
                       >
                         <div className="book-cover w-full mb-3">
                           {b.cover ? (
                             <Image
                                 src={`${process.env.NEXT_PUBLIC_BASE_PATH}${b.cover}`}
                               alt={`Cover of ${b.title}`}
                               width={200}
                               height={300}
                               className="w-full h-full object-cover rounded"
                               unoptimized
                             />
                           ) : (
                             <div className="flex items-center justify-center p-4 h-full">
                               <div className="text-center">
                                 <div
                                   className="text-sm font-semibold text-text-primary leading-tight"
                                   style={{ fontFamily: "var(--serif)" }}
                                 >
                                   {b.title}
                                 </div>
                               </div>
                             </div>
                           )}
                         </div>
                        <h3 className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                          {b.title}
                        </h3>
                        <p className="text-xs text-text-muted">{b.author}</p>
                      </Link>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
