
window.addEventListener('load', function (event) {
    if ('serviceWorker' in window.navigator) {
      navigator.serviceWorker.register('sw.js', { scope: '/' }).then(function (registration) {
        if (registration) {
          console.log('serviceWorker register with scope: ', registration.scope)
        } else {
          console.log('serviceWorker 注册失败')
        }
      })
    }

})