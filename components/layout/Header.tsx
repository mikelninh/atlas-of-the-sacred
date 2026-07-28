import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      {/* The brand intentionally uses Next Link for internal navigation. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <Link className="brand" href="/"><span className="brand-mark">✦</span><span>Atlas of the Sacred</span></Link>
      <nav aria-label="Main navigation">
        <a href="/#purpose">Purpose</a>
        <Link href="/journeys/common-thread/">Common Thread</Link>
        <Link href="/sites/giza/">Giza</Link>
        <Link href="/editorial/">Evidence</Link>
      </nav>
    </header>
  );
}
