const CACHE = 'mokoro-v1';
const ASSETS = [
  './','./index.html','./404.html','./styles/styles.css',
  './app/router.js','./app/ui.js','./app/auth.js','./app/db.js',
  './app/pages/login.js','./app/pages/home.js','./app/pages/buy.js',
  './app/pages/receipt.js','./app/pages/history.js','./app/pages/admin.js',
  './assets/logo.svg'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (ASSETS.some(a => url.pathname.endsWith(a.replace('./','/')))) {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
