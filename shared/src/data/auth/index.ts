import InteractionBase from '~/domain/interactors/InteractionBase'
import IAuthRepository, { AuthenticationResponse, LoginPayload } from '~/domain/repositories/auth'

export default class AuthApi extends InteractionBase implements IAuthRepository {
  readonly path = '/api/v1/auth'

  login(data: LoginPayload) {
    return this.http.post<AuthenticationResponse>(`${this.path}/login`, { ...data })
  }
}
