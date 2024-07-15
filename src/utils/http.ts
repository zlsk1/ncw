import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { getTimestamp } from './time'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
  timeout: 10000
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
  }, 
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  (res) => {
    return res
  }, 
  (err) => {
    return Promise.reject(err)
  }
)

export default http
