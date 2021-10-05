import { schema } from 'normalizr'
import { Vehicle } from '~/domain/models/entities/vehicle'

export type VehicleNormalizedEntity = Record<number, Vehicle>

export const vehicle = new schema.Entity('vehicles')
export const vehicles = [vehicle]
