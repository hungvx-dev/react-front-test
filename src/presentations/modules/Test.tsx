import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { login } from '~/domain/adapters/redux/app/auth'
import { getMe } from '~/domain/adapters/redux/entities/user'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'

function Test() {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const auth = useAppSelector((store) => store.app.auth)

  const onLogin = async () => {
    const isSuccess = await dispatch(login({ email: 'superadmin@testreact.com', password: 'admin123' })).unwrap()
    if (isSuccess) {
      history.push('/store')
    }
  }

  useEffect(() => {
    getMe()
  }, [])

  return (
    <div>
      {auth.authenticated ? (
        <>
          <Link to="/store">store</Link>
        </>
      ) : (
        <button type="button" onClick={onLogin}>
          login
        </button>
      )}
    </div>
  )
}

export default Test
