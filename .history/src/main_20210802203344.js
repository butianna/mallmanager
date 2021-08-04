// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
// 不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'
import MyServerHttp from '@/plugins/http.js'

// 使用Vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
