// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// MyBread其实是组件选项所在的对象
import MyBread from '@/components/cuscom/myBread.vue'
import ElementUI from 'element-ui'

// 不要忘记引入css文件
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/css/reset.css'
import MyServerHttp from '@/plugins/http.js'
import moment from 'moment'

// 适用Vue插件
Vue.use(ElementUI)
Vue.use(MyServerHttp)

Vue.config.productionTip = false

// 全局过滤器--处理日期
Vue.filter('formatdate', (v) => {
  return moment(v).format('YYYY-MM-DD')
})
//
Vue.component('my-bread', MyBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // render:(h)=>h(App)
  components: { App },
  template: '<App/>'
})
