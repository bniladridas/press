import { notFound } from "next/navigation";
import { getAuthor, getAllAuthors, getBooksByAuthor } from "@/lib/data";
import { Metadata } from "next";
import BookCard from "@/components/book-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name}.`,
    description: author.biography,
  };
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthor(slug);
  if (!author) notFound();

  const books = getBooksByAuthor(slug);

  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            {author.name}
          </h1>
          {author.tradition && (
            <span className="category-pill">{author.tradition}</span>
          )}
          {author.born && author.died && (
            <p className="text-sm text-text-muted mt-3">
              {author.born}–{author.died}
            </p>
          )}
          {author.born && !author.died && (
            <p className="text-sm text-text-muted mt-3">
              Born {author.born}
            </p>
          )}
        </div>

        <div className="mb-12">
          <h2
            className="text-xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Biography
          </h2>
          <div className="prose max-w-none">
            <p className="text-text-secondary leading-relaxed">
              {author.biography}
            </p>
          </div>
        </div>

        <div>
          <h2
            className="text-xl font-semibold text-text-primary mb-6"
            style={{ fontFamily: "var(--serif)" }}
          >
            Books
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
