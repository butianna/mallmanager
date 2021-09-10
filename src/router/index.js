import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
// import Login from '../components/login/login.vue'
// 简写 @ 会自动找到src
const Login = () => import('@/components/login/login.vue')
const Home = () => import('@/components/home/home.vue')
const Users = () => import('@/components/users/users.vue')
const Right = () => import('@/components/rights/right.vue')
const Role = () => import('@/components/rights/role.vue')
const Goodslist = () => import('@/components/goods/goodslist.vue')
const GoodsAdd = () => import('@/components/goods/goodsadd.vue')
const CateParams = () => import('@/components/goods/cateparams.vue')
const GoodsCate = () => import('@/components/goods/goodscate.vue')
const Orders = () => import('@/components/orders/orders.vue')
const Reports = () => import('@/components/reports/reports.vue')
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
      path: '/roles',
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
    }, {
      name: 'orders',
      path: '/orders',
      component: Orders
    }, {
      name: 'reports',
      path: '/reports',
      component: Reports
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
