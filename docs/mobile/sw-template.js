const CACHE='corne-pocket-__CACHE_VERSION__';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./layout.pdf'];
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('corne-pocket-')&&key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
   const cache=await caches.open(CACHE);
   try{
     const response=await fetch(event.request);
     if(response.ok){await cache.put(event.request,response.clone());return response;}
     return await cache.match(event.request)||response;
   }catch{
     const saved=await cache.match(event.request);
     if(saved)return saved;
     if(event.request.mode==='navigate')return await cache.match('./index.html');
     return Response.error();
   }
 })());
});
