const CACHE='fire-mobile-be0749434a838405';
const FILES=["./icon-192.png","./icon-512.png","./index.html","./manifest.webmanifest","./snapshot.enc.json","./assets/index-bhC-ViBx.css","./assets/index-CUED_qFj.js","./assets/manifest-B59zWbUn.webmanifest"];
const SCOPE=new URL(self.registration.scope);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES))));
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')self.skipWaiting();});
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const key of await caches.keys())if(key.startsWith('fire-mobile-')&&key!==CACHE)await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==SCOPE.origin||!url.pathname.startsWith(SCOPE.pathname))return;
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE);
    if(event.request.mode==='navigate')return await cache.match(new URL('index.html',SCOPE).href)||fetch(event.request);
    const match=await cache.match(event.request);return match||fetch(event.request);
  })());
});
