const CACHE = "kabkrabue-v2";
const APP_SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
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

  // HTML navigation: network-first so new Vercel deployments appear
  // immediately, while still providing an offline fallback.
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
            (cached) => cached || caches.match("/"),
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
