import { combineReducers } from '@reduxjs/toolkit'

import { reducer as auth } from './auth'

export default combineReducers({ auth })
