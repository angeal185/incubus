import { router, x } from './modules/index.mjs';
import { anican } from './modules/anican.mjs';

const sw = navigator.serviceWorker;

if (sw.controller) {

  sw.onmessage = function(evt){
    evt = evt.data;
    if (evt.type === 'reload'){
      return location.reload();
    }
  }

  sw.controller.postMessage({type: 'update'});

  function render_error(){

  }

  let cnv = x('canvas', {class: 'cnv'});

  document.body.append(cnv);

  anican(cnv,{
    colors: [
      "#222222",
      "#333333",
      "#444444",
      "#555555"
     ],
    max: 50,
    size: 10,
    speed: 0.5
  })
  //initHeader(cnv);
  //addListeners();


  router
  .on('/home', function(request, stream) {


    stream.render('home', request.data, function(err){
      if(err){return stream.renderErr();}

    })


  })
  .on('/services', function(request, stream) {

    stream.render('services', request.data, function(err){
      if(err){
        stream.renderErr();
        return;
      }
    })


  })
  .on('/about', function(request, stream) {

    stream.render('about', request.data, function(err){
      if(err){return stream.renderErr();}

    })


  })
  .on('/faq', function(request, stream) {

    stream.render('faq', request.data, function(err){
      if(err){return stream.renderErr();}

    })


  })
  .on('/news', function(request, stream) {


      stream.render('news', request.data, function(err){
        if(err){return stream.renderErr();}



      })



  })
  .on('/error', function(request, stream) {
    stream.render('error', request.data, function(err){
      if(err){return console.error(err)}
    })

  })

  .init().listen().validate();

  //router.rout('/');

  function onmessage(evt){
    console.log(evt)
  }

  function onerror(evt){
    console.log(evt)
  }

} else {
  navigator.serviceWorker.register('./sw.js')
  .then(function(reg){
    location.reload();
  })
}

//worker.add({path:'test.js', type: 'web'}, onmessage, onerror)
