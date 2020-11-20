import Vue from 'vue'
import App from './App.vue'
import Sounds from './plugins/sounds.js'

Vue.config.productionTip = false
Vue.use(Sounds)

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
