// 对axios进行处理
import axios from 'axios'
// 引入路由实例对象
import router from '../router'
// 引入elementui的提示
import { Message } from 'element-ui'
// 引入第三方包，处理安全整数
import JSONBig from 'json-bigint'

// 请求拦截,统一注入token
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () {
  // 执行请求失败

})
// 后台数据 到达 响应拦截之前走的一个函数
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : data // JSONbig.parse 替换 JSON.parse  保证数字的正确
}]

// 响应式拦截
axios.interceptors.response.use(function (response) {
  // 解决当data不存在时，报错的情况
  return response.data ? response.data : {}
}, function (error) {
  // 执行请求失败
  let status = error.response.status // 获取失败的状态码
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '输入信息有误！'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ message })
  // 不再进入catch  终止错误
  return new Promise(function () {}) // 终止当前的错误
})
export default axios
