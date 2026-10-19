'use strict';
const CACHE_NAME='elevor360d-britannia-static-v4';
const OFFLINE_FILES=['./','./index.html','./style.css?v=britannia4','./app.js?v=britannia4','./manifest.webmanifest','./icon.svg','./venues.json','./information.json?v=britannia4','./advert-settings.json','./share-qr.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(OFFLINE_FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('elevor360d-britannia-static-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;const u=new URL(e.request.url);if(u.origin!==self.location.origin)return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
