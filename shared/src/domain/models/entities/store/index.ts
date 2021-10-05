import { Vehicle } from '../vehicle'

export interface Store {
  id: number
  name: string
  address: string
  phoneNumber: string
  description?: string
  thumbnail: string
  city: string
  vehicles?: Vehicle[]
  createdAt: string
  updatedAt: string
}
