import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const root = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const sourceText = fs.readFileSync(path.join(root, "content/sources.ts"), "utf8");
const strict = process.argv.includes("--strict");
const timeoutMs = Number(process.env.SOURCE_HEALTH_TIMEOUT_MS || 12_000);
const sourceBlocks = [...sourceText.matchAll(/^  "([^"]+)": \{([\s\S]*?)(?=^  "[^"]+": \{|^\} satisfies)/gm)];

const sources = sourceBlocks.map((match) => {
  const id = match[1];
  const block = match[2];
  const urlMatch = block.match(/url: "([^"]+)"/);
  return { id, url: urlMatch?.[1] };
}).filter((source) => source.url);

async function check(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let response = await fetch(source.url, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "AtlasOfTheSacred-SourceHealth/1.0" }
    });
    if ([405, 501].includes(response.status)) {
      response = await fetch(source.url, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "user-agent": "AtlasOfTheSacred-SourceHealth/1.0", range: "bytes=0-1024" }
      });
    }
    const status = response.status === 403 || response.status === 429
      ? "blocked"
      : response.status >= 400
        ? "broken"
        : response.redirected
          ? "redirected"
          : "healthy";
    return {
      sourceId: source.id,
      checkedOn: new Date().toISOString(),
      status,
      httpStatus: response.status,
      resolvedUrl: response.url
    };
  } catch (error) {
    const code = error instanceof Error && "cause" in error && error.cause && typeof error.cause === "object" && "code" in error.cause
      ? String(error.cause.code)
      : undefined;
    const status = code === "ENOTFOUND" ? "broken" : "unchecked";
    return {
      sourceId: source.id,
      checkedOn: new Date().toISOString(),
      status,
      note: `${error instanceof Error ? error.message : String(error)}${code ? ` (${code})` : ""}`
    };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
for (let index = 0; index < sources.length; index += 4) {
  results.push(...await Promise.all(sources.slice(index, index + 4).map(check)));
}

const outputDir = path.join(root, "artifacts");
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "source-health.json");
fs.writeFileSync(outputPath, JSON.stringify({ generatedOn: new Date().toISOString(), results }, null, 2) + "\n");

const summary = results.reduce((acc, result) => {
  acc[result.status] = (acc[result.status] || 0) + 1;
  return acc;
}, {});
console.log(`Checked ${results.length} sources: ${Object.entries(summary).map(([key, value]) => `${key}=${value}`).join(", ")}`);
console.log(`Report: ${outputPath}`);

const hardFailures = results.filter((result) => result.status === "broken" && (!result.httpStatus || [404, 410].includes(result.httpStatus)));
if (strict && hardFailures.length) {
  console.error("Hard source failures:\n" + hardFailures.map((failure) => `- ${failure.sourceId}: ${failure.httpStatus || failure.note}`).join("\n"));
  process.exit(1);
}
