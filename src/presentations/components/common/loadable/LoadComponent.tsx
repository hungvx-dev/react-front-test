import React from 'react'
import Loadable from '@loadable/component'

import LoadingPage from './LoadingPage'

export const fallbackOptions = { fallback: <LoadingPage /> }
export const LoadComponent = (loader: () => Promise<any>) => Loadable(loader, fallbackOptions)
