import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '~/domain/models/entities/user'

type State = {
  me: User | null
}

const initialState: State = {
  me: null,
}

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.me = action.payload
    },
  },
})

export { reducer }
export default actions
