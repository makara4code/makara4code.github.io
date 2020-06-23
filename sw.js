const cacheName = 'cache-v3';
const resourcesToPrecache = [
  'index.html',
  '/assets/img/bg-masthead.jpg',
  '/assets/img/favicon.ico',
  '/assets/img/portfolio/fullsize/1.jpg',
  '/assets/img/portfolio/fullsize/2.jpg',
  'assets/img/portfolio/fullsize/3.jpg',
  'assets/img/portfolio/fullsize/4.jpg',
  'assets/img/portfolio/fullsize/5.jpg',
  'assets/img/portfolio/fullsize/6.jpg',
  'assets/img/portfolio/thumbnails/1.jpg',
  'assets/img/portfolio/thumbnails/2.jpg',
  'assets/img/portfolio/thumbnails/3.jpg',
  'assets/img/portfolio/thumbnails/4.jpg',
  'assets/img/portfolio/thumbnails/5.jpg',
  'assets/img/portfolio/thumbnails/6.jpg',
  'css/styles.css',
];

//Call Install Event
self.addEventListener('install', (event) => {
  console.log('Service worker installed!');
  event.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker:Caching Files');
        cache.addAll(resourcesToPrecache);
      })
      .then(() => self.skipWaiting())
  );
});

//Call Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log('Service Worker:Clearing old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

//Fetch data from cache
self.addEventListener('fetch', (event) => {
  console.log('Service Worker:Fetch');
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
