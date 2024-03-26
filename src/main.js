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

import AMap from 'vue-amap';
Vue.use(AMap);
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '**',
  // 插件集合
  plugin: [
    'AMap.CircleEditor',// 圆形编辑器插件
    "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
    "AMap.Geocoder", // 地理编码与逆地理编码服务，用于地址描述与坐标间的相互转换
    "AMap.Autocomplete",
    "AMap.PlaceSearch",
    "AMap.CitySearch",
  ],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
//高德的安全密钥
window._AMapSecurityConfig = {
  securityJsCode:'**',
}

// 全局组件挂载
Vue.component('Pagination', Pagination)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
