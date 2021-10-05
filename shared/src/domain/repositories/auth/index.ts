import { ResponseApi } from '~/_libs/request'

export interface LoginPayload {
  email: string
  password: string
}
export interface AuthenticationResponse {
  id: number
  email: string,
  scope: string
  token: string
  emailVerified: boolean
  ttl: number
}

export default interface IAuthRepository {
  login(data: LoginPayload): ResponseApi<AuthenticationResponse>
}
