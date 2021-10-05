import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type State = {
  pagination: Pagination
}

const initialState: State = {
  pagination: { page: 0, perPage: 5, total: 0 },
}

const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload
    },
    setPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.perPage = action.payload
    },
    setTotalEntity: (state, action: PayloadAction<number>) => {
      state.pagination.total = action.payload
    },
  },
})

export { reducer }
export default actions
