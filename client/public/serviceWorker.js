const CACHE_NAME = 'nexusplay-v2.0';
const STATIC_CACHE = 'nexusplay-static-v2.0';
const DYNAMIC_CACHE = 'nexusplay-dynamic-v2.0';
const API_CACHE = 'nexusplay-api-v2.0';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/placeholder.svg',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css'
];

// API endpoints to cache
const API_ENDPOINTS = [
  '/api/system-info',
  '/api/optimizations',
  '/api/license-check'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(API_CACHE).then(cache => cache.addAll(API_ENDPOINTS.map(url => new Request(url))))
    ]).then(() => {
      console.log('[SW] Static assets cached');
      self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE && 
              cacheName !== API_CACHE) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[SW] Cache cleanup complete');
      self.clients.claim();
    })
  );
});

// Fetch event - advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests with appropriate strategies
  if (request.method === 'GET') {
    // API requests - Network First with fallback
    if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirstStrategy(request, API_CACHE));
    }
    // Static assets - Cache First
    else if (STATIC_ASSETS.some(asset => url.pathname.endsWith(asset.split('/').pop()))) {
      event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
    }
    // Navigation requests - Network First with offline fallback
    else if (request.mode === 'navigate') {
      event.respondWith(navigationStrategy(request));
    }
    // Other resources - Stale While Revalidate
    else {
      event.respondWith(staleWhileRevalidateStrategy(request, DYNAMIC_CACHE));
    }
  }
});

// Caching strategies
async function networkFirstStrategy(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response(JSON.stringify({ error: 'Offline' }), {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function cacheFirstStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Failed to fetch:', request.url);
    return new Response('Resource not available offline', { status: 503 });
  }
}

async function staleWhileRevalidateStrategy(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

async function navigationStrategy(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.log('[SW] Navigation offline, serving app shell');
    return caches.match('/offline.html') || caches.match('/index.html');
  }
}

// Background sync for optimization tasks
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
  
  if (event.tag === 'optimize-system') {
    event.waitUntil(performOptimization());
  }
});

async function performOptimization() {
  try {
    // Perform background optimization tasks
    console.log('[SW] Performing background optimization...');
    // This would typically sync with server or perform local optimizations
  } catch (error) {
    console.error('[SW] Background optimization failed:', error);
  }
}

// Push notifications for optimization updates
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'NexusPlay optimization complete!',
    icon: '/placeholder.svg',
    badge: '/placeholder.svg',
    tag: 'nexusplay-notification',
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Results' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('NexusPlay', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/optimizer')
    );
  }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});