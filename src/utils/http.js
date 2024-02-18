import axios from 'axios'
import { getTimestamp } from './time'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000
})

http.interceptors.request.use(config => {
  const mode = import.meta.env.MODE
  if (mode === 'production') {
    if (config.params) {
      const merge = Object.assign(config.params, { stamp: getTimestamp() })
      config.params = merge
    } else {
      config.params = { stamp: getTimestamp() }
    }
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
