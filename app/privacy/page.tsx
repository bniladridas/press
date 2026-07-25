import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Press application.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-20">
      <div className="container-narrow reading-content">
        <h1
          className="text-4xl md:text-5xl font-semibold text-text-primary mb-8"
          style={{ fontFamily: "var(--serif)" }}
        >
          Privacy Policy
        </h1>

        <p className="text-sm text-text-muted mb-8">
          Last updated: July 2026
        </p>

        <div className="prose max-w-none space-y-8">
          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Overview
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Press is a static bookshelf application. It does not collect,
              store, transmit, or share any personal data.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Data Collection
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Press does not collect any data. There is no analytics, no
              tracking, no user accounts, no cloud sync, no advertising, and no
              third-party SDKs that collect data.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Network Usage
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Press loads only its own static content. Book cover images and
              page content are served from the app bundle. The app requires an
              internet connection only to load availability links (Amazon,
              Barnes &amp; Noble, Google Books, Christianbook) which are opened
              in your browser. These sites have their own privacy policies.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Permissions
            </h2>
            <p className="text-text-secondary leading-relaxed">
              Press requests internet access on Android, required to load
              availability links in your browser. Press does not transmit any
              data.
            </p>
            <p className="text-text-secondary leading-relaxed mt-4">
              Press does not request access to camera, microphone, location,
              contacts, photos, device identifiers, or biometric data.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Changes to This Policy
            </h2>
            <p className="text-text-secondary leading-relaxed">
              If this privacy policy changes, the updated version will be
              available in the app repository.
            </p>
          </section>

          <section>
            <h2
              className="text-xl font-semibold text-text-primary mb-4"
              style={{ fontFamily: "var(--serif)" }}
            >
              Contact
            </h2>
            <p className="text-text-secondary leading-relaxed">
              For questions about this privacy policy, please open an issue at{" "}
              <a
                href="https://github.com/bniladridas/press/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                github.com/bniladridas/press/issues
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
