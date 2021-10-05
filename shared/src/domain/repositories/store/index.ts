import { Store } from '~/domain/models/entities/store'
import { ResponseApi } from '~/_libs/request'

export interface FetchParams extends Pagination { }

export interface Information {
  label: string
  value: string
  type_id: number
  position: number
}

export default interface IStoreRepository {
  fetchList(params: FetchParams): ResponseApi<Store[]>
  getById(id: number): ResponseApi<Store>
}
