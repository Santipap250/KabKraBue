const CACHE = "kabkrabue-v3";

// The service worker can live at the site root on Vercel or under a basePath
// on GitHub Pages. Derive the deployed path from the SW URL so every cached
// asset and offline fallback stays inside the correct scope.
const BASE_PATH = new URL(".", self.location.href).pathname.replace(/\/$/, "");
const withBasePath = (path) => `${BASE_PATH}${path}` || "/";
const APP_ROOT = withBasePath("/");

const APP_SHELL = [
  APP_ROOT,
  withBasePath("/manifest.webmanifest"),
  withBasePath("/icons/icon-192.png"),
  withBasePath("/icons/icon-512.png"),
];

const isVideoRequest = (url) =>
  [".mp4", ".webm", ".mov", ".m4v"].some((ext) =>
    url.pathname.toLowerCase().endsWith(ext),
  );

const shouldCacheResponse = (response) =>
  response &&
  response.ok &&
  response.type === "basic" &&
  response.status === 200;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;

  // Never intercept video delivery. Let the browser/Vercel CDN handle
  // MP4/WebM requests and Range requests natively.
  if (isVideoRequest(url)) return;

  // HTML navigation: network-first so new deployments appear immediately,
  // while still providing an offline fallback inside the deployed scope.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (shouldCacheResponse(response)) {
            const copy = response.clone();
            void caches.open(CACHE).then((cache) => cache.put(request, copy));
          }

          return response;
        })
        .catch(() =>
          caches.match(request).then(
            (cached) => cached || caches.match(APP_ROOT),
          ),
        ),
    );

    return;
  }

  // Static same-origin assets: cache-first for speed, with a network
  // fallback that refreshes the cache when a newer asset exists.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request).then((response) => {
        if (shouldCacheResponse(response)) {
          const copy = response.clone();
          void caches.open(CACHE).then((cache) => cache.put(request, copy));
        }

        return response;
      });
    }),
  );
});
