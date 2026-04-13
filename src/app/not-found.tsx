import Link from "next/link";

import { notFoundPageCopy } from "@/content/landing-page-data";

export default function NotFound() {
  return (
    <main className="content-stack">
      <section className="section-card centered-card">
        <p className="eyebrow">{notFoundPageCopy.eyebrow}</p>
        <h1>{notFoundPageCopy.headline}</h1>
        <p className="hero-dek">{notFoundPageCopy.body}</p>
        <Link className="button button-primary" href={notFoundPageCopy.primaryCta.href}>
          {notFoundPageCopy.primaryCta.label}
        </Link>
      </section>
    </main>
  );
}
