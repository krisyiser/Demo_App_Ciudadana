// Service Worker para Papantla Contigo
const CACHE_NAME = 'papantla-contigo-v1';
const STATIC_CACHE_NAME = 'papantla-static-v1';

// Archivos críticos para funcionar offline
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Archivos que se cachean dinámicamente
const RUNTIME_CACHE = [
  '/reportar',
  '/mi',
  '/citas',
  '/servicios',
  '/noticias',
  '/alertas',
  '/clima',
  '/mapa',
  '/accesibilidad'
];

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('SW: Instalando service worker');

  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('SW: Cache abierto');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('SW: Activando service worker');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('SW: Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo manejar requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // Strategy: Cache First para páginas principales
  if (request.method === 'GET' && (
    STATIC_ASSETS.includes(url.pathname) ||
    RUNTIME_CACHE.includes(url.pathname)
  )) {
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            // Actualizar cache en background
            fetch(request)
              .then((response) => {
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(CACHE_NAME)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
              })
              .catch(() => {
                // Error de red, usar cache
              });

            return cachedResponse;
          }

          // No está en cache, fetch y cachear
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Retornar página offline si está disponible
              if (url.pathname.startsWith('/')) {
                return caches.match('/');
              }
            });
        })
    );
    return;
  }

  // Strategy: Network First para API calls y datos dinámicos
  if (request.method === 'GET' && url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // Usar cache como fallback
          return caches.match(request);
        })
    );
    return;
  }

  // Para otros requests, usar la estrategia normal del navegador
});

// Manejar mensajes del cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }

  if (event.data && event.data.type === 'GET_CACHE_STATUS') {
    caches.keys().then((cacheNames) => {
      event.ports[0].postMessage({
        type: 'CACHE_STATUS',
        caches: cacheNames,
        isOfflineReady: cacheNames.length > 0
      });
    });
  }
});

// Sincronización en background (para cuando se recupere la conexión)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('SW: Sincronización en background');
    event.waitUntil(syncPendingReports());
  }
});

// Función para sincronizar reportes pendientes
async function syncPendingReports() {
  try {
    // En una implementación real, aquí se enviarían los reportes pendientes
    console.log('SW: Sincronizando reportes pendientes...');

    // Simular envío de reportes guardados en localStorage
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'SYNC_REPORTS',
        message: 'Sincronizando reportes pendientes...'
      });
    });
  } catch (error) {
    console.error('SW: Error en sincronización:', error);
  }
}

// Notificaciones push (para futuras implementaciones)
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icon-192x192.png',
    badge: '/icon-96x96.png',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/',
      type: data.type || 'general'
    },
    actions: [
      {
        action: 'open',
        title: 'Abrir',
        icon: '/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  const urlToOpen = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Si ya hay una ventana abierta, enfocarla
        for (let client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }

        // Si no hay ventana abierta, abrir una nueva
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

console.log('SW: Service Worker de Papantla Contigo cargado');
