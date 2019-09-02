import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/vuex'
import './registerServiceWorker'
import ArgonDashboard from './plugins/argon-dashboard'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
// import moment from 'moment'
// moment.locale('es')
// window.$ = window.jQuery = require('jquery')
import VueTimeago from 'vue-timeago'

Vue.use(VueTimeago, {
  name: 'Timeago', // Component name, `Timeago` by default
  locale: 'es', // Default locale
  // We use `date-fns` under the hood
  // So you can use all locales from it
  locales: {
    'zh-CN': require('date-fns/locale/zh_cn'),
    'es': require('date-fns/locale/es')
  }
})

Vue.config.productionTip = false

// Vue.prototype.moment = moment
Vue.use(ArgonDashboard)
Vue.component('v-select', vSelect)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
