const CACHE_NAME = 'assistente-cache-v1';

const urlsToCache = [
  '/voice-assistant/',
  '/voice-assistant/index.html',
  '/voice-assistant/icon-192x192.png',
  '/voice-assistant/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
