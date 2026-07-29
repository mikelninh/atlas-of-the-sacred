const baseUrl = (process.env.ATLAS_BASE_URL ?? process.argv[2] ?? "").replace(/\/$/, "");
if (!baseUrl) {
  console.error("Set ATLAS_BASE_URL or pass the deployment URL as the first argument.");
  process.exit(2);
}

const routes = [
  ["/", ["What do humans build", "Atlas of the Sacred"]],
  ["/journeys/common-thread/", ["The Common Thread", "7 thresholds"]],
  ["/sites/giza/", ["A mountain built from systems", "Giza"]],
  ["/sites/gobekli-tepe/", ["Göbekli Tepe", "Meaning gathers us"]],
  ["/dispatches/", ["Dispatches from Deep Time", "What changed"]],
  ["/review/", ["Help us find where the Atlas is wrong", "0 external specialist reviews"]],
  ["/editorial/", ["The editorial operating system", "Traceable claims"]]
];

const failures = [];
for (const [route, fingerprints] of routes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: "follow" });
  const html = await response.text();
  if (!response.ok) failures.push(`${route} returned HTTP ${response.status}`);
  for (const fingerprint of fingerprints) {
    if (!html.includes(fingerprint)) failures.push(`${route} is missing identifying text: ${fingerprint}`);
  }
  if (!html.includes("<html") || !html.includes("<title>")) failures.push(`${route} did not return a complete HTML document`);
  if (!html.includes(`rel="canonical" href="${baseUrl}${route}"`)) failures.push(`${route} canonical URL does not match the deployed origin`);

  const assetUrls = [...html.matchAll(/(?:src|href)="([^"]+\.(?:css|js))"/g)]
    .map((match) => new URL(match[1], response.url).toString())
    .slice(0, 3);
  if (assetUrls.length === 0) failures.push(`${route} did not reference any CSS or JavaScript assets`);
  for (const assetUrl of assetUrls) {
    const asset = await fetch(assetUrl, { method: "HEAD", redirect: "follow" });
    if (!asset.ok) failures.push(`${route} references unavailable asset ${assetUrl} (${asset.status})`);
  }
}

if (failures.length) {
  console.error(`Deployment smoke test failed:\n${[...new Set(failures)].map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} canonical routes and their metadata at ${baseUrl}.`);
