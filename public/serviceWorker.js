
const CACHE_NAME = 'nexusplay-cache-v1';
const urlsToCache = ['/', '/index.html', '/icon-192.png', '/icon-512.png', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((response) => response || fetch('/offline.html'))
    )
  );
});
