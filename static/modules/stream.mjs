import { defaults } from '../defaults.mjs';
import { xutils } from './xutils.mjs';
import { router, navigate } from './router.mjs';

function Stream(){
  this.settings = defaults
}

Stream.prototype = {
  render(item, data, cb){
   this.settings.render(this, item, data,cb);
   return this;
  },
  renderErr(){
    navigate[this.settings.error]({data:{
      msg: 'render error',
      code: 500
    }}, this);
    return this;
  },
  replace(src, data){
    navigate[src]({data:data}, this, cb);
    return this;
  },
  redirect(src, data){
    router.rout(src, data);
    return this;
  },
  empty(x){
    xutils.empty(this.settings, x);
    return this
  },
  append(x){
    this.settings.app_main.append(x);
    return this
  },
  fetch(src, options, cb){
    xutils.fetch(this.settings, src, options, cb);
    return this;
  },
  js: JSON.stringify,
  jp: JSON.parse
}

const stream = new Stream(defaults);

export { stream }
