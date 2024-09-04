import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import VueClipboard from 'vue-clipboard2'
import Print from 'vue-print-nb'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store' // store对象，vuex状态管理
import router from './router' // vue路由对象
import i18n from './i18n/i18n'

import '@/icons' // icon
import '@/permission' // permission control

import * as filters from '@/filter'
import errCode from './config/err_code'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(VueClipboard)
Vue.use(Print)
Vue.prototype.errCode = errCode
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI, {
//   size: 'mini'
// })
Vue.use(ElementUI, { size: 'small' })

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
