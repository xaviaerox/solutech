const CACHE_NAME = 'solutech-v2.2';
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

// Instalación: Cacheamos los activos estáticos esenciales
self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

// Activación: Limpieza de cachés antiguas
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

// Estrategia de Fetch optimizada para evitar contenido estancado
self.addEventListener('fetch', (event) => {
    // Ignorar peticiones que no sean GET o sean de Google Analytics
    if (event.request.method !== 'GET' || event.request.url.includes('googletagmanager')) {
        return;
    }

    const url = new URL(event.request.url);
    const isHTML = event.request.mode === 'navigate' || 
                   (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));
    
    // 1. ESTRATEGIA NETWORK-FIRST: Para HTML, data.js y solutech.js
    // Queremos que el contenido y la lógica siempre sean lo más nuevo posible.
    if (isHTML || url.pathname.endsWith('data.js') || url.pathname.endsWith('solutech.js')) {
        event.respondWith(
            fetch(event.request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                    return response;
                })
                .catch(() => caches.match(event.request)) // Si falla el red, usamos caché
        );
        return;
    }

    // 2. ESTRATEGIA STALE-WHILE-REVALIDATE: Para el resto de activos (CSS, Imágenes)
    // Mostramos rápido lo que hay en caché, pero descargamos la versión nueva en background.
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const networkFetch = fetch(event.request).then((networkResponse) => {
                if (networkResponse.ok) {
                    const copy = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
                }
                return networkResponse;
            });

            // Retornamos la caché si existe, sino esperamos a la red
            return cachedResponse || networkFetch;
        })
    );
});
