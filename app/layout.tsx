import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";


export const metadata: Metadata = {
  title: { default: "Atlas of the Sacred", template: "%s · Atlas of the Sacred" },
  description: "A beautiful, evidence-led atlas helping humanity remember, cooperate, heal and become more conscious through sacred architecture.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><Header/><main>{children}</main><Footer/></body></html>;
}
