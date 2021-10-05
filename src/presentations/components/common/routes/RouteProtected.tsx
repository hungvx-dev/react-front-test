import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { LayoutMain } from 'Layouts/main'
import { getMe } from '~/domain/adapters/redux/entities/user'

import { RouteProps } from '../../../routers/routes'
import LoadingPage from '../loadable/LoadingPage'

const RouteProtected: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const dispatch = useAppDispatch()
  const authenticated = useAppSelector((store) => store.app.auth.authenticated)
  const currentUser = useAppSelector((store) => store.entities.user.me)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthenticationByGetMe = async () => {
      if (!authenticated || !currentUser) {
        await dispatch(getMe()).unwrap()
      }
    }

    const initial = async () => {
      await checkAuthenticationByGetMe()
      setIsLoading(() => false)
    }
    initial()
  }, [authenticated, currentUser, dispatch])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!authenticated) {
          return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // if (roles && roles.indexOf(currentUser.role) === -1) {
        //  // role not authorized so redirect to home page
        //  return <Redirect to={{ pathname: '/' }} />
        // }

        // authorized so return component
        return (
          <LayoutMain>
            <Component {...props} />
          </LayoutMain>
        )
      }}
    />
  )
}

export default React.memo(RouteProtected)
