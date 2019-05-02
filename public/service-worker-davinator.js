importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js');

if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
} else {
    console.log(`Boo! Workbox didn't load 😬`);
}
workbox.routing.registerRoute(
    new RegExp('.*\.html'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    new RegExp('.*\.js'),
    new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
    // Cache CSS files.
    /\.css$/,
    // Use cache but update in the background.
    new workbox.strategies.StaleWhileRevalidate({
        // Use a custom cache name.
        cacheName: 'css-cache',
    })
);

workbox.routing.registerRoute(
    // Cache image files.
    /\.(?:png|jpg|jpeg|svg|gif)$/,
    // Use the cache if it's available.
    new workbox.strategies.CacheFirst({
        // Use a custom cache name.
        cacheName: 'image-cache',
        plugins: [
            new workbox.expiration.Plugin({
                // Cache only 20 images.
                maxEntries: 20,
                // Cache for a maximum of a week.
                maxAgeSeconds: 7 * 24 * 60 * 60,
            })
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp('.*ft-tfs.*'),
    new workbox.strategies.NetworkFirst({
        // Use a custom cache name.
        cacheName: 'ft-tfs-cache',
    })
);

workbox.routing.registerRoute(
    new RegExp('/'),
    new workbox.strategies.NetworkFirst()
);

self.addEventListener('push', e => {
    var options = {
      body: 'This notification was generated from a push!',
      icon: 'images/example.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2'
      },
      actions: [
        {action: 'explore', title: 'Explore this new world',
          icon: 'images/checkmark.png'},
        {action: 'close', title: 'Close',
          icon: 'images/xmark.png'},
      ]
    };
    e.waitUntil(
      self.registration.showNotification('Hello world!', options)
    );
  });