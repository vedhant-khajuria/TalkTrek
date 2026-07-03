const CACHE_NAME = "talktrek-v14";
const APP_SHELL = [
  "./",
  "./index.html",
  "./dashboard.html",
  "./onboarding.html",
  "./languages.html",
  "./learning-path.html",
  "./lesson.html",
  "./quiz.html",
  "./flashcards.html",
  "./ai-tutor.html",
  "./pronunciation.html",
  "./listening.html",
  "./reading.html",
  "./writing.html",
  "./speaking.html",
  "./profile.html",
  "./settings.html",
  "./ai-settings.html",
  "./certificates.html",
  "./about.html",
  "./contact.html",
  "./privacy.html",
  "./terms.html",
  "./css/styles.css",
  "./js/app.js",
  "./assets/favicon.jpeg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
