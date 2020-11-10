// optional default template engine setup
import { x, xrender } from './modules/xscript.mjs';
import { xtpl } from './views/xviews.mjs';
import { xdata } from './data/xdata.mjs';
//cached reference to app-main object
window.xcache = {}
let app_main = x('div');

// app defaults
let defaults = {
  version: '1.0.0', // don't delete me
  origin: 'http://localhost:8000',
  params: true,
  error: '/error',
  base_path: '/home',
  base_data: {
    msg: 'home'
  },
  each: {
    before: function(dest) {
      // return false;  cancel rout
      return true // continue to rout
    },
    after: function(dest) {
      dest = dest.slice(1);
      document.title = dest;

      let evt = new CustomEvent("bc-update", {
        detail: dest
      });
      window.dispatchEvent(evt);
    }
  },
  storage: {
    max_age: 9999999999,
    prefix: 'rt'
  },
  stream: {
    fetch: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  },
  app_main: app_main,
  init: function(){
    let css = xdata.css,
    head = document.head;

    for (let i = 0; i < css.length; i++) {
      head.append(x('link', {
        href: './css/'+ css[i] +'.css',
        rel: 'stylesheet'
      }))
    }

    head.append(x('link', {
      href: './img/favicon.png',
      rel: 'icon',
      type:"image/png"
    }))

    document.body.append(xtpl['build'](app_main));

    return this;

  },
  render: function(stream, path, data, cb){
    xrender(stream, xtpl[path], data, xdata[path], cb);
    return this;
  }
}

export { defaults, app_main }
