什么是service worker？
是一个脚本,运行在独立的线程，可以拦截所有请求，可以缓存get请求的内容，
条件限制：由于可以拦截请求，为了避免中间人攻击，必须在https中使用，开发中localhost也可以
流程：
1.register
```javascript
if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'sw.js',
        {
          scope: './',
        }
      );
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed');
      } else if (registration.active) {
        console.log('Service worker active');
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
}
```
2.install
```javascript
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').addAll([
      './',
      './index.html',
      './style.css',
      './app.js',
      './image-list.js',
      './star-wars-logo.jpg',
      './gallery/bountyHunters.jpg',
      './gallery/myLittleVader.jpg',
      './gallery/snowTroopers.jpg',
    ])
  );
});

```
3.activate
每次sw.js文件变化，就手动更新cache的版本，sw.js文件内容变更，就会重新出发install和activate,，就会删除老的缓存应用新的缓存
```javascript
// 删除旧版本sw的缓存
self.addEventListener('activate', function (event) {
  console.log('service worker activate');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

```

4. fetch
拦截请求并定义缓存策略：缓存优先、网络优先、值获取缓存等等
```javascript
self.addEventListener('fetch', (event) => {
  event.respondWith(
    cacheFirst({
      request: event.request,
      preloadResponsePromise: event.preloadResponse,
      fallbackUrl: './gallery/myLittleVader.jpg',
    })
  );
});
const putInCache = async (request, response) => {
  const cache = await caches.open('v1');
  await cache.put(request, response);
};

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to use the preloaded response, if it's there
  // NOTE: Chrome throws errors regarding preloadResponse, see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=1420515
  // https://github.com/mdn/dom-examples/issues/145
  // To avoid those errors, remove or comment out this block of preloadResponse
  // code along with enableNavigationPreload() and the "activate" listener.
  const preloadResponse = await preloadResponsePromise;
  if (preloadResponse) {
    console.info('using preload response', preloadResponse);
    putInCache(request, preloadResponse.clone());
    return preloadResponse;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request.clone());
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
};
```