import { createAsyncThunk } from '@reduxjs/toolkit'

import { ResponseData } from '~/_libs/request'
import LocalStorage from '~/_utils/storage'
import { LOCAL_STORAGE_KEYS } from '~/_constants/config'
import AuthApi from '~/data/auth'
import Auth from '~/domain/interactors/auth'
import { AuthenticationResponse, LoginPayload } from '~/domain/repositories/auth'
import actionAuth from './auth'

const authRepository = new AuthApi()
const auth = new Auth(authRepository)

export const LOGIN = 'app/auth/login'

export const login = createAsyncThunk<boolean, LoginPayload>(LOGIN, async (payload, { dispatch, rejectWithValue }) => {
  try {
    const data: ResponseData<AuthenticationResponse> = await auth.login.call(auth, payload)
    if (data) {
      const { token, ttl } = data
      dispatch(actionAuth.setAuthentication(true))
      LocalStorage.set(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token)
      LocalStorage.set(LOCAL_STORAGE_KEYS.EXPIRED_TIME, ttl)
      return true
    }
    return false
  } catch (error) {
    throw rejectWithValue(error)
  }
})
