import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-20 md:py-32">
      <div className="container-narrow text-center">
        <h1
          className="text-6xl md:text-8xl font-semibold text-text-muted mb-4"
          style={{ fontFamily: "var(--serif)" }}
        >
          404
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          This page could not be found.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-all"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
