import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const routes = [
  ["/", "What do humans build"],
  ["/journeys/common-thread/", "One humanity"],
  ["/sites/giza/", "A mountain built from systems"],
  ["/sites/gobekli-tepe/", "Göbekli Tepe"],
  ["/dispatches/", "Dispatches from Deep Time"],
  ["/review/", "Help us find where the Atlas is wrong"],
  ["/editorial/", "The editorial operating system"]
];

const errors = [];
for (const [route, expected] of routes) {
  const file = route === "/" ? path.join(root, "index.html") : path.join(root, route, "index.html");
  if (!fs.existsSync(file)) {
    errors.push(`${route} did not generate ${file}`);
    continue;
  }
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes(expected)) errors.push(`${route} is missing identifying text: ${expected}`);
  if (html.includes("This portal has not been excavated yet")) errors.push(`${route} rendered the generic not-found experience`);
}

if (errors.length) {
  console.error(`Static route smoke test failed:\n${errors.map((error) => `- ${error}`).join("\n")}`);
  process.exit(1);
}

console.log(`Verified ${routes.length} canonical routes in the static export.`);
