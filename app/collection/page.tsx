import Link from "next/link";
import { getAllCollections } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections.",
  description: "Browse books by topic, tradition, and theme.",
};

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Collections
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Browse the library by topic, tradition, and theme.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/collection/${collection.slug}`}
              className="group block p-8 rounded-lg border border-border hover:border-accent hover:bg-surface-hover transition-all"
            >
              <h2
                className="text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-3"
                style={{ fontFamily: "var(--serif)" }}
              >
                {collection.name}
              </h2>
              {collection.description && (
                <p className="text-text-secondary mb-4 line-clamp-2">
                  {collection.description}
                </p>
              )}
              <p className="text-sm text-text-muted">
                {collection.books.length} book
                {collection.books.length !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
