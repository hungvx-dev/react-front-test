import { User } from '~/domain/models/entities/user'
import { ResponseApi } from '~/_libs/request'

export default interface IUserRepository {
  getMe(): ResponseApi<User>
}
