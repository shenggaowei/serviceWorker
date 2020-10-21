window.addEventListener('load', function (event) {
  if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker.register('sw.js', { scope: '/src' }).then(function (registration) {
      if (registration) {
        console.log('serviceWorker 注册成功')
      } else {
        console.log('serviceWorker 注册失败')
      }
    })
  }
})