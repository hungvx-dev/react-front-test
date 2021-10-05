import { LoadComponent } from 'Components/common/loadable/LoadComponent'

export const LoginPage = LoadComponent(() => import('./login'))
export const RegisterPage = LoadComponent(() => import('./register'))
