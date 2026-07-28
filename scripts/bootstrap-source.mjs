import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";

const archive = resolve("bootstrap/atlas-v1-source.tar.gz");
const marker = resolve("app/page.tsx");

if (!existsSync(marker)) {
  if (!existsSync(archive)) throw new Error(`Missing production source archive: ${archive}`);
  mkdirSync(dirname(marker), { recursive: true });
  execFileSync("tar", ["-xzf", archive, "-C", process.cwd()], { stdio: "inherit" });
}
