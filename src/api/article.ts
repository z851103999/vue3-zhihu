import request from '@/api/request'
import Api from '@/api/api'
import { IArticleProps as IArticleDetailProps, IUploadProps } from '@/interface/article'
import { AxiosPromise } from 'axios/index'

// 上传图片
export function upload (data: FormData): AxiosPromise<IUploadProps> {
  return request({
    url: Api.UPLOAD,
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
interface IAticleProps{
  title: string;
  content: string;
  column: string;
  image?: string;
  author: string;
}

// 添加文章
export function addArticle (data: IAticleProps) {
  return request({
    url: Api.ADD_ARTICLE,
    method: 'post',
    data
  })
}

export function getArticle (id: string): Promise<any> {
  return request({
    url: `${Api.ADD_ARTICLE}/${id}`,
    method: 'get'
  })
}

export function editArticle (
  id: string,
  data: {
    image?: string;
    content?: string;
    title?: string;
  }
) {
  return request({
    url: `${Api.ADD_ARTICLE}/${id}`,
    method: 'patch',
    data
  })
}

export function deleteArticle (id: string) {
  return request({
    url: `${Api.ADD_ARTICLE}/${id}`,
    method: 'delete'
  })
}
