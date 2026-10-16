import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const HERE = dirname(fileURLToPath(import.meta.url));
export const ROOT = join(HERE, "..");
export const SNAP = "C:\\Users\\koki_\\AppData\\Local\\Cline\\realife-bpo-site\\site";

export const read = (p) => readFileSync(join(SNAP, p), "utf8");
export const out = (p, s) => {
  const f = join(ROOT, p);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, s, "utf8");
  console.log("wrote", p);
};

export function section(html, name) {
  const safe = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp("<!--[\\s]*@" + safe + "[\\s]*-->([\\s\\S]*?)<!--[\\s]*/@" + safe + "[\\s]*-->");
  const m = html.match(re);
  return m ? m[1] : "";
}
export function mainInner(html) {
  const m = html.match(/<main[\s\S]*?>([\s\S]*?)<\/main>/);
  return m ? m[1].trim() : "";
}
export function pageMeta(html) {
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1]?.trim() || "";
  const desc = (html.match(/<meta name="description" content="([\s\S]*?)" \/>/) || [])[1] || "";
  return { title, desc };
}
export const POST_SLUGS = ["what-is-bpo", "lost-inquiries", "ai-and-people", "how-to-start", "beyond-buzzwords", "industry-teams"];
export const LATEST_SLUGS = ["what-is-bpo", "lost-inquiries", "ai-and-people"];
