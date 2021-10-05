import { RouteProps as IRouteProps } from 'react-router-dom'
import authRoutes from './modules/auth'
import storeRoutes from './modules/store'

type RequiredFieldsRoute = 'path' | 'component'
export interface RouteProps extends RequiredPartial<IRouteProps, RequiredFieldsRoute> {
  authenticated?: boolean
}

export const routes: RouteProps[] = [...authRoutes, ...storeRoutes]
