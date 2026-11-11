const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const basePath = configuredBasePath.replace(/\/+$/, "");

/** Prefix a local app path without changing external URLs or double-prefixing. */
export function withBasePath(path: string): string {
  if (!path.startsWith("/") || !basePath) return path;
  if (path === basePath || path.startsWith(`${basePath}/`)) return path;
  return `${basePath}${path}`;
}
