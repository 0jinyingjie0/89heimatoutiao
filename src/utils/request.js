// 对axios进行处理
import axios from 'axios'
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function (error) {
  // 执行请求失败
  console.log(error)
})
export default axios
