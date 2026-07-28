import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const claimsText = fs.readFileSync(path.join(root, "content/claims.ts"), "utf8");
const reviewsText = fs.readFileSync(path.join(root, "content/reviews.ts"), "utf8");
const sourcesText = fs.readFileSync(path.join(root, "content/sources.ts"), "utf8");

const claimIds = [...claimsText.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]);
const sourceIds = [...sourcesText.matchAll(/^  "([^"]+)": \{/gm)].map((match) => match[1]);
const reviewedClaimIds = new Set([...reviewsText.matchAll(/claimId: "([^"]+)"/g)].map((match) => match[1]));
const publishedCount = [...claimsText.matchAll(/editorialState: "published"/g)].length;
const openMysteries = [...claimsText.matchAll(/status: "open-mystery"/g)].length;
const contested = [...claimsText.matchAll(/status: "contested"/g)].length;

const lines = [
  "# Atlas editorial report",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  `- Claims: ${claimIds.length}`,
  `- Sources: ${sourceIds.length}`,
  `- Published claims: ${publishedCount}`,
  `- Claims with a recorded review: ${reviewedClaimIds.size}`,
  `- Open mysteries: ${openMysteries}`,
  `- Contested claims: ${contested}`,
  "",
  "## Claims awaiting an independent review",
  "",
  ...claimIds.filter((id) => !reviewedClaimIds.has(id)).map((id) => `- ${id}`)
];

const output = path.join(root, "artifacts", "editorial-report.md");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, lines.join("\n") + "\n");
console.log(`Editorial report written to ${output}`);
