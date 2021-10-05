import IAuthRepository, { LoginPayload } from '~/domain/repositories/auth'

export default class Auth {
  constructor(private _authRepository: IAuthRepository) {}

  login(data: LoginPayload) {
    return this._authRepository.login(data)
  }
}
