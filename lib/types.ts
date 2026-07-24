export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorSlug: string;
  tradition?: string;
  publisher?: string;
  publisherSlug?: string;
  published?: string;
  edition?: string;
  translator?: string;
  editor?: string;
  originalLanguage?: string;
  isbn10?: string;
  isbn13?: string;
  pages?: number;
  language?: string;
  readingLevel?: string;
  audience?: string[];
  description: string;
  longDescription?: string;
  descriptionSource?: string;
  categories: string[];
  subjects: string[];
  tags: string[];
  cover: string;
  coverSource?: string;
  preview?: string;
  availability: AvailabilityLink[];
  scriptureReferences?: ScriptureReference[];
  featured?: boolean;
  recentlyAdded?: boolean;
  collections?: string[];
}

export interface AvailabilityLink {
  store: string;
  url: string;
  label?: string;
}

export interface ScriptureReference {
  book: string;
  chapter?: number;
  verseStart?: number;
  verseEnd?: number;
}

export interface Author {
  slug: string;
  name: string;
  portrait?: string;
  biography: string;
  tradition?: string;
  born?: string;
  died?: string;
  website?: string;
  books: string[];
  relatedAuthors?: string[];
}

export interface Publisher {
  slug: string;
  name: string;
  description?: string;
  website?: string;
  logo?: string;
  books: string[];
}

export interface Collection {
  slug: string;
  name: string;
  description?: string;
  books: string[];
}

export interface ReadingList {
  slug: string;
  title: string;
  description?: string;
  books: string[];
}

export interface ScriptureBook {
  name: string;
  abbreviations: string[];
  testament: "old" | "new";
  chapters: number;
}

export interface SearchResult {
  type: "book" | "author" | "collection";
  title: string;
  slug: string;
  subtitle?: string;
  cover?: string;
}
