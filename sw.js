const CACHE_NAME = 'solutech-v2.1';
const ASSETS = [
    './',
    './index.html',
    './servicios.html',
    './nosotros.html',
    './privacidad.html',
    './soporte.html',
    './style.css',
    './solutech.js',
    './data.js',
    './assets/img/ICO.png',
    './assets/img/xavi-alonso.jpg',
    './assets/img/banner.png'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME)
                    .map((key) => caches.delete(key))
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET' || 
        event.request.url.includes('/blog') ||
        event.request.url.includes('googletagmanager')) {
        return;
    }

    const isHTML = event.request.mode === 'navigate' || 
                   (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

    if (isHTML) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request))
        );
    } else {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) return cachedResponse;
                return fetch(event.request).then((networkResponse) => {
                    if (networkResponse.ok) {
                        const copy = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    }
                    return networkResponse;
                });
            })
        );
    }
});
