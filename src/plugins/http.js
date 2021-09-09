// 插件模块
import axios from 'axios'

// 对象
const MyHttpServer = {}

// 给对象动态添加成员
MyHttpServer.install = (Vue) => {
  // 统一设置基准URL
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  // 添加请求拦截器
  axios.interceptors.request.use(function (config) {
    if (config != 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers['Authorization'] = AUTH_TOKEN
    }
    // 在发送请求之前做些什么
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  })

  // 添加实例方法
  Vue.prototype.$http = axios
}

export default MyHttpServer
