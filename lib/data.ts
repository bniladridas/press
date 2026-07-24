import { Book, Author, Publisher, Collection, ReadingList, ScriptureBook } from "./types";
import booksData from "@/content/books.json";
import authorsData from "@/content/authors.json";
import publishersData from "@/content/publishers.json";
import collectionsData from "@/content/collections.json";
import readingListsData from "@/content/reading-lists.json";

const allBooks: Book[] = booksData.books;
const allAuthors: Author[] = authorsData.authors;
const allPublishers: Publisher[] = publishersData.publishers;
const allCollections: Collection[] = collectionsData.collections;
const allReadingLists: ReadingList[] = readingListsData.readingLists;

export function getAllBooks(): Book[] {
  return allBooks;
}

export function getBook(slug: string): Book | undefined {
  return allBooks.find((b) => b.id === slug);
}

export function getAllAuthors(): Author[] {
  return allAuthors;
}

export function getAuthor(slug: string): Author | undefined {
  return allAuthors.find((a) => a.slug === slug);
}

export function getAllPublishers(): Publisher[] {
  return allPublishers;
}

export function getPublisher(slug: string): Publisher | undefined {
  return allPublishers.find((p) => p.slug === slug);
}

export function getAllCollections(): Collection[] {
  return allCollections;
}

export function getCollection(slug: string): Collection | undefined {
  return allCollections.find((c) => c.slug === slug);
}

export function getAllReadingLists(): ReadingList[] {
  return allReadingLists;
}

export function getReadingList(slug: string): ReadingList | undefined {
  return allReadingLists.find((rl) => rl.slug === slug);
}

export function getBooksByAuthor(authorSlug: string): Book[] {
  return allBooks.filter((b) => b.authorSlug === authorSlug);
}

export function getBooksByCollection(collectionSlug: string): Book[] {
  const collection = getCollection(collectionSlug);
  if (!collection) return [];
  return collection.books.map((id) => getBook(id)).filter(Boolean) as Book[];
}

export function getBooksByCategory(category: string): Book[] {
  return allBooks.filter(
    (b) =>
      b.categories.includes(category) ||
      b.subjects.includes(category) ||
      b.tags.includes(category)
  );
}

export function getFeaturedBooks(): Book[] {
  return allBooks.filter((b) => b.featured);
}

export function getRecentlyAddedBooks(): Book[] {
  return allBooks.filter((b) => b.recentlyAdded);
}

export function getBooksByScripture(scriptureRef: string): Book[] {
  return allBooks.filter((b) =>
    b.scriptureReferences?.some(
      (ref) =>
        ref.book.toLowerCase().includes(scriptureRef.toLowerCase()) ||
        `${ref.book} ${ref.chapter}`.toLowerCase().includes(scriptureRef.toLowerCase())
    )
  );
}

export function searchBooks(query: string): Book[] {
  const q = query.toLowerCase();
  return allBooks.filter(
    (b) =>
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

export const scriptureBooks: ScriptureBook[] = [
  { name: "Genesis", abbreviations: ["Gen"], testament: "old", chapters: 50 },
  { name: "Exodus", abbreviations: ["Exod"], testament: "old", chapters: 40 },
  { name: "Leviticus", abbreviations: ["Lev"], testament: "old", chapters: 27 },
  { name: "Numbers", abbreviations: ["Num"], testament: "old", chapters: 36 },
  { name: "Deuteronomy", abbreviations: ["Deut"], testament: "old", chapters: 34 },
  { name: "Joshua", abbreviations: ["Josh"], testament: "old", chapters: 24 },
  { name: "Judges", abbreviations: ["Judg"], testament: "old", chapters: 21 },
  { name: "Ruth", abbreviations: ["Ruth"], testament: "old", chapters: 4 },
  { name: "1 Samuel", abbreviations: ["1 Sam"], testament: "old", chapters: 31 },
  { name: "2 Samuel", abbreviations: ["2 Sam"], testament: "old", chapters: 24 },
  { name: "1 Kings", abbreviations: ["1 Kgs"], testament: "old", chapters: 22 },
  { name: "2 Kings", abbreviations: ["2 Kgs"], testament: "old", chapters: 25 },
  { name: "1 Chronicles", abbreviations: ["1 Chr"], testament: "old", chapters: 29 },
  { name: "2 Chronicles", abbreviations: ["2 Chr"], testament: "old", chapters: 36 },
  { name: "Ezra", abbreviations: ["Ezra"], testament: "old", chapters: 10 },
  { name: "Nehemiah", abbreviations: ["Neh"], testament: "old", chapters: 13 },
  { name: "Esther", abbreviations: ["Esth"], testament: "old", chapters: 10 },
  { name: "Job", abbreviations: ["Job"], testament: "old", chapters: 42 },
  { name: "Psalms", abbreviations: ["Ps"], testament: "old", chapters: 150 },
  { name: "Proverbs", abbreviations: ["Prov"], testament: "old", chapters: 31 },
  { name: "Ecclesiastes", abbreviations: ["Eccl"], testament: "old", chapters: 12 },
  { name: "Song of Solomon", abbreviations: ["Song"], testament: "old", chapters: 8 },
  { name: "Isaiah", abbreviations: ["Isa"], testament: "old", chapters: 66 },
  { name: "Jeremiah", abbreviations: ["Jer"], testament: "old", chapters: 52 },
  { name: "Lamentations", abbreviations: ["Lam"], testament: "old", chapters: 5 },
  { name: "Ezekiel", abbreviations: ["Ezek"], testament: "old", chapters: 48 },
  { name: "Daniel", abbreviations: ["Dan"], testament: "old", chapters: 12 },
  { name: "Hosea", abbreviations: ["Hos"], testament: "old", chapters: 14 },
  { name: "Joel", abbreviations: ["Joel"], testament: "old", chapters: 3 },
  { name: "Amos", abbreviations: ["Amos"], testament: "old", chapters: 9 },
  { name: "Obadiah", abbreviations: ["Obad"], testament: "old", chapters: 1 },
  { name: "Jonah", abbreviations: ["Jonah"], testament: "old", chapters: 4 },
  { name: "Micah", abbreviations: ["Mic"], testament: "old", chapters: 7 },
  { name: "Nahum", abbreviations: ["Nah"], testament: "old", chapters: 3 },
  { name: "Habakkuk", abbreviations: ["Hab"], testament: "old", chapters: 3 },
  { name: "Zephaniah", abbreviations: ["Zeph"], testament: "old", chapters: 3 },
  { name: "Haggai", abbreviations: ["Hag"], testament: "old", chapters: 2 },
  { name: "Zechariah", abbreviations: ["Zech"], testament: "old", chapters: 14 },
  { name: "Malachi", abbreviations: ["Mal"], testament: "old", chapters: 4 },
  { name: "Matthew", abbreviations: ["Matt"], testament: "new", chapters: 28 },
  { name: "Mark", abbreviations: ["Mark"], testament: "new", chapters: 16 },
  { name: "Luke", abbreviations: ["Luke"], testament: "new", chapters: 24 },
  { name: "John", abbreviations: ["John"], testament: "new", chapters: 21 },
  { name: "Acts", abbreviations: ["Acts"], testament: "new", chapters: 28 },
  { name: "Romans", abbreviations: ["Rom"], testament: "new", chapters: 16 },
  { name: "1 Corinthians", abbreviations: ["1 Cor"], testament: "new", chapters: 16 },
  { name: "2 Corinthians", abbreviations: ["2 Cor"], testament: "new", chapters: 13 },
  { name: "Galatians", abbreviations: ["Gal"], testament: "new", chapters: 6 },
  { name: "Ephesians", abbreviations: ["Eph"], testament: "new", chapters: 6 },
  { name: "Philippians", abbreviations: ["Phil"], testament: "new", chapters: 4 },
  { name: "Colossians", abbreviations: ["Col"], testament: "new", chapters: 4 },
  { name: "1 Thessalonians", abbreviations: ["1 Thess"], testament: "new", chapters: 5 },
  { name: "2 Thessalonians", abbreviations: ["2 Thess"], testament: "new", chapters: 3 },
  { name: "1 Timothy", abbreviations: ["1 Tim"], testament: "new", chapters: 6 },
  { name: "2 Timothy", abbreviations: ["2 Tim"], testament: "new", chapters: 4 },
  { name: "Titus", abbreviations: ["Titus"], testament: "new", chapters: 3 },
  { name: "Philemon", abbreviations: ["Phlm"], testament: "new", chapters: 1 },
  { name: "Hebrews", abbreviations: ["Heb"], testament: "new", chapters: 13 },
  { name: "James", abbreviations: ["Jas"], testament: "new", chapters: 5 },
  { name: "1 Peter", abbreviations: ["1 Pet"], testament: "new", chapters: 5 },
  { name: "2 Peter", abbreviations: ["2 Pet"], testament: "new", chapters: 3 },
  { name: "1 John", abbreviations: ["1 John"], testament: "new", chapters: 5 },
  { name: "2 John", abbreviations: ["2 John"], testament: "new", chapters: 1 },
  { name: "3 John", abbreviations: ["3 John"], testament: "new", chapters: 1 },
  { name: "Jude", abbreviations: ["Jude"], testament: "new", chapters: 1 },
  { name: "Revelation", abbreviations: ["Rev"], testament: "new", chapters: 22 },
];
