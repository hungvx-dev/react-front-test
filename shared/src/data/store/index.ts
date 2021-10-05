import InteractionBase from '~/domain/interactors/InteractionBase'
import IStoreRepository, { FetchParams } from '~/domain/repositories/store'
import { Store } from '~/domain/models/entities/store'

export default class StoreApi extends InteractionBase implements IStoreRepository {
  readonly path = '/api/v1/stores'

  fetchList(params: FetchParams) {
    return this.http.get<Store[]>(this.path, { ...params })
  }

  getById(id: number) {
    return this.http.get<Store>(`${this.path}/${id}`)
  }
}
