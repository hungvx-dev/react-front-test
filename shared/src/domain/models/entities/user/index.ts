export interface User {
  id: number
  avatar?: string
  fullName?: string
  email: string
  emailVerified: boolean
  isDisabled: boolean
  isNeedPassword: boolean
  facebookId?: string
  dob?: string
  gender?: string
  roleId?: string
  country?: string
  phoneNumber?: string
  createdAt: string
  updatedAt: string
}
