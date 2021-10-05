import axios from 'axios'
import { LOCAL_STORAGE_KEYS } from '~/_constants/config'
import LocalStorage from '~/_utils/storage'

axios.interceptors.request.use(
  (config) => {
    const accessToken = LocalStorage.get(LOCAL_STORAGE_KEYS.ACCESS_TOKEN)

    if (accessToken) {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      config.headers = Object.assign(config.headers, headers)
    }

    return config
  },
  (error) => Promise.reject(error),
)

axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response && error.response.data),
)
