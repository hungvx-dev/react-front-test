import { createAsyncThunk } from '@reduxjs/toolkit'

import { ResponseData } from '~/_libs/request'
import UserApi from '~/data/user'
import UserInteraction from '~/domain/interactors/user'
import { User } from '~/domain/models/entities/user'
import actionUser from './user'
import actionAuth from '../../app/auth/auth'

const userRepository = new UserApi()
const user = new UserInteraction(userRepository)

export const GET_ME = 'app/user/getMe'

export const getMe = createAsyncThunk<boolean>(GET_ME, async (_, { dispatch }) => {
  try {
    const data: ResponseData<User> = await user.getMe.call(user)
    if (data) {
      dispatch(actionUser.setUser(data))
      dispatch(actionAuth.setAuthentication(true))
      return true
    }
    return false
  } catch (error) {
    return false
  }
})
