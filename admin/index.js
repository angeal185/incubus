const crypto = require('crypto');


function hash(str){
  return crypto.createHash('sha256').update(str).digest('base64');
}


console.log(hash("navigator.serviceWorker.register('./sw.js').then(function(reg){location.reload();})"))
