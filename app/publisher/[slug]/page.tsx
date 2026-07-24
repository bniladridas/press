import { notFound } from "next/navigation";
import { getPublisher, getAllPublishers, getBook } from "@/lib/data";
import { Metadata } from "next";
import BookCard from "@/components/book-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPublishers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const publisher = getPublisher(slug);
  if (!publisher) return { title: "Publisher Not Found" };
  return {
    title: `${publisher.name}.`,
    description: publisher.description,
  };
}

export default async function PublisherPage({ params }: Props) {
  const { slug } = await params;
  const publisher = getPublisher(slug);
  if (!publisher) notFound();

  const books = publisher.books
    .map((id) => getBook(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getBook>>[];

  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            {publisher.name}
          </h1>
          {publisher.description && (
            <p className="text-lg text-text-secondary max-w-2xl">
              {publisher.description}
            </p>
          )}
          {publisher.website && (
            <a
              href={publisher.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-accent hover:underline mt-4"
            >
              Visit website
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
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
