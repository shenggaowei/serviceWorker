const version = 'v1';
const urlsToPrefetch = [
  './index.js'
]

// serviceWorker 安装期间添加缓存。安装后应该迅速激活。
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(version).then(function (cache) {
      return cache.addAll(urlsToPrefetch)
    })
  )
})

// serviceWoker 激活后删除无用缓存。激活后应该让 worker 线程迅速获取页面的控制权。
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(cacheList => {
      cacheList.forEach(cacheName => {
        if (cacheName !== version) {
          caches.delete(version);
        }
      })
    })
  )
})