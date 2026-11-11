const CACHE_PREFIX = "kabkrabue-";
const CACHE = "kabkrabue-v5";

// Support both root-hosted deployments and a static-export basePath.
const BASE_PATH = new URL(".", self.location.href).pathname.replace(/\/$/, "");
const withBasePath = (path) => `${BASE_PATH}${path}` || "/";
const APP_ROOT = withBasePath("/");
const PRIVACY_ROOT = withBasePath("/privacy/");
const APP_SCOPE = new URL(APP_ROOT, self.location.origin).pathname;

const APP_SHELL = [
  APP_ROOT,
  PRIVACY_ROOT,
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
            .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") return;
  if (request.destination === "serviceworker") return;

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) return;
  if (!url.pathname.startsWith(APP_SCOPE)) return;
  if (request.headers.has("range")) return;

  // Never intercept video delivery. Let the browser/CDN handle media and ranges.
  if (isVideoRequest(url)) return;

  // HTML navigation is network-first, with scoped offline fallbacks.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (shouldCacheResponse(response)) {
            const cache = await caches.open(CACHE);
            await cache.put(request, response.clone()).catch(() => undefined);
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE);
          const cached = await cache.match(request);
          if (cached) return cached;

          if (url.pathname === PRIVACY_ROOT) {
            const privacyPage = await cache.match(PRIVACY_ROOT);
            if (privacyPage) return privacyPage;
          }

          return cache.match(APP_ROOT);
        }),
    );
    return;
  }

  // Mutable same-origin assets are stale-while-revalidate: use a cached copy
  // immediately, while refreshing it for the next visit. Keep the worker alive
  // until the background refresh has either completed or failed.
  const cachePromise = caches.open(CACHE);
  const refresh = fetch(request).then(async (response) => {
    if (shouldCacheResponse(response)) {
      const cache = await cachePromise;
      await cache.put(request, response.clone()).catch(() => undefined);
    }
    return response;
  });

  event.waitUntil(refresh.then(() => undefined).catch(() => undefined));
  event.respondWith(
    cachePromise.then(async (cache) => {
      const cached = await cache.match(request);
      return cached || refresh;
    }),
  );
});
