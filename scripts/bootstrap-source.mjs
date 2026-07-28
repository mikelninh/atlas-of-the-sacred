import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const marker = resolve("app/page.tsx");
const archive = resolve("bootstrap/atlas-v1-runtime.tar.gz");
const repository = "mikelninh/atlas-of-the-sacred";
const chunks = [
  {
    blob: "9d575aa6a5286ff4b42ac122ab2a944570895ea6",
    sha256: "fd05a737c9ba05661ca24c25271b786dd1e096180c2b5ee54079fca2adf11b37",
  },
  {
    blob: "8c5fb4a4d38625b8bc00bdee96f4526dd27ca1c4",
    sha256: "c5a02c8ae50f567b1b1b788594c5dc9aa32e664de43b53f425781c9c4b95ce40",
  },
  {
    blob: "a054a992a8f1d0e8626a5356de62888ef08ab0c0",
    sha256: "3de66e36e3e67487154ba482d861e4c3559f34750d6a7f93d6408ee1dcec698b",
  },
];
const expectedArchiveSha256 = "c403253ff3f125119c297e538550458fbc0549708e56e46713bf53bc47c2027d";
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

if (!existsSync(marker)) {
  const parts = [];

  for (const part of chunks) {
    const response = await fetch(
      `https://api.github.com/repos/${repository}/git/blobs/${part.blob}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "atlas-of-the-sacred-build",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Could not fetch source chunk ${part.blob}: ${response.status}`);
    }

    const payload = await response.json();
    const bytes = Buffer.from(String(payload.content).replace(/\s/g, ""), "base64");
    const actual = digest(bytes);

    if (actual !== part.sha256) {
      throw new Error(`Source chunk integrity failed for ${part.blob}: ${actual}`);
    }

    parts.push(bytes);
  }

  const runtime = Buffer.concat(parts);
  const actualArchiveSha256 = digest(runtime);

  if (actualArchiveSha256 !== expectedArchiveSha256) {
    throw new Error(`Runtime archive integrity failed: ${actualArchiveSha256}`);
  }

  mkdirSync(dirname(archive), { recursive: true });
  mkdirSync(dirname(marker), { recursive: true });
  writeFileSync(archive, runtime);
  execFileSync("tar", ["-xzf", archive, "-C", process.cwd()], { stdio: "inherit" });
}
