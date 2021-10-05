import { RouteProps } from '../routes'
import { LoginPage, RegisterPage } from '@/presentations/modules/auth'

const routes: RouteProps[] = [
  {
    path: '/login',
    component: LoginPage,
    exact: true,
  },
  {
    path: '/register',
    component: RegisterPage,
    exact: true,
  },
]

export default routes
