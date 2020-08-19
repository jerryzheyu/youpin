import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/reset.scss';
import './style/border.css'
import FastClick from 'fastclick'
import Vant ,{Lazyload}from 'vant';
import 'vant/lib/index.css';
Vue.use(Lazyload);


Vue.use(Vant);
import 'lib-flexible/flexible'
import  './utils/global';
FastClick.attach(document.body);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
