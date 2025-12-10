const CACHE_NAME = 'assistente-cache-v1';

const urlsToCache = [
  'https://umberto-f-m-cefala.github.io/voice-assistant/',
  'https://umberto-f-m-cefala.github.io/voice-assistant/index.html',
  'https://umberto-f-m-cefala.github.io/voice-assistant/icon-192x192.png',
  'https://umberto-f-m-cefala.github.io/voice-assistant/icon-512x512.png'
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
