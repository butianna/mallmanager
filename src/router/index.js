import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
// 简写 @ 会自动找到src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    children: [{
      name: 'users',
      path: '/users',
      component: Users
    }, {
      name: 'right',
      path: '/rights',
      component: Right
    }, {
      name: 'role',
      path: '/role',
      component: Role
    }]
  }]
})

// 在路由配置生效之前 同意判断token
// 路由守卫 在路由配置生效之前
// 路由/导航 守卫
// to-->要去的路由配置
// from-->当前的路由配置
// / -login  home->login to就是login from就是home路由配置
router.beforeEach((to, from, next) => {
  // to from next
  // 如果要去的是登录->next()
  // 如果要去的不是登录 判断token token没有来到登录 如果有继续渲染组件
  if (to.path === '/login') {
    next()
  } else {
    const token = localStorage.getItem(`token`)
    if (!token) {
      // this.$router.push({name:'login'})
      // 提示
      // this.$message.warning('回到登录')
      Message.warning('回到登录页')
      router.push({ name: 'login' })
      return
    }
  }
})

export default router

