importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  apiKey: "AIzaSyD9q4V2ZgzXBb6WGWWHjUyLWOXvNwTf2-Q",
  authDomain: "flutter-ai-playground-1de05.firebaseapp.com",
  databaseURL: "https://flutter-ai-playground-1de05-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "flutter-ai-playground-1de05",
  storageBucket: "flutter-ai-playground-1de05.firebasestorage.app",
  messagingSenderId: "103027477575",
  appId: "1:103027477575:android:7e29273f20d24685e67562"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification?.title || 'Update Signal VM';
  const notificationOptions = {
    body: payload.notification?.body || 'Sinyal baru atau informasi baru dari Venta Markets!',
    icon: 'https://cdn.phototourl.com/free/2026-06-17-699c7b18-fd36-4ca3-b1f5-bb2cbee82422.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Simple Service Worker for Venta Markets PWA installation
const CACHE_NAME = 'venta-markets-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {
        console.log('Pre-caching assets skipped/failed');
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});
