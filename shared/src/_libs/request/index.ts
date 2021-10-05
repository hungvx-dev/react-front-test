import axios, { AxiosRequestConfig, AxiosStatic, CancelTokenStatic } from 'axios'

import { ENV } from '~/_constants/env'
import './interceptor'

const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  // 'X-Requested-With': 'application/json',
  // 'Access-Control-Request-Headers': '*',
  // 'Access-Control-Allow-Origin': '*',
}
export type RequestParams = Record<string, string | number | null | undefined>
export type RequestBody = Record<
  string,
  string | number | null | undefined | Record<string, unknown> | Record<string, unknown>[]
>
export interface ResponseListData<Data> {
  total?: number | null
  results?: Data
}
export type ResponseData<Data> = Pick<Data, keyof Data>

export type ResponseApi<Data> = Promise<ResponseData<Data> | ResponseListData<Data>>

export default class HttpRequest {
  private readonly headers: {
    [key: string]: string
  }
  private readonly apiUrl: string
  private readonly axios: AxiosStatic
  private cancelToken: CancelTokenStatic

  constructor() {
    this.headers = DEFAULT_HEADERS
    this.apiUrl = ENV.API_HOST
    this.cancelToken = axios.CancelToken
    this.axios = axios
    this.axios.defaults.headers = this.headers
    this.axios.defaults.baseURL = this.apiUrl
  }

  getURL(path: string): string {
    return `${this.apiUrl}${path}`
  }

  async get<Data>(path: string, params?: RequestParams, config?: AxiosRequestConfig): ResponseApi<Data> {
    return this.axios.get(path, { params, ...config })
  }

  async post<Data>(path: string, data?: RequestBody, config?: AxiosRequestConfig): ResponseApi<Data> {
    return this.axios.post(path, data, config)
  }

  async put<Data>(path: string, data?: RequestBody, config?: AxiosRequestConfig): ResponseApi<Data> {
    return this.axios.put(path, data, config)
  }

  async delete<Data>(path: string, params?: RequestParams, config?: AxiosRequestConfig): ResponseApi<Data> {
    return this.axios.delete(path, { params, ...config })
  }

  async upload<Data>(path: string, data?: FormData, config?: AxiosRequestConfig): ResponseApi<Data> {
    return this.axios.post(path, data, config)
  }
}
