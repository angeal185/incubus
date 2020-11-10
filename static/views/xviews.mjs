import { x } from '../modules/xscript.mjs';
import { xdata } from '../data/xdata.mjs';
import { xutils } from '../modules/xutils.mjs';
import { router } from '../modules/index.mjs';

const xtpl = {
  index(stream, data){
    let item = x('div', {
        class: 'mt-4'
      },
      x('p', data.msg)
    )

    return item;
  },
  services(stream, data){

    let item = x('div', {class: 'mt-4 row'}),
    sitem = x('div', {class: 'row'}),
    arr = [];

    let items = [

      'Penetration testing',
      'Security Hardening',
      'Ethical Hacking',
      'Web Monitoring',
      'Web Detection',
      'Web Defense',
      'Web Development',
      'Mobile Applications',
      'Desktop Applications',
      'Browser Extensions',
      'CMS Development',
      'HTTP/HTTP2/WSS'
    ]

    function isOdd(num) { return num % 2;}

    for (let i = 0; i < items.length; i++) {

      let card = x('div', {
        class: 'gl-card o-none ani',
        onclick(evt){
          let pitem = evt.target.parentNode,
          pitems = pitem.parentNode.children;
          pitem.classList.add('col-lg-12', 'col-md-12');
          for (let j = 0; j < pitems.length; j++) {
            if(j !== i){
              pitems[j].classList.remove('col-lg-12', 'col-md-12')
            }
          }

          console.log('on')
        }
      },items[i])
      if(isOdd(i)){
        setTimeout(function(){
          card.classList.add('fadeInRight')
        },i*250)
      } else {
        setTimeout(function(){
          card.classList.add('fadeInLeft')
        },i*250)
      }
      arr.push(x('div', {class: 'col-lg-4 col-md-6 sh-95'},card))
    }

    sitem.append(...arr)

    item.append(
      x('div', {class: 'col-lg-12'},
        sitem
      )
    )

    return item;
  },
  home(stream, data){
    let item;
    if(window.xcache.home){
      item = window.xcache.home;
    } else {
      item = x('div',
        x('div', {class: 'text-center ani o-none'}),
        x('div', {class: 'text-center ani o-none'})
      )

      let text = new Blotter.Text("I N C U B U S", {
        family: "Ubuntu, sans",
        size: 150,
        fill: "#00bcd4",
        paddingLeft: 40,
        paddingRight: 40,
        paddingTop: 60,
        paddingBottom: 10
      }),
      material = new Blotter.FliesMaterial();
      material.uniforms.uPointCellWidth.value = 0.007;
      material.uniforms.uPointRadius.value = 0.6;
      material.uniforms.uSpeed.value = 3;

      let blotter = new Blotter(material, {
        texts: text
      }),
      scope = blotter.forText(text);

      scope.appendTo(item.firstChild);


      text = new Blotter.Text("WEB SPECIALISTS", {
        family: "Ubuntu, sans",
        size: 60,
        fill: "#00bcd4",
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
      });

      material = new Blotter.FliesMaterial();
      material.uniforms.uPointCellWidth.value = 0.02;
      material.uniforms.uPointRadius.value = 0.9;
      material.uniforms.uSpeed.value = 2;

      blotter = new Blotter(material, {
        texts: text
      });

      scope = blotter.forText(text);
      scope.appendTo(item.lastChild);
      window.xcache.home = item;

      setTimeout(function(){
        item.firstChild.classList.add('fadeInUp');
        setTimeout(function(){
          item.lastChild.classList.add('fadeIn');
        },1000)
      },1000)
    }

    return item
  },
  error(stream, data){
    return x('code', stream.js(data))
  },
  build(app_main){

    let toTop = x('div', {
      class: 'totop icon-chevron-up sh-95 hidden',
      onclick: function(){
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    })

    let item = x('div',
      this.nav(),
      x('div', {
          class: 'container-fluid'
        }, app_main
      ),
      this.navLeft(),
      this.navSub(),
      toTop
    )

    window.addEventListener('scroll', xutils.debounce(function(evt){
       let top = window.pageYOffset || document.scrollTop
       if(top === NaN || !top){
         toTop.classList.add('hidden')
       } else if(toTop.classList.contains('hidden')){
         toTop.classList.remove('hidden');
       }
       top = null;
       return;
    }, 250))

    return item
  },
  nav(){
    let item = x('div', {
        class: 'hamburger',
        onclick: function(){
          let evt = new Event("nav-left");
          window.dispatchEvent(evt);
        }
      },
      x('span',{class: 'line'}),
      x('span',{class: 'line'}),
      x('span',{class: 'line'})
    )
    window.addEventListener('nav-left', function(){
      item.classList.toggle('is-active')
    })
    return item;

  },
  navLeft(){
    let item = x('div', {
        class: 'nav-left'
      }
    ),
    items = xdata.base.nav;

    for (let i = 0; i < items.length; i++) {
      item.append(x('div', {
          class: 'sd-item sh-95',
          onclick: function(){
            router.rout(items[i].path);
            let evt = new Event("nav-left");
            window.dispatchEvent(evt);
          }
        },
        x('span', items[i].title)
      ))
    }

    window.addEventListener('nav-left', function(){
      item.classList.toggle('is_active')
    })

    return item
  },
  navSub(){

    let item = x('nav', {class: 'nav-sub'},
      x('div', {class: 'container-fluid'},
        x('div', {class: 'row'},
          function(){

            let bc = x('div',
              x('span', 'Dashboard'),
              x('span', {class: 'icon-chevron-right'}),
              x('span')
            ),
            div = x('div', {class: 'col-md text-left'}, bc);

            window.addEventListener("bc-update", function(evt) {
               bc.lastChild.textContent = evt.detail
            });

            return div;
          },
          function(){
            let div = x('div', {class: 'col-md text-right'}),
            arr = xdata.base.navSub
            for (let i = 0; i < arr.length; i++) {
              div.append(x('span', arr[i]));
            }

            return div;
          }
        )
      )
    )

    setTimeout(function(){
      item.classList.toggle('is_active')
    },3000);

    return item;
  }
}

export { xtpl }
