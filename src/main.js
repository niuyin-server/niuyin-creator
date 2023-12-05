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
// 分页组件
import Pagination from "@/components/element/Pagination";

Vue.use(PiniaVuePlugin)
const pinia = createPinia()
pinia.use(createPersistedState()) //开启缓存，存储在localstorage

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
