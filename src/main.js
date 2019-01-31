/* eslint-disable */
import Vue from 'vue'
import './register'
import Cube from 'cube-ui'
Vue.use(Cube)
import App from './App.vue'
import router from './router/index'
import 'common/stylus/index.styl'
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
