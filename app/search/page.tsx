"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Book } from "@/lib/types";
import BookCard from "@/components/book-card";

const ALL_BOOKS: Book[] = require("@/content/books.json").books;

function searchLocal(query: string): Book[] {
  const q = query.toLowerCase();
  return ALL_BOOKS.filter(
    (b: Book) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.publisher?.toLowerCase().includes(q) ||
      b.isbn10?.includes(q) ||
      b.isbn13?.includes(q) ||
      b.categories.some((c) => c.toLowerCase().includes(q)) ||
      b.subjects.some((s) => s.toLowerCase().includes(q)) ||
      b.tags.some((t) => t.toLowerCase().includes(q)) ||
      b.scriptureReferences?.some((r) =>
        `${r.book} ${r.chapter || ""}`.toLowerCase().includes(q)
      )
  );
}

function SearchInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Book[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery.trim()) {
      setResults(searchLocal(initialQuery));
      setHasSearched(true);
    }
  }, [initialQuery]);

  function handleChange(value: string) {
    setQuery(value);
    if (!value.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }
    setResults(searchLocal(value));
    setHasSearched(true);
  }

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto mb-12">
          <h1
            className="text-3xl md:text-4xl font-semibold text-text-primary mb-6 text-center"
            style={{ fontFamily: "var(--serif)" }}
          >
            Search
          </h1>
          <input
            type="text"
            value={query}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Search by title, author, ISBN, topic, or scripture..."
            className="w-full px-5 py-3 rounded-lg border border-border-light bg-transparent text-sm text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-accent/40 transition-all"
            autoFocus
          />
          <p className="text-xs text-text-muted mt-3 text-center">
            Search by title, author, ISBN, publisher, topic, scripture
            reference, or language
          </p>
        </div>

        {hasSearched && results.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-muted">
              No books found for &ldquo;{query}&rdquo;
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <p className="text-sm text-text-muted mb-6">
              {results.length} result{results.length !== 1 ? "s" : ""} for
              &ldquo;{query}&rdquo;
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {results.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        )}

        {!hasSearched && (
          <div className="text-center py-12">
            <p className="text-text-muted">
              Start typing to search the library.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchInner />
    </Suspense>
  );
}
