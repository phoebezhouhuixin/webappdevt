let cacheName = 'wad-day-1';
let filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js',
  '/testimg.jpg',
  '/testgif.gif'
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.

*/
self.addEventListener('install', function(e){
  console.log("on install")
  e.waitUntil(
    caches.open(cacheName).then(function(cache){
      console.log("Adding files to cache")
      return cache.addAll(filesToCache)
    })
  )
})

/*
If offline or if the file exists in the cache, then it will fetch the files from cache
*/
self.addEventListener('fetch', function(e){
  e.respondWith(
    caches.match(e.request).then(function(response){
      return response || fetch (e.request)
    })
  )
})