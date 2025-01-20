import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'
import { useApp } from '@/pinia/modules/app'

const service = axios.create({
  baseURL: 'https://api.montessori-hz.com/',
  // process.env.NODE_ENV === 'production' ? 'http://api.montessori-hz.com' : '',
  timeout: 30000,
})
service.defaults.withCredentials = true
// 拦截请求
service.interceptors.request.use(
  config => {
    const { authorization } = useApp()
    if (authorization) {
      config.headers['WWW-Authorization'] = `Basic ${authorization.auth_key}`
      // config.headers.authorization = 'Bearer ' + authorization
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 拦截响应
service.interceptors.response.use(
  // 响应成功进入第1个函数，该函数的参数是响应对象
  response => {
    return response.data
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async error => {
    // console.dir(error) // 可在此进行错误上报
    ElMessage.closeAll()
    try {
      ElMessage.error(error.response.data.msg)
    } catch (err) {
      ElMessage.error(error.message)
    }

    return Promise.reject(error)
  }
)

export default service
