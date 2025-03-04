/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'
// import Vant from 'vant'
// import 'vant/lib/index.css'
import { Toast } from 'vant'
Toast('')
Vue.prototype.$toast = Toast

// Vue.use(Vant)
// import { Button } from 'vant'
// Vue.use(Button)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
