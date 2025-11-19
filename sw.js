const CACHE_NAME = 'assistente-cache-v1';
// Aggiungi qui i file fondamentali dell'app
const urlsToCache = [
  'index.html', // Cachea il file HTML principale
  '/'           // Cachea la radice (spesso reindirizza a index.html)
];

// Evento Install: Scrive i file nella cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        // Aggiungi i file di base dell'app shell alla cache
        return cache.addAll(urlsToCache);
      })
  );
});

// Evento Fetch: Intercetta le richieste
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se la risorsa è in cache, la restituisce (strategia Cache-First)
        if (response) {
          return response;
        }
        
        // Altrimenti, prova a recuperarla dalla rete
        // Questo è importante per cose come l'importazione di nuovi file .json
        return fetch(event.request);
      }
    )
  );
});