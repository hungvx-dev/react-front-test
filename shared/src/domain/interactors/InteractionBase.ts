import HttpRequest from '~/_libs/request'
import { IRepositoryBase } from '../repositories/IRepositoryBase'

export default class InteractionBase implements IRepositoryBase {
  http: HttpRequest
  readonly path: string

  constructor() {
    this.http = new HttpRequest()
  }
}
