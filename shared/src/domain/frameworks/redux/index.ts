import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
  AnyAction,
  ThunkAction as IThunkAction,
  ThunkDispatch as IThunkDispatch,
} from '@reduxjs/toolkit'

import { ENV } from '~/_constants/env'
import { rootState } from '~/domain/adapters/redux'

// Note: this API requires redux@>=3.1.0
const rootReducer = combineReducers(rootState)

const middleware = [
  ...getDefaultMiddleware({
    thunk: true,
    immutableCheck: ENV.NODE_APP === 'development',
    serializableCheck: ENV.NODE_APP === 'development',
  }),
]

const store = configureStore({
  middleware,
  devTools: ENV.NODE_APP === 'development',
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkDispatch = IThunkDispatch<RootState, null, AnyAction>
export type ThunkAction<R = unknown> = IThunkAction<Promise<R>, RootState, null, AnyAction>

export default store
