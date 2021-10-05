import React, { useEffect, useState } from 'react'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import { Breadcrumbs, Grid, Typography, Link, Button } from '@mui/material'

import LoadingPage from 'Components/common/loadable/LoadingPage'
import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { ChevronRightIcon } from '@/presentations/icons/ChevronRight'
import { getStoreById } from '~/domain/adapters/redux/entities/store'
import { StoreLayout } from './StoreLayout'
import { VehicleList } from './components/VehicleList'
import { StoreForm } from './components/StoreForm'

export interface FormValues {
  name: string
  description: string
  city: string
  address: string
  phoneNumber: string
}

export const StoreDetail: React.FC = () => {
  const params = useParams<{ id: string }>()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const storeInfo = useAppSelector((store) => store.entities.store.entityInfo)
  const vehicle = useAppSelector((store) => store.entities.vehicle)

  const [isLoading, setIsLoading] = useState(true)

  const onSubmit = async (_data: FormValues) => {
    try {
      const data = { ..._data, vehicles: vehicle.result.map((id) => vehicle.entities[id]) }
      // To do submit
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getStore = async () => {
      await dispatch(getStoreById(+params.id))
      setIsLoading(false)
    }
    getStore()
  }, [dispatch, params.id])

  if (isLoading || !storeInfo) {
    return <LoadingPage />
  }

  return (
    <StoreLayout>
      <Grid container justifyContent="space-between" spacing={3}>
        <Grid item>
          <Typography color="textPrimary" variant="h5">
            Store Detail
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" separator={<ChevronRightIcon fontSize="small" />} sx={{ mt: 1 }}>
            <Link color="textPrimary" component={RouterLink} to="/stores" variant="subtitle2">
              Store List
            </Link>
            <Typography color="textSecondary" variant="subtitle2">
              {storeInfo.name || storeInfo.id}
            </Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item xs={4} container direction="column">
          <StoreForm handleSubmit={onSubmit} storeInfo={storeInfo} />
        </Grid>
        <Grid item xs={8}>
          <VehicleList isLoading={isLoading} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            form="store-info-form"
            onClick={() => history.push('/stores')}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary" form="store-info-form">
            Save
          </Button>
        </Grid>
      </Grid>
    </StoreLayout>
  )
}
