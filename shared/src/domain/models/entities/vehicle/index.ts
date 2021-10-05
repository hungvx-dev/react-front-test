export interface Vehicle {
  id: number
  name: string
  year: string
  thumbnail: string
  vehicleNumber: string
  description?: string
  price: number
  storeId: number
  color: string
  vehicleType?: string
  slug?: number
  isActive?: boolean
  createdAt: string
  updatedAt: string
}