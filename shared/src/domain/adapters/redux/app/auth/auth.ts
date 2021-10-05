import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  authenticated: boolean
}

const initialState: State = {
  authenticated: false,
}

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthentication: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload
    },
  },
})

export { reducer }
export default actions
