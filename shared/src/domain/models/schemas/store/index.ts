import { schema } from 'normalizr'

import { Store } from '~/domain/models/entities/store'
import { vehicles } from './../vehicle'

export type StoreNormalizedEntity = Record<number, Store>

export const store = new schema.Entity('stores', {
  vehicles,
})

export const stores = [store]
