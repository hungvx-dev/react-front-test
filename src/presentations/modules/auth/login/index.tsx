import React from 'react'
import { Link as RouterLink, useHistory } from 'react-router-dom'
import { Link, Button, Card, CardContent, Divider, Grid, Typography, Container } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaOf, string, object } from 'yup'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { Box } from '@mui/system'

import { InputField } from 'Components/form-ui/input-field'
import { useAppDispatch } from 'Hooks/useStore'
import { login } from '~/domain/adapters/redux/app/auth'

interface FormValues {
  email: string
  password: string
}

const formSchema: SchemaOf<FormValues> = object({
  email: string().email('Must be a valid email').max(255).required('Email is required'),
  password: string().required('Password is required'),
})
const LoginPage: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const methods = useForm<FormValues>({
    resolver: yupResolver(formSchema),
  })
  const { handleSubmit, setError } = methods

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const isSuccess = await dispatch(login(data)).unwrap()
      if (isSuccess) {
        history.push('/')
      }
    } catch (error) {
      setError(error.validation.keys[0], { message: error.message })
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: '80px' }}>
      <Card variant="outlined">
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: 4,
          }}
        >
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography color="textPrimary" gutterBottom variant="h4">
              Log in
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              mt: 3,
            }}
          >
            <Grid container>
              <FormProvider {...methods}>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                  <InputField name="email" label="Email" defaultValue="superadmin@testreact.com" />
                  <InputField type="password" name="password" label="Password" defaultValue="admin123" />
                  <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                      Login
                    </Button>
                  </Grid>
                </form>
              </FormProvider>
            </Grid>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Link color="textSecondary" component={RouterLink} to="/register" variant="body2">
            Create new account
          </Link>
        </CardContent>
      </Card>
    </Container>
  )
}

export default LoginPage
