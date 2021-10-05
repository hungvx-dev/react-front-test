import React, { useMemo, useEffect } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SchemaOf, object, string } from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Grid, Card, CardContent, CardHeader } from '@mui/material'

import { InputField } from 'Components/form-ui/input-field'
import { Store } from '~/domain/models/entities/store'
import { FormValues } from '..'

const formSchema: SchemaOf<FormValues> = object({
  name: string().required('Name is required'),
  description: string().default(''),
  city: string().required('City is required'),
  address: string().required('Address is required'),
  phoneNumber: string().required('PhoneNumber is required'),
})

interface PropsType {
  handleSubmit: (data: FormValues) => Promise<void>
  storeInfo: Store
}

export const StoreForm: React.FC<PropsType> = ({ handleSubmit, storeInfo }) => {
  const methods = useForm<FormValues>({ resolver: yupResolver(formSchema) })
  const { handleSubmit: handleSubmitForm, reset } = methods

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

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    handleSubmit(data)
  }

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])

  return (
    <FormProvider {...methods}>
      <form autoComplete="off" id="store-info-form" onSubmit={handleSubmitForm(onSubmit)}>
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
  )
}
