import Link from "next/link";
export default function NotFound() {
  return <section className="not-found"><p className="eyebrow">The trail disappears</p><h1>This portal has not been excavated yet.</h1><Link className="button button-primary" href="/">Return to the Atlas</Link></section>;
}
