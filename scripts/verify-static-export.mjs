#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const out = path.join(root, "out");
const publicImages = path.join(root, "public", "images");
const manifestPath = path.join(root, "src", "data", "responsive-image-manifest.json");
const siteSource = fs.readFileSync(path.join(root, "src", "data", "site.ts"), "utf8");
const siteUrlMatch = siteSource.match(/\burl:\s*"(https?:\/\/[^\"]+)"/);
if (!siteUrlMatch) throw new Error("Could not read the configured public site URL from src/data/site.ts");
const siteUrl = siteUrlMatch[1];
const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_PAGES === "true" ? "/KabKraBue" : "");
const basePath = configuredBasePath ? `/${configuredBasePath.replace(/^\/+|\/+$/g, "")}` : "";
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function readOutput(relativePath) {
  const filePath = path.join(out, relativePath);
  if (!fs.existsSync(filePath)) throw new Error(`Missing static export file: out/${relativePath}`);
  return fs.readFileSync(filePath, "utf8");
}

function parseAttributes(tag) {
  const attributes = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = (match[2] ?? match[3] ?? "").replaceAll("&amp;", "&");
  }
  return attributes;
}

function findLink(html, relation) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if (attrs.rel?.toLowerCase().split(/\s+/).includes(relation)) return attrs.href;
  }
  return undefined;
}

function findMeta(html, key, value) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attrs = parseAttributes(match[0]);
    if (attrs[key]?.toLowerCase() === value.toLowerCase()) return attrs.content;
  }
  return undefined;
}

function localFileForUrl(value, attribute) {
  if (!value || value.startsWith("#") || /^(?:data:|blob:|mailto:|tel:|javascript:)/i.test(value)) return null;
  const parsed = new URL(value, "https://local.invalid");
  if (parsed.origin !== "https://local.invalid") return null;

  let pathname = decodeURIComponent(parsed.pathname);
  if (basePath && (pathname === basePath || pathname.startsWith(`${basePath}/`))) {
    pathname = pathname.slice(basePath.length) || "/";
  } else if (basePath && pathname.startsWith("/") && ["src", "srcset", "poster", "href"].includes(attribute)) {
    failures.push(`URL does not include expected basePath ${basePath}: ${value}`);
  }

  const relative = pathname.replace(/^\/+/, "");
  const candidates = pathname === "/"
    ? [path.join(out, "index.html")]
    : [
        path.join(out, relative),
        path.join(out, relative, "index.html"),
        path.join(out, `${path.join(out, relative)}.html`),
      ];
  const resolved = candidates.find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!resolved) failures.push(`Local ${attribute} target is absent from static export: ${value}`);
  return resolved ?? null;
}

function checkHtmlLocalTargets(html, label) {
  for (const match of html.matchAll(/\b(srcset|src|href|poster)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi)) {
    const attribute = match[1].toLowerCase();
    const rawValue = (match[2] ?? match[3] ?? "").replaceAll("&amp;", "&");
    const values = attribute === "srcset"
      ? rawValue.split(",").map((candidate) => candidate.trim().split(/\s+/)[0])
      : [rawValue];
    for (const value of values) localFileForUrl(value, attribute);
  }
  if (html.includes("srcset=") && !html.includes("/images/responsive/")) {
    failures.push(`${label} has srcset attributes but no generated responsive image source`);
  }
}

const requiredFiles = [
  "index.html",
  "privacy/index.html",
  "404.html",
  "manifest.webmanifest",
  "robots.txt",
  "sitemap.xml",
  "sw.js",
];
for (const relativePath of requiredFiles) readOutput(relativePath);

const homeHtml = readOutput("index.html");
const privacyHtml = readOutput("privacy/index.html");
const notFoundHtml = readOutput("404.html");
const expectedHome = new URL("/", siteUrl).href;
const expectedPrivacy = new URL("/privacy/", siteUrl).href;

expect(findLink(homeHtml, "canonical") === expectedHome, `Home canonical must be ${expectedHome}`);
expect(findMeta(homeHtml, "property", "og:url") === expectedHome, `Home og:url must be ${expectedHome}`);
expect(findLink(privacyHtml, "canonical") === expectedPrivacy, `Privacy canonical must be ${expectedPrivacy}`);
expect(findMeta(privacyHtml, "property", "og:url") === expectedPrivacy, `Privacy og:url must be ${expectedPrivacy}`);
expect(Boolean(findMeta(notFoundHtml, "name", "robots")?.toLowerCase().includes("noindex")), "404 must include robots noindex metadata");
expect(!findLink(notFoundHtml, "canonical"), "404 must not inherit a homepage canonical");
expect(!findMeta(notFoundHtml, "property", "og:url"), "404 must not inherit a homepage og:url");
expect(homeHtml.includes("schema.org"), "Home must contain the Place JSON-LD structured data");
expect(!privacyHtml.includes("schema.org"), "Privacy must not inherit Place JSON-LD structured data");
expect(!notFoundHtml.includes("schema.org"), "404 must not inherit Place JSON-LD structured data");

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
expect(!Object.hasOwn(manifest, "/images/og-cover.jpg"), "Open Graph cover must remain an original-only social asset, not a UI responsive candidate");
let checkedCandidates = 0;
for (const [source, entry] of Object.entries(manifest)) {
  expect(fs.existsSync(path.join(publicImages, source.replace(/^\/images\//, ""))), `Original image is missing: ${source}`);
  for (const candidate of entry.sources ?? []) {
    expect(candidate.width <= 768, `Responsive candidate exceeds the mobile/tablet delivery ceiling: ${candidate.src} (${candidate.width}w)`);
    const candidatePath = path.join(publicImages, candidate.src.replace(/^\/images\//, ""));
    expect(fs.existsSync(candidatePath), `Responsive image candidate is missing: ${candidate.src}`);
    const outputPath = localFileForUrl(`${basePath}${candidate.src}`, "srcset");
    expect(Boolean(outputPath), `Responsive image candidate did not resolve in export: ${candidate.src}`);
    checkedCandidates += 1;
  }
}

checkHtmlLocalTargets(homeHtml, "Home");
checkHtmlLocalTargets(privacyHtml, "Privacy");
checkHtmlLocalTargets(notFoundHtml, "404");
expect(homeHtml.includes('media="(max-width: 767px)"'), "Responsive WebP sources must be scoped to mobile so tablet/desktop keep the original full-resolution source");

if (failures.length) {
  console.error(`Static export verification failed (${failures.length} issue(s)):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Static export verified (${basePath || "root"}): ${requiredFiles.length} route/PWA files, home/privacy/404 metadata, ${checkedCandidates} responsive candidates.`);
