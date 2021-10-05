import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import RouteProtected from 'Components/common/routes/RouteProtected'
import RoutePublished from 'Components/common/routes/RoutePublished'
import { routes, RouteProps } from './routes'

export const AppRouter: React.FC = () => (
  <Router>
    <Switch>
      {routes.map((route: RouteProps, index: number) => {
        if (route.authenticated) {
          return <RouteProtected key={index} {...route} />
        }
        return <RoutePublished key={index} {...route} />
      })}
    </Switch>
  </Router>
)
