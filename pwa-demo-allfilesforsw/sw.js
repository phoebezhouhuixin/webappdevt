let cacheName = 'wad-day-7'; // Q: What if you change the html, 
// but the service worker has already cached the files,
// thus the webpage loads fromm the cache, and the changes to the html do not show?
// A: Change the cache name (e.g. "wad-day-7-1")
// in order for the service worker to detect that the files are new, 
// and hence cache the files again when the user refreshes the page. 
let filesToCache = [
  '/',
  '/kafka.jpg',
  '/logo.jpg',
  '/mona-lisa.jpg',
  '/pikachu.png',
  '/page-one.html',
  '/init-nav.js',
  '/starry.jpg',
  '/style.css',
  '/script.js',
  '/data.json'
]

/* 
start the service worker, when the user access
the website online. This will add the all the files 
listed in filesToCache to the browser cache.

*/
self.addEventListener('install', function(e){
  console.log("on install")
    console.log(cacheName);
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
    caches.match(e.request,{cacheName:cacheName}).then(function(response){
        console.log("Fetching "+e.request.url);
      return response || fetch (e.request)
    })
  )
})

self.addEventListener('message', function (event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});