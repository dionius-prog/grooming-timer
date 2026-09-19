self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => self.clients.claim());
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.open('groom-v1').then(c =>
      c.match(e.request).then(r => r || fetch(e.request).then(resp => {
        c.put(e.request, resp.clone());
        return resp;
      }))
    )
  );
});