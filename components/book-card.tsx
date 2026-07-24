import Link from "next/link";
import Image from "next/image";
import { Book } from "@/lib/types";

function StarRating({ rating = 4 }: { rating?: number }) {
  return (
    <div className="stars text-sm" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden="true">
          {i < rating ? "\u2605" : "\u2606"}
        </span>
      ))}
    </div>
  );
}

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="book-card group block"
      aria-label={`${book.title} by ${book.author}`}
    >
      <div className="relative overflow-hidden rounded-md mb-4">
        {book.cover ? (
          <div className="book-cover w-full">
            <Image
              src={book.cover}
              alt={`Cover of ${book.title}`}
              width={300}
              height={450}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div
            className="book-cover w-full flex items-center justify-center p-6"
            role="img"
            aria-label={`Cover of ${book.title}`}
          >
            <div className="text-center">
              <div
                className="text-lg font-semibold text-text-primary leading-tight mb-2"
                style={{ fontFamily: "var(--serif)" }}
              >
                {book.title}
              </div>
              <div className="text-xs text-text-muted uppercase tracking-wider">
                {book.author}
              </div>
            </div>
          </div>
        )}
      </div>
      <h3
        className="text-base font-medium text-text-primary group-hover:text-accent transition-colors mb-1"
        style={{ fontFamily: "var(--serif)" }}
      >
        {book.title}
      </h3>
      <p className="text-sm text-text-secondary mb-2">{book.author}</p>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {book.tradition && (
          <span className="category-pill text-[10px]">{book.tradition}</span>
        )}
        {book.categories[0] && (
          <span className="category-pill text-[10px]">
            {book.categories[0]}
          </span>
        )}
      </div>
      <div className="mt-2 flex items-center gap-3">
        <StarRating />
        {book.published && (
          <span className="text-xs text-text-muted">
            Published {book.published}
          </span>
        )}
      </div>
    </Link>
  );
}
