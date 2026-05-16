const CACHE_NAME = "mathe-spiel-v2";

const FILES = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json",
    "./icon.png",
];

self.addEventListener("install", (event) => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );
});

self.addEventListener("fetch", (event) => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});