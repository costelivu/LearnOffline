const CACHE = 'algopath-v1-20261015';
const ASSETS = ['./', './index.html', './styles.css', './app.js', './lessons.json', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(Promise.all([caches.keys().then(keys => Promise.all(keys.filter(k=>k !== CACHE).map(k=>caches.delete(k)))), self.clients.claim()])));
self.addEventListener('fetch', e => { if (e.request.method !== 'GET' || new URL(e.request.url).origin !== self.location.origin) return; e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request))); });
