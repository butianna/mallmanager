import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login/login.vue'
// 简写 @ 会自动找到src
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import Users from '@/components/users/users.vue'
import Right from '@/components/rights/right.vue'
import Role from '@/components/rights/role.vue'
import Goodslist from '@/components/goods/goodslist.vue'
import GoodsAdd from '@/components/goods/goodsadd.vue'
import CateParams from '@/components/goods/cateparams.vue'
import GoodsCate from '@/components/goods/goodscate.vue'
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
    }, {
      name: 'goods',
      path: '/goods',
      component: Goodslist
    }, {
      name: 'goodsadd',
      path: '/goods',
      component: GoodsAdd
    }, {
      name: 'params',
      path: '/params',
      component: CateParams
    }, {
      name: 'categories',
      path: '/categories',
      component: GoodsCate
    }]
  }]
})

// 在路由配置生效之前 统一判断token
// 路由守卫 在路由配置生效之前
// 路由/导航 守卫
// to-->要去的路由配置
// from-->当前的路由配置
// / -login  home->login to就是login from就是home路由配置
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.name === 'login') {
    next()
  } else {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push({ 'name': 'login' })
      Message.warning('请先登录')
      return
    }
    next()
  }
})

export default router

