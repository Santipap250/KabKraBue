/** @type {import('next').NextConfig} */

// Repository name — used as the base path when deployed to GitHub Pages
// (https://Santipap250.github.io/KabKraBue). If you later attach a custom
// domain or deploy to Vercel/Netlify at the domain root, set
// NEXT_PUBLIC_BASE_PATH="" in your deployment environment to disable it.
const repoName = "KabKraBue";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubPages ? `/${repoName}` : "");

const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
