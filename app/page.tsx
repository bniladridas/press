import {
  getFeaturedBooks,
  getRecentlyAddedBooks,
  getAllCollections,
  getAllBooks,
} from "@/lib/data";
import BookCard from "@/components/book-card";

export default function Home() {
  const featured = getFeaturedBooks();
  const recentlyAdded = getRecentlyAddedBooks();
  const collections = getAllCollections();
  const allBooks = getAllBooks();

  return (
    <div>
      <section className="py-20 md:py-28">
        <div className="container-narrow text-center">
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-6"
            style={{ fontFamily: "var(--serif)" }}
          >
            A quiet library of books centered on Jesus.
          </h1>
          <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
            Browse books on theology, Scripture, prayer, church history, and the
            Christian life.
          </p>
          <div className="max-w-md mx-auto">
            <form action="/search" method="GET" role="search">
              <label htmlFor="home-search" className="sr-only">
                Search books
              </label>
              <input
                id="home-search"
                type="text"
                name="q"
                placeholder="Search by title, author, or topic..."
                className="w-full px-5 py-3 rounded-lg border border-border bg-surface text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
            </form>
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="featured-heading">
        <div className="container-wide">
          <div className="flex items-baseline justify-between mb-10">
            <h2
              id="featured-heading"
              className="text-2xl font-semibold text-text-primary"
              style={{ fontFamily: "var(--serif)" }}
            >
              Featured
            </h2>
            <div className="h-px flex-1 ml-8 bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {featured.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="recent-heading">
        <div className="container-wide">
          <div className="flex items-baseline justify-between mb-10">
            <h2
              id="recent-heading"
              className="text-2xl font-semibold text-text-primary"
              style={{ fontFamily: "var(--serif)" }}
            >
              Recently Added
            </h2>
            <div className="h-px flex-1 ml-8 bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recentlyAdded.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 bg-surface"
        id="collections"
        aria-labelledby="collections-heading"
      >
        <div className="container-wide">
          <div className="flex items-baseline justify-between mb-10">
            <h2
              id="collections-heading"
              className="text-2xl font-semibold text-text-primary"
              style={{ fontFamily: "var(--serif)" }}
            >
              Collections
            </h2>
            <div className="h-px flex-1 ml-8 bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {collections.map((collection) => (
              <a
                key={collection.slug}
                href={`/collection/${collection.slug}`}
                className="group block p-6 rounded-lg border border-border hover:border-accent hover:bg-surface-hover transition-all"
              >
                <h3
                  className="text-lg font-medium text-text-primary group-hover:text-accent transition-colors mb-2"
                  style={{ fontFamily: "var(--serif)" }}
                >
                  {collection.name}
                </h3>
                {collection.description && (
                  <p className="text-sm text-text-muted line-clamp-2">
                    {collection.description}
                  </p>
                )}
                <p className="text-xs text-text-muted mt-3">
                  {collection.books.length} book
                  {collection.books.length !== 1 ? "s" : ""}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" aria-labelledby="all-books-heading">
        <div className="container-wide">
          <div className="flex items-baseline justify-between mb-10">
            <h2
              id="all-books-heading"
              className="text-2xl font-semibold text-text-primary"
              style={{ fontFamily: "var(--serif)" }}
            >
              All Books
            </h2>
            <div className="h-px flex-1 ml-8 bg-border" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {allBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
