import { RouteProps } from '../routes'
import { StoreDetail, StoreList } from '@/presentations/modules/store'

const routes: RouteProps[] = [
  {
    path: ['/', '/stores'],
    component: StoreList,
    authenticated: true,
    exact: true,
  },
  {
    path: '/stores/:id',
    component: StoreDetail,
    authenticated: true,
    exact: true,
  },
]

export default routes
