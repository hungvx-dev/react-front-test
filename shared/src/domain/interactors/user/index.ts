import IUserRepository from '~/domain/repositories/user'

export default class User {
  constructor(private _authRepository: IUserRepository) {}

  getMe() {
    return this._authRepository.getMe()
  }
}
