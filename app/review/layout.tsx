import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/review/" },
  openGraph: { url: "/review/" }
};

export default function ReviewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
