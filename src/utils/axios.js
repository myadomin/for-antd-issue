import axios from 'axios'
import { message } from 'antd'
import {HashRouter} from 'react-router-dom'
const router = new HashRouter()

// 如果前后台非同域部署需要用
// axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(config => {
  // contentType json格式转form格式
  // config.transformRequest = [data => {
  //   let ret = ''
  //   for (let it in data) {
  //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  //   }
  //   return ret.substr(0, ret.length - 1)
  // }]
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // if (response.data.ret === 0) {
  //   // 正常
  //   return response.data
  // } else if (response.data.ret === 1000001) {
  //   // 没有登录或者登录过期 跳到getOauth页面自动登录
  //   router.history.push('/autoAuth')
  // } else {
  //   // 其他错误
  //   message.error(JSON.stringify(response.data))
  //   // throw后就会走到catch
  //   throw response.data
  //   // Promise.reject好像还是走then
  //   // Promise.reject(response.data)
  // }
  return response.data
}, error => {
  // message.error('后台接口报错')
  return Promise.reject(error)
})

export default axios
