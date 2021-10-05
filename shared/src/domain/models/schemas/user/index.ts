import { schema } from 'normalizr'
import { User } from '~/domain/models/entities/user'

export type UserNormalizedEntity = Record<number, User>

export const user = new schema.Entity('users')
export const users = [user]
