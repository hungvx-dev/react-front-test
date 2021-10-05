import React, { useEffect, useMemo, useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Link as RouterLink, useParams, useHistory } from 'react-router-dom'
import { SchemaOf, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Breadcrumbs, Grid, Typography, Link, Card, CardContent, CardHeader, Button } from '@mui/material'

import { InputField } from 'Components/form-ui/input-field'
import LoadingPage from 'Components/common/loadable/LoadingPage'
import { useAppDispatch, useAppSelector } from 'Hooks/useStore'
import { ChevronRightIcon } from '@/presentations/icons/ChevronRight'
import { getStoreById } from '~/domain/adapters/redux/entities/store'
import { StoreLayout } from './StoreLayout'
import { VehicleList } from './components/VehicleList'

interface FormValues {
  name: string
  description: string
  city: string
  address: string
  phoneNumber: string
}

const formSchema: SchemaOf<FormValues> = object({
  name: string().required('Name is required'),
  description: string().default(''),
  city: string().required('City is required'),
  address: string().required('Address is required'),
  phoneNumber: string().required('PhoneNumber is required'),
})

export const StoreDetail: React.FC = () => {
  const params = useParams<{ id: string }>()
  const history = useHistory()
  const dispatch = useAppDispatch()
  const storeInfo = useAppSelector((store) => store.entities.store.entityInfo)

  const [isLoading, setIsLoading] = useState(true)

  const defaultValues = useMemo(
    () => ({
      name: storeInfo?.name || '',
      description: storeInfo?.description || '',
      city: storeInfo?.city || '',
      address: storeInfo?.address || '',
      phoneNumber: storeInfo?.phoneNumber || '',
    }),
    [storeInfo],
  )

  const methods = useForm<FormValues>({ resolver: yupResolver(formSchema) })
  const { handleSubmit, reset } = methods

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      console.log(data)
      // To do submit
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const getStore = async () => {
      await dispatch(getStoreById(+params.id))
      reset(defaultValues)
      setIsLoading(false)
    }
    getStore()
  }, [dispatch, reset, params.id, defaultValues])

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
          <FormProvider {...methods}>
            <form autoComplete="off" id="store-info-form" onSubmit={handleSubmit(onSubmit)}>
              <Grid container direction="column" rowSpacing={1}>
                <Grid item>
                  <Card variant="outlined">
                    <CardHeader title="General" />
                    <CardContent>
                      <InputField name="name" label="Name" />
                      <InputField name="description" label="Description" />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item>
                  <Card variant="outlined">
                    <CardHeader title="Contact" />
                    <CardContent>
                      <InputField name="phoneNumber" label="Phone" />
                      <InputField name="address" label="Address" />
                      <InputField name="city" label="City" />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </form>
          </FormProvider>
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
