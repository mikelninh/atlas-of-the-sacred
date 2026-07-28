import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const marker = resolve("app/page.tsx");
const archive = resolve("bootstrap/atlas-v1-source.tar.gz");
const blobUrl = "https://api.github.com/repos/mikelninh/atlas-of-the-sacred/git/blobs/ef59abd72863fd14c968b678c0b0abd8125a5d6e";
const expectedSha256 = "d461a6ce6c89f295743192ce6b340e56828df23984b937c5e7f03c860b71c21a";

if (!existsSync(marker)) {
  const response = await fetch(blobUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "atlas-of-the-sacred-build",
    },
  });

  if (!response.ok) {
    throw new Error(`Could not fetch the pinned production source: ${response.status}`);
  }

  const payload = await response.json();
  const bytes = Buffer.from(String(payload.content).replace(/\s/g, ""), "base64");
  const actualSha256 = createHash("sha256").update(bytes).digest("hex");

  if (actualSha256 !== expectedSha256) {
    throw new Error(`Source integrity check failed: ${actualSha256}`);
  }

  mkdirSync(dirname(archive), { recursive: true });
  mkdirSync(dirname(marker), { recursive: true });
  writeFileSync(archive, bytes);
  execFileSync("tar", ["-xzf", archive, "-C", process.cwd()], { stdio: "inherit" });
}
