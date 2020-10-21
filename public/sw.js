const VERSION = 'V2';
const CACHE_NAME = 'CACHE_' + VERSION

const cacheUrls = [
  '/',
  '/api/data',
  '/css/index.css',
  '/js/index.js',
  '/js/request.js',
]

// serviceWorker 安装期间添加缓存。安装后应该迅速激活。
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(cacheUrls)
    })
  )
})

// serviceWorker 激活后删除无用缓存。激活后应该让 worker 线程迅速获取页面的控制权。
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheList => {
      console.log(cacheList);
      cacheList.forEach(cacheName => {
        if (cacheName !== CACHE_NAME) {
          caches.delete(cacheName)
        }
      })
    })
  )
})

self.addEventListener('fetch',function(event) {
  console.log('request: ' + event.request.url);
  let url = new URL(event.request.url);
  // 不是同一个域下的，走cdn。不走缓存。
  if (self.origin !== url.origin) {
    return
  }

  if(event.request.url.includes('/api/data')) {
    event.respondWith(
      fetch(event.request).then(function(res) {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, res.clone());
          return res
        })
      }).catch(function() {
        return caches.match(event.request)
      })
    )
    
    return
  }

  event.respondWith(
    fetch(event.request).catch(function(){
      return caches.match(event.request)
    })
  )
})