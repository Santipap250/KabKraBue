const CACHE_PREFIX = "kabkrabue-";
const CACHE = "kabkrabue-v7";
const DYNAMIC_CACHE = `${CACHE}-dynamic`;
const MAX_DYNAMIC_ENTRIES = 100;

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
  withBasePath("/brand/kabkrabue-app-icon.svg"),
  withBasePath("/brand/kabkrabue-celestial-mark.svg"),
  withBasePath("/favicon/kabkrabue-celestial.svg"),
  withBasePath("/icons/icon-180.png"),
  withBasePath("/icons/icon-192.png"),
  withBasePath("/icons/icon-512.png"),
  withBasePath("/icons/icon-192-maskable.png"),
  withBasePath("/icons/icon-512-maskable.png"),
];
const APP_SHELL_URLS = new Set(
  APP_SHELL.map((path) => new URL(path, self.location.origin).href),
);

// Cache the route-specific Next bundles required to hydrate the offline shell.
async function precacheRouteBundles(cache) {
  const bundleUrls = new Set();
  for (const route of [APP_ROOT, PRIVACY_ROOT]) {
    const page = await cache.match(route);
    if (!page) continue;
    const html = await page.text();
    for (const match of html.matchAll(/(?:src|href)=["']([^"']+\.(?:js|css|woff2?)(?:\?[^"']*)?)["']/gi)) {
      try {
        const asset = new URL(match[1], self.location.origin);
        if (asset.origin === self.location.origin && asset.pathname.startsWith(APP_SCOPE)) {
          bundleUrls.add(asset.href);
        }
      } catch {
        // Ignore malformed or non-local document references.
      }
    }
  }

  await Promise.all([...bundleUrls].map(async (url) => {
    try {
      const response = await fetch(url, { cache: "reload" });
      if (shouldCacheResponse(response)) await cache.put(url, response);
    } catch {
      // The required HTML/icons remain cached even if a non-critical bundle is unavailable.
    }
  }));
}

const isVideoRequest = (url) =>
  [".mp4", ".webm", ".mov", ".m4v"].some((ext) =>
    url.pathname.toLowerCase().endsWith(ext),
  );

const shouldCacheResponse = (response) =>
  response &&
  response.ok &&
  response.type === "basic" &&
  response.status === 200;

async function cacheDynamicResponse(cache, request, response) {
  await cache.put(request, response);
  const requests = await cache.keys();
  const overflow = requests.length - MAX_DYNAMIC_ENTRIES;
  if (overflow <= 0) return;

  // This cache contains only expendable runtime entries; the app shell is kept
  // in a separate cache and can never be evicted by this bound.
  await Promise.all(requests.slice(0, overflow).map((entry) => cache.delete(entry)));
}

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(async (cache) => {
        await cache.addAll(APP_SHELL);
        await precacheRouteBundles(cache);
      })
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
            .filter((key) =>
              key.startsWith(CACHE_PREFIX) && key !== CACHE && key !== DYNAMIC_CACHE,
            )
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

  // HTML navigation is network-first, with app-shell and bounded offline fallbacks.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (shouldCacheResponse(response) && !APP_SHELL_URLS.has(url.href)) {
            const cache = await caches.open(DYNAMIC_CACHE);
            await cacheDynamicResponse(cache, request, response.clone()).catch(() => undefined);
          }
          return response;
        })
        .catch(async () => {
          const dynamicCache = await caches.open(DYNAMIC_CACHE);
          const cached = await dynamicCache.match(request);
          if (cached) return cached;

          const shellCache = await caches.open(CACHE);
          if (url.pathname === PRIVACY_ROOT) {
            const privacyPage = await shellCache.match(PRIVACY_ROOT);
            if (privacyPage) return privacyPage;
          }

          return shellCache.match(APP_ROOT);
        }),
    );
    return;
  }

  // Mutable same-origin assets are stale-while-revalidate. Dynamic entries are
  // capped separately so cache growth cannot evict the offline app shell.
  const cachePromise = caches.open(DYNAMIC_CACHE);
  const shellCachePromise = caches.open(CACHE);
  const refresh = fetch(request).then(async (response) => {
    if (shouldCacheResponse(response) && !APP_SHELL_URLS.has(url.href)) {
      const shellCache = await shellCachePromise;
      if (!(await shellCache.match(request))) {
        const cache = await cachePromise;
        await cacheDynamicResponse(cache, request, response.clone()).catch(() => undefined);
      }
    }
    return response;
  });

  event.waitUntil(refresh.then(() => undefined).catch(() => undefined));
  event.respondWith(
    Promise.all([cachePromise, shellCachePromise]).then(async ([cache, shellCache]) => {
      const cached = await cache.match(request) || await shellCache.match(request);
      return cached || refresh;
    }),
  );
});
