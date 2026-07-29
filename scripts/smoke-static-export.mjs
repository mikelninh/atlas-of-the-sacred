import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const routes = [
  ["/", ["What do humans build", "Atlas of the Sacred"]],
  ["/journeys/common-thread/", ["The Common Thread", "7 thresholds"]],
  ["/sites/giza/", ["A mountain built from systems", "Giza"]],
  ["/sites/gobekli-tepe/", ["Göbekli Tepe", "Meaning gathers us"]],
  ["/dispatches/", ["Dispatches from Deep Time", "What changed"]],
  ["/review/", ["Help us find where the Atlas is wrong", "0 external specialist reviews"]],
  ["/editorial/", ["The editorial operating system", "Traceable claims"]]
];

const errors = [];
for (const [route, fingerprints] of routes) {
  const file = route === "/" ? path.join(root, "index.html") : path.join(root, route, "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`${route} did not generate ${file}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  for (const fingerprint of fingerprints) {
    if (!html.includes(fingerprint)) errors.push(`${route} is missing identifying text: ${fingerprint}`);
  }
  if (!html.includes("<html") || !html.includes("<title>")) errors.push(`${route} did not generate a complete HTML document`);
}

if (errors.length) {
  console.error(`Static route smoke test failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} canonical routes in the static export.`);
