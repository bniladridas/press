import { notFound } from "next/navigation";
import { getCollection, getBooksByCollection, getAllCollections } from "@/lib/data";
import { Metadata } from "next";
import BookCard from "@/components/book-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllCollections().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: `${collection.name}.`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const books = getBooksByCollection(slug);

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-lg text-text-secondary max-w-2xl">
              {collection.description}
            </p>
          )}
          <p className="text-sm text-text-muted mt-4">
            {books.length} book{books.length !== 1 ? "s" : ""} in this
            collection
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-16">
            <p className="text-text-muted">
              No books in this collection yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
