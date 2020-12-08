import axios from 'axios/index'
import store from '@/store'
import $message from '@/components/Message/createMessage'

// 接口校验码
const icode = '48C5907EDC0D3D8C'

const request = axios.create({
  timeout: 5000
})

request.interceptors.request.use(config => {
  store.commit('setIsLoading', true)
  // 统一接口登录管理
  config.params = {
    ...config.params,
    icode
  }
  if (config.data instanceof FormData) {
    config.data.append('icode', icode)
  } else {
    config.data = {
      ...config.data,
      icode
    }
  }
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

request.interceptors.response.use(
  response => {
    store.commit('setIsLoading', false)
    const data = response.data
    if (data.code === 0) {
      return data.data
    } else {
      $message(data.error, 'danger')
      return Promise.reject(data.error)
    }
  },
  error => {
    const { status, data } = error.response
    let message = data.error
    if (status === 422) {
      message = data.detail[0].message
    }
    store.commit('setIsLoading', false)
    $message(message, 'danger')
    return Promise.reject(message)
  }
)

export default request
