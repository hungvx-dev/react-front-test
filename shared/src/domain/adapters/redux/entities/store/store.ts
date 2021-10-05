import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Store } from '~/domain/models/entities/store'
import { Normalized } from '~/domain/models/schemas'
import { StoreNormalizedEntity } from '~/domain/models/schemas/store/index'

type State = {
  entities: StoreNormalizedEntity
  result: number[]
  entityInfo: Store | null
}

const initialState: State = {
  entities: {},
  result: [],
  entityInfo: null,
}

type UpdateEntities = {
  entities?: Normalized<Store>
  result: number[]
}

const { actions, reducer } = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateEntities: (state, action: PayloadAction<UpdateEntities>) => {
      state.entities = action.payload.entities?.stores || {}
      state.result = action.payload.result
    },
    setEntity: (state, action: PayloadAction<Store>) => {
      state.entityInfo = action.payload
    },
    deleteEntity: (state, action: PayloadAction<number>) => {
      state.result = state.result.filter((id) => id !== action.payload)
      delete state.entities[action.payload]
    },
  },
})

export { reducer }
export default actions
