import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const claimsText = fs.readFileSync(path.join(root, "content/claims.ts"), "utf8");
const sourcesText = fs.readFileSync(path.join(root, "content/sources.ts"), "utf8");
const reviewsText = fs.readFileSync(path.join(root, "content/reviews.ts"), "utf8");
const dispatchesText = fs.readFileSync(path.join(root, "content/dispatches.ts"), "utf8");

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if ([".git", "node_modules", ".next", "out"].includes(entry.name)) return [];
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const projectText = walk(root)
  .filter((file) => /\.(ts|tsx)$/.test(file))
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

const claimIds = [...claimsText.matchAll(/^  "([^"]+)": \{/gm)].map((m) => m[1]);
const sourceIds = [...sourcesText.matchAll(/^  "([^"]+)": \{/gm)].map((m) => m[1]);
const dispatchIds = [...dispatchesText.matchAll(/^  "([^"]+)": \{/gm)].map((m) => m[1]);
const referencedSources = [...claimsText.matchAll(/sourceIds: \[([^\]]+)\]/g)]
  .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
const referencedClaims = [...projectText.matchAll(/"([a-z0-9-]+)"/g)]
  .map((m) => m[1])
  .filter((id) => claimIds.includes(id));
const dispatchClaimRefs = [...dispatchesText.matchAll(/claimIds: \[([^\]]+)\]/g)]
  .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
const dispatchSourceRefs = [...dispatchesText.matchAll(/sourceIds: \[([^\]]+)\]/g)]
  .flatMap((m) => [...m[1].matchAll(/"([^"]+)"/g)].map((x) => x[1]));
const reviewBlocks = [...reviewsText.matchAll(/\{\n\s+id: "review-[\s\S]*?\n\s+\}/g)].map((match) => match[0]);

const errors = [];
for (const id of sourceIds) {
  const start = sourcesText.indexOf(`  "${id}": {`);
  const next = sourcesText.indexOf("\n  \"", start + 5);
  const block = sourcesText.slice(start, next === -1 ? undefined : next);
  for (const field of ["url:", "kind:", "accessedOn:", "note:"]) {
    if (!block.includes(field)) errors.push(`${id} is missing ${field}`);
  }
}
for (const id of referencedSources) if (!sourceIds.includes(id)) errors.push(`Unknown source reference: ${id}`);
for (const id of referencedClaims) if (!claimIds.includes(id)) errors.push(`Unknown claim reference: ${id}`);
for (const id of claimIds) {
  const start = claimsText.indexOf(`  "${id}": {`);
  const next = claimsText.indexOf("\n  \"", start + 5);
  const block = claimsText.slice(start, next === -1 ? undefined : next);
  for (const field of ["statement:", "status:", "sourceIds:", "reviewedOn:", "editorialState:", "version:", "owner:", "interpretation:", "doesNotProve:"]) {
    if (!block.includes(field)) errors.push(`${id} is missing ${field}`);
  }
  const sourceMatch = block.match(/sourceIds: \[([^\]]+)\]/);
  if (!sourceMatch || !sourceMatch[1].includes('"')) errors.push(`${id} has no source`);
}

const reviewedClaimIds = [...reviewsText.matchAll(/claimId: "([^"]+)"/g)].map((m) => m[1]);
for (const id of reviewedClaimIds) if (!claimIds.includes(id)) errors.push(`Review references unknown claim: ${id}`);
for (const block of reviewBlocks) {
  const reviewId = block.match(/id: "([^"]+)"/)?.[1] ?? "unknown-review";
  for (const field of ["reviewKind:", "reviewerDiscipline:", "conflictStatement:", "decision:", "evidenceAssessment:", "notes:", "requestedChanges:"]) {
    if (!block.includes(field)) errors.push(`${reviewId} is missing ${field}`);
  }
  if (block.includes('reviewKind: "external-specialist"') && block.includes("Atlas internal editorial review")) {
    errors.push(`${reviewId} labels an internal check as external specialist review`);
  }
}
for (const id of claimIds) {
  const start = claimsText.indexOf(`  "${id}": {`);
  const next = claimsText.indexOf("\n  \"", start + 5);
  const block = claimsText.slice(start, next === -1 ? undefined : next);
  if (block.includes('editorialState: "published"') && !block.includes("doesNotProve:")) {
    errors.push(`${id} is published without explicit limits`);
  }
}

for (const id of dispatchClaimRefs) if (!claimIds.includes(id)) errors.push(`Dispatch references unknown claim: ${id}`);
for (const id of dispatchSourceRefs) if (!sourceIds.includes(id)) errors.push(`Dispatch references unknown source: ${id}`);
for (const id of dispatchIds) {
  const start = dispatchesText.indexOf(`  "${id}": {`);
  const next = dispatchesText.indexOf("\n  \"", start + 5);
  const block = dispatchesText.slice(start, next === -1 ? undefined : next);
  for (const field of ["slug:", "sourceYear:", "atlasPublishedOn:", "evidenceStatus:", "editorialState:", "claimIds:", "sourceIds:", "whatChanged:", "whyItMatters:", "evidenceSupports:", "headlinesOverreach:", "openQuestion:"]) {
    if (!block.includes(field)) errors.push(`${id} dispatch is missing ${field}`);
  }
  if (!block.includes('editorialState: "published"')) errors.push(`${id} dispatch is not in a publishable state`);
}

if (errors.length) {
  console.error("Content validation failed:\n" + [...new Set(errors)].map((e) => `- ${e}`).join("\n"));
  process.exit(1);
}
console.log(`Validated ${claimIds.length} claims, ${sourceIds.length} sources, ${reviewBlocks.length} reviews, ${dispatchIds.length} dispatches, and ${new Set(referencedClaims).size} unique claim references across the project.`);
