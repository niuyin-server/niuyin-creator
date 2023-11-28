import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "@/assets/fonts/font.scss"
import "@/assets/styles/element.scss"
import "@/assets/styles/style.scss"
import { createPinia, PiniaVuePlugin } from 'pinia'
import { createPersistedState } from 'pinia-persistedstate-plugin'
Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(createPersistedState()) //开启缓存，存储在localstorage

Vue.config.productionTip = false

Vue.use(ElementUI)

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
