import axios from 'axios/index'

declare module 'axios' {
  export interface AxiosInstance {
    (config: AxiosRequestConfig): Promise<any>;
  }
  // export interface AxiosResponse {
  //   (AxiosResponse)<any>
  // }
}
