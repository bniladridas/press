import Link from "next/link";
import { getAllReadingLists } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reading Lists.",
  description: "Curated reading paths for exploring the Christian faith.",
};

export default function ReadingListsPage() {
  const lists = getAllReadingLists();

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            Reading Lists
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl">
            Curated paths through the library, arranged by theme and stage of
            the Christian journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lists.map((list) => (
            <Link
              key={list.slug}
              href={`/reading-list/${list.slug}`}
              className="group block p-8 rounded-lg border border-border hover:border-accent hover:bg-surface-hover transition-all"
            >
              <h2
                className="text-2xl font-semibold text-text-primary group-hover:text-accent transition-colors mb-3"
                style={{ fontFamily: "var(--serif)" }}
              >
                {list.title}
              </h2>
              {list.description && (
                <p className="text-text-secondary mb-4">{list.description}</p>
              )}
              <p className="text-sm text-text-muted">
                {list.books.length} book{list.books.length !== 1 ? "s" : ""}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
