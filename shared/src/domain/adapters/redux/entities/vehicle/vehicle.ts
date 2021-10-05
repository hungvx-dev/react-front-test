import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Vehicle } from '~/domain/models/entities/vehicle'
import { Normalized } from '~/domain/models/schemas'
import { VehicleNormalizedEntity } from '~/domain/models/schemas/vehicle'

type State = {
  entities: VehicleNormalizedEntity
  result: number[]
}

const initialState: State = {
  entities: {},
  result: [],
}

type UpdateEntities = {
  entities?: Normalized<Vehicle>
  result: number[]
}

const { actions, reducer } = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    updateEntities: (state, action: PayloadAction<UpdateEntities>) => {
      state.entities = action.payload.entities?.vehicles || {}
      state.result = action.payload.result
    },
  },
})

export { reducer }
export default actions
