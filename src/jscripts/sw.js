importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

console.log("this is my custom service worker");

workbox.precaching.precacheAndRoute([
    { revision: "178ce1051ca21a5d8691a39f02eea1f3", url: "/jscripts/minified-index-page-local-css/framework.min.css" },
    { revision: "45d9b6b4412c29322f2e78187f8761c7", url: "/jscripts/minified-index-page-local-css/st_site.min.css" },
    { revision: "d3d8f6ef43894642540b877fa9a6ee68", url: "workbox-c9c1d482.js" },
]);

workbox.routing.registerRoute(
  ({ request }) => request.destination === 'style', // Match all CSS requests
    // new RegExp('https://jsonplaceholder.typicode.com/users'),
    new workbox.strategies.CacheFirst({
      cacheName: 'css-cache',
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50, // Limit the number of entries in the cache
          maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
        }),
      ],
    })
);
