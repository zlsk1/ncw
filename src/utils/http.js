import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000',
  // withCredentials: true,
  timeout: 10000
})
http.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
