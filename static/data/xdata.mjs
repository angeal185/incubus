import { dashboard } from './dashboard.mjs'


const xdata = {
  dashboard: {
    msg: 'welcome message 2',
    page: dashboard
  },
  blog: {
    msg: 'Big things have small beginnings.'
  },
  css: ['fonts', 'bootstrap', 'main', 'theme'],
  base: {
    nav: [{
      title: 'Home',
      path: '/home'
    },{
      title: 'Services',
      path: '/services'
    },{
      title: 'About',
      path: '/about'
    },{
      title: 'FAQ',
      path: '/faq'
    },{
      title: 'News',
      path: '/news'
    },{
      title: 'Contact',
      path: '/contact'
    }],
    navSub: [{
      class: 'icon-github sub-ico',
      title: 'my github',
      target: '_blank',
      onclick(){
        window.open('https://github.com')
      }
    },{
      class: 'icon-codepen sub-ico',
      title: 'my npm',
      target: '_blank',
      onclick(){
        window.open('https://codepen.io/angeal185')
      }
    },{
      class: 'icon-npm sub-ico',
      title: 'my npm',
      target: '_blank',
      onclick(){
        window.open('https://npmjs.com/~angeal185')
      }
    }]
  },
  user: {
    tabs:['profile']
  }
}

export { xdata }
