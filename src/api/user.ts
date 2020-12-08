import request from './request'
import Api from './api'

export function checkLogin (): Promise<any> {
  return request({
    url: Api.CHECK_LOGIN,
    method: 'get'
  })
}

export function userLogin (data: { email: string; password: string }): Promise<any> {
  return request({
    url: Api.USER_LOGIN,
    method: 'post',
    data
  })
}

export function userRegister (data: { email: string; password: string; nickName: string }): Promise<any> {
  return request({
    url: Api.USER_REGISTER,
    method: 'post',
    data
  })
}
