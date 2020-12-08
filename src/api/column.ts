import request from './request'
import Api from './api'

export function getColumnList (currentPage: number, pageSize: number): any {
  return request({
    url: Api.COLUMN_LIST,
    method: 'get',
    params: {
      currentPage,
      pageSize
    }
  })
}

export function getColumnDetail (id: string, currentPage: number, pageSize: number): any {
  return request({
    url: `${Api.COLUMN_LIST}/${id}/posts`,
    method: 'get',
    params: {
      currentPage,
      pageSize
    }
  })
}
