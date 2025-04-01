const nombreCache = 'apv-v2';
const archivos = [
    '/',
    'index.html',
    'error.html',
    'css/bootstrap.css',
    'css/styles.css',
    'js/app.js',
    'js/apv.js'
]

// Cuando se instala el Service Worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(nombreCache)
            .then(cache => {
                console.log('Cacheando archivos...');
                return cache.addAll(archivos);
            })
            .catch(error => console.error('❌ Error al cachear archivos:', error))
    );
});


// Activar el Service Worker
self.addEventListener('activate', e => {
    console.log('Service Worker Activado')

    e.waitUntil(
        caches.keys()
            .then(keys => {
                return Promise.all(
                    keys.filter(key => key !== nombreCache) // Filtra los que no son igual al nombreCache osea la ultima version
                        .map(key => caches.delete(key)) // Borra los demas
                )
            })
    )
})

// Evento Fetch para descargar archivos estaticos
self.addEventListener('fetch', e => {
    console.log('Fetch... ', e.request.url);

    e.respondWith(
        caches.match(e.request)
            .then(respuestaCache => {
                // Si el recurso está en caché, lo devuelve; si no, intenta hacer la solicitud a la red
                return respuestaCache || fetch(e.request).catch(() => caches.match('error.html'));
            })
    );
});