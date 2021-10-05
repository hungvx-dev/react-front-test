import React from 'react'
import { Provider } from 'react-redux'

import store from '~/domain/frameworks/redux'
import { AppRouter } from './routers'

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  )
}

export default App
