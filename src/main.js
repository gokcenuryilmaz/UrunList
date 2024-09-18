import Vue from 'vue'
import App from './App.vue'
import {router} from "./router"
import {store} from "./store/store"
Vue.config.productionTip = false
import VueResource from "vue-resource"
Vue.use(VueResource);
//para şeklinde göstermek için,filter özelliği footerde kullandık curency ile
Vue.filter ("currency",(value)=> {
  return parseFloat(value).toLocaleString(undefined,{minimumFractionDigits : 2}) + " TL"
})
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
