self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open("simpth-pwa-1").then(cache => {
      cache.addAll(assets)
    })
  )
});

self.addEventListener("fetch", fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request)
    })
  )
});