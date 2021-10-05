import React, { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'

import { LayoutPublish } from 'Layouts/publish'
import { RouteProps } from '@/presentations/routers/routes'
import LocalStorage from '~/_utils/storage'
import { LOCAL_STORAGE_KEYS } from '~/_constants/config'

import LoadingPage from '../loadable/LoadingPage'

const RoutePublished: React.FC<RouteProps> = ({ component: Component, ...rest }) => {
  const history = useHistory()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkIsLogged = async () => {
      const isToken = LocalStorage.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)
      setIsLoading(() => false)
      if (isToken) {
        history.push('/')
      }
    }

    checkIsLogged()
  }, [history])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Route
      {...rest}
      render={(props) => (
        <LayoutPublish>
          <Component {...props} />
        </LayoutPublish>
      )}
    />
  )
}

export default React.memo(RoutePublished)
