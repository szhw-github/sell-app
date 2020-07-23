import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './styles/ref_style/reset.css'
import './styles/ref_style/border.css'
import './styles/stylus/style.css'
import FastClick from 'fastclick'

Vue.config.productionTip = false
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
