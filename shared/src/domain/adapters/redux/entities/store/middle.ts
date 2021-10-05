import { ResponseData, ResponseListData } from '~/_libs/request'
import StoreApi from '~/data/store'
import { Store } from '~/domain/models/entities/store'
import schema, { useNormalized } from '~/domain/models/schemas'
import StoreInteraction from '~/domain/interactors/store'
import { FetchParams } from '~/domain/repositories/store'
import actionStore from './store'
import actionVehicle from '../vehicle/vehicle'
import actionUiStore from '../../ui/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Vehicle } from '~/domain/models/entities/vehicle'

const storeRepository = new StoreApi()
const store = new StoreInteraction(storeRepository)

export const FETCH_STORE = 'entities/store/fetchList'
export const GET_STORE = 'entities/store/getById'
export const DELETE_STORE = 'entities/store/delete'
export const UPDATE_STORE = 'entities/store/update'

export const fetchList = createAsyncThunk<boolean, FetchParams>(FETCH_STORE, async (payload, { dispatch }) => {
  try {
    const { results, total }: ResponseListData<Store[]> = await store.fetchList.call(store, payload)
    if (results) {
      const store = useNormalized<Store>(results, schema.stores)
      dispatch(actionStore.updateEntities(store))
      dispatch(actionUiStore.setTotalEntity(total ?? 0))
    }
    return false
  } catch (error) {
    throw error
  }
})

export const getStoreById = createAsyncThunk<boolean, number>(GET_STORE, async (payload, { dispatch }) => {
  try {
    GET_STORE
    const data: ResponseData<Store> = await store.getById.call(store, payload)
    if (data) {
      const vehicles = useNormalized<Vehicle>(data.vehicles || [], schema.vehicles)
      dispatch(actionStore.setEntity(data))
      dispatch(actionVehicle.updateEntities(vehicles))
    }
    return false
  } catch (error) {
    throw error
  }
})

export const deleteStoreById = createAsyncThunk<boolean, number>(DELETE_STORE, async (payload, { dispatch }) => {
  try {
    // Call api delete
    dispatch(actionStore.deleteEntity(payload))
    return true
  } catch (error) {
    throw error
  }
})
