import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Swiper from 'swiper'
import { Search, Toast, Icon } from 'vant'
Vue.use(Search).use(Toast).use(Icon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  Swiper,
  render: h => h(App)
}).$mount('#app')
