import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'assets/css/base.css'
import 'assets/fa/css/all.min.css'
import 'common/element.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
