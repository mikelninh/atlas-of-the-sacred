import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/editorial/" },
  openGraph: { url: "/editorial/" }
};

export default function EditorialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
