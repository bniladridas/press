import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import { resolve } from "path";

const books = JSON.parse(
  readFileSync(resolve(__dirname, "../content/books.json"), "utf-8")
).books;

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

const TIMEOUT = 15_000;

// Stores known to block automated requests (403/500) but working in browsers
const BOT_BLOCKED_STORES = new Set(["Amazon"]);

async function checkUrl(url: string): Promise<{
  status: number;
  ok: boolean;
}> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT);
    const res = await fetch(url, {
      headers: HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);
    return { status: res.status, ok: res.ok };
  } catch {
    return { status: 0, ok: false };
  }
}

test.describe("Availability links", () => {
  for (const book of books) {
    test(`${book.title} — all availability links resolve`, async () => {
      const failures: string[] = [];
      const warnings: string[] = [];

      for (const link of book.availability) {
        const result = await checkUrl(link.url);

        if (result.ok) {
          continue;
        }

        if (BOT_BLOCKED_STORES.has(link.store)) {
          // Known bot-protected stores: warn but don't fail
          warnings.push(
            `  ⚠ ${link.store}: ${result.status || "NETWORK_ERROR"} (bot-blocked, likely valid) — ${link.url}`
          );
        } else {
          // Google Books, Christianbook, etc.: fail on non-200
          failures.push(
            `  ✗ ${link.store}: ${result.status || "NETWORK_ERROR"} — ${link.url}`
          );
        }
      }

      if (warnings.length > 0) {
        console.log(
          `\n${book.title} — bot-blocked (expected):\n${warnings.join("\n")}`
        );
      }

      if (failures.length > 0) {
        throw new Error(
          `\n${book.title} (${book.id}) — broken availability links:\n${failures.join("\n")}\n`
        );
      }
    });
  }
});

test.describe("books.json structure", () => {
  test("every book has at least one availability link", () => {
    for (const book of books) {
      expect(
        book.availability?.length,
        `${book.title}: expected availability links`
      ).toBeGreaterThan(0);
    }
  });

  test("every availability link has a valid URL", () => {
    for (const book of books) {
      for (const link of book.availability) {
        expect(
          link.url,
          `${book.title} — ${link.store}: expected a valid URL`
        ).toMatch(/^https?:\/\//);
      }
    }
  });

  test("every book has a cover image", () => {
    for (const book of books) {
      expect(
        book.cover,
        `${book.title}: expected a cover image path`
      ).toBeTruthy();
    }
  });

  test("every book has required fields", () => {
    for (const book of books) {
      expect(book.id, `${book.title}: missing id`).toBeTruthy();
      expect(book.title, `${book.title}: missing title`).toBeTruthy();
      expect(book.author, `${book.title}: missing author`).toBeTruthy();
      expect(
        book.description,
        `${book.title}: missing description`
      ).toBeTruthy();
      expect(book.isbn13, `${book.title}: missing isbn13`).toBeTruthy();
    }
  });
});
