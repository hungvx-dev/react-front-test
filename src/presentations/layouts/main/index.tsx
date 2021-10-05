import React from 'react'
import { Box } from '@mui/system'

import { Header } from './header'
import { SideBar } from './side'

interface PropsType {}

export const LayoutMain: React.FC<PropsType> = ({ children }) => (
  <Box sx={{ height: '100vh' }}>
    <SideBar />
    <div>
      <Header />
      {children}
    </div>
  </Box>
)
