const CACHE_NAME = 'snake-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './assets/site.json',
  './assets/favicon.svg' // הוסף כאן את כל קובצי העיצוב והתמונות שלך
];

// התקנת ה-Service Worker ושמירת הקבצים במטמון
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// הפעלת האפליקציה מהמטמון גם כשאין אינטרנט
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
