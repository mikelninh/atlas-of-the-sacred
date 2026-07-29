const baseUrl = (process.env.ATLAS_BASE_URL ?? process.argv[2] ?? "").replace(/\/$/, "");
if (!baseUrl) {
  console.error("Set ATLAS_BASE_URL or pass the deployment URL as the first argument.");
  process.exit(2);
}

const routes = [
  ["/", "What do humans build"],
  ["/journeys/common-thread/", "One humanity"],
  ["/sites/giza/", "A mountain built from systems"],
  ["/sites/gobekli-tepe/", "Göbekli Tepe"],
  ["/dispatches/", "Dispatches from Deep Time"],
  ["/review/", "Help us find where the Atlas is wrong"],
  ["/editorial/", "The editorial operating system"]
];

const failures = [];
for (const [route, expected] of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
  const html = await response.text();
  if (!response.ok) failures.push(`${route} returned HTTP ${response.status}`);
  if (!html.includes(expected)) failures.push(`${route} is missing identifying text: ${expected}`);
  if (html.includes("This portal has not been excavated yet")) failures.push(`${route} rendered the generic not-found experience`);

  const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+\.(?:css|js))"/g)]
    .map((match) => new URL(match[1], response.url).toString())
    .slice(0, 3);
  for (const assetUrl of assetUrls) {
    const asset = await fetch(assetUrl, { method: "HEAD", redirect: "follow" });
    if (!asset.ok) failures.push(`${route} references unavailable asset ${assetUrl} (${asset.status})`);
  }
}

if (failures.length) {
  console.error(`Deployment smoke test failed:\n${[...new Set(failures)].map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} canonical routes at ${baseUrl}.`);
