import IUserRepository from '~/domain/repositories/user'
import InteractionBase from '~/domain/interactors/InteractionBase'
import { User } from '~/domain/models/entities/user'

export default class UserApi extends InteractionBase implements IUserRepository {
  readonly path = '/api/v1/users'

  getMe() {
    return this.http.get<User>(`${this.path}/me`)
  }
}
