import { notFound } from "next/navigation";
import { getReadingList, getAllReadingLists, getBook } from "@/lib/data";
import { Metadata } from "next";
import BookCard from "@/components/book-card";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllReadingLists().map((rl) => ({ slug: rl.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const list = getReadingList(slug);
  if (!list) return { title: "Reading List Not Found" };
  return {
    title: `${list.title}.`,
    description: list.description,
  };
}

export default async function ReadingListPage({ params }: Props) {
  const { slug } = await params;
  const list = getReadingList(slug);
  if (!list) notFound();

  const books = list.books
    .map((id) => getBook(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getBook>>[];

  return (
    <div className="py-12 md:py-20">
      <div className="container-wide">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-wider text-accent mb-3">
            Reading List
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold text-text-primary mb-4"
            style={{ fontFamily: "var(--serif)" }}
          >
            {list.title}
          </h1>
          {list.description && (
            <p className="text-lg text-text-secondary max-w-2xl">
              {list.description}
            </p>
          )}
          <p className="text-sm text-text-muted mt-4">
            {books.length} book{books.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book, i) => (
            <div key={book.id} className="relative">
              <div className="absolute -top-2 -left-2 w-7 h-7 rounded-full bg-accent text-white text-xs flex items-center justify-center font-medium z-10">
                {i + 1}
              </div>
              <BookCard book={book} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
