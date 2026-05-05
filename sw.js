const CACHE_NAME = 'gaple-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
  // Jika kamu punya gambar icon, tambahkan di sini:
  './icon.png',
  './icon-512.png'
];

// Saat aplikasi pertama kali dijalankan, simpan file ke dalam memori (Offline)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi dibuka lagi, ambil dari memori agar lebih cepat dan bisa offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
