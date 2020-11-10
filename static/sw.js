importScripts('./worker/sw_config.js');


self.addEventListener('install', function(evt) {
  console.log('%cService-worker: %cupdated', 'color:cyan', 'color:lime');
  setTimeout(function(){
    self.clients.matchAll().then(function(clients) {
      if(clients.length){
        clients[0].postMessage({type: 'reload'});
      } else {
        console.log('%cService-worker: %cno clients found', 'color:cyan', 'color:orange');
      }
    });
  },1000)
  return self.skipWaiting();
})

self.addEventListener('fetch', function(evt){
  let method = evt.request.method,
  ctype = evt.request.headers.get('accept');

  if(method === 'GET'){
    if(ctype && ctype.includes('text/html')){
      return evt.respondWith(base.clone())
    } else {
      return evt.respondWith(fetch(evt.request))
    }
  } else {
    return evt.respondWith(reject.clone())
  }

});

//msg
self.onmessage = function(evt){
  if (evt.data.type === 'update'){
    console.log('%cService-worker: %conline', 'color:cyan', 'color:lime');
    console.log('%cService-worker: %cchecking for updates', 'color:cyan', 'color:lime');
    self.registration.update();
    return self.skipWaiting();
  }
}
