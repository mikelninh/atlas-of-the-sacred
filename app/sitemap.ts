import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://atlas-of-the-sacred.vercel.app").replace(/\/$/, "");

const routes = [
  "",
  "/journeys/common-thread",
  "/sites/giza",
  "/sites/gobekli-tepe",
  "/sites/stonehenge",
  "/sites/newgrange",
  "/sites/hal-saflieni",
  "/sites/angkor",
  "/sites/borobudur",
  "/dispatches",
  "/dispatches/ahramat-river-branch",
  "/dispatches/north-face-corridor",
  "/dispatches/big-void-muon-discovery",
  "/review",
  "/editorial"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-29T00:00:00Z");
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency: route.startsWith("/dispatches") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/journeys/common-thread" || route === "/sites/giza" ? 0.9 : 0.7
  }));
}
