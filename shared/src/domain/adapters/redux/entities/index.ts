import { combineReducers } from '@reduxjs/toolkit'

import { reducer as user } from './user'
import { reducer as store } from './store'
import { reducer as vehicle } from './vehicle'

export default combineReducers({ user, store, vehicle })
