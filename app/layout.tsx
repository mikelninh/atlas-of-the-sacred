import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlas-of-the-sacred.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Atlas of the Sacred", template: "%s · Atlas of the Sacred" },
  description: "A beautiful, evidence-led atlas helping humanity remember, cooperate, heal and become more conscious through sacred architecture.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Atlas of the Sacred",
    title: "Atlas of the Sacred",
    description: "What humanity built to meet the infinite—beautiful enough to enter, honest enough to trust.",
    url: "/"
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlas of the Sacred",
    description: "An immersive, evidence-led exploration of sacred architecture and humanity’s search for meaning."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}
