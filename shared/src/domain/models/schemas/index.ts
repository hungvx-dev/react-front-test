import { normalize, schema } from 'normalizr'
import { store, stores } from './store'
import { vehicle, vehicles } from './vehicle';

export interface Normalized<Entity> {
  [key: string]: {
    [key: string]: Entity
  }
}

export const useNormalized = <Entity, R = number[]>(data: Entity[] | Entity, schema: schema.Entity | schema.Entity[]) =>
  normalize<Entity, Normalized<Entity>, R>(data, schema)

export default {
  store,
  stores,
  vehicle,
  vehicles,
}
