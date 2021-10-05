import HttpRequest from '~/_libs/request'

export interface IRepositoryBase {
  readonly path: string
  http: HttpRequest
}
