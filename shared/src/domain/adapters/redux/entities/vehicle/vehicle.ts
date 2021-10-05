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

type UpdateEntity = {
  id: number
  field: string
  value: never
}

const { actions, reducer } = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    updateEntities: (state, { payload }: PayloadAction<UpdateEntities>) => {
      state.entities = payload.entities?.vehicles || {}
      state.result = payload.result
    },
    updateEntity: (state, { payload }: PayloadAction<UpdateEntity>) => {
      const { id, value, field } = payload
      state.entities[id][field as keyof Vehicle] = value
    },
  },
})

export { reducer }
export default actions
