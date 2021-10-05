import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export const StoreLayout: React.FC = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      py: 2,
    }}
  >
    {children}
  </Box>
)
