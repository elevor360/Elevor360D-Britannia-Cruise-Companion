'use strict';
const CACHE_NAME = 'elevor360d-britannia-static-v6-ads';
const PREFIX = 'elevor360d-britannia-static-';
const OFFLINE_FILES = ['./','./index.html','./style.css?v=britannia6ads','./app.js?v=britannia6ads','./manifest.webmanifest','./icon.svg','./venues.json','./information.json?v=britannia6ads','./advert-settings.json','./share-qr.png','./advertising.js?v=britannia6ads','./ad-config.json','./advertising/adverts.json','./advertising/images/elevor360d-promo.jpg'];
self.addEventListener('install',event => event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(OFFLINE_FILES)).then(() => self.skipWaiting())));
self.addEventListener('activate',event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith(PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch',event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin || !url.pathname.startsWith(new URL('./',self.registration.scope).pathname)) return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request).then(response => response || (event.request.mode === 'navigate' ? caches.match('./index.html') : undefined))));
});
