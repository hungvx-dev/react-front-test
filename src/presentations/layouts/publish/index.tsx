import React from 'react'
import { Box } from '@mui/system'
import { Grid, Container, Typography, useMediaQuery } from '@mui/material'

export const LayoutPublish: React.FC = ({ children }) => {
  const matches = useMediaQuery('(min-width:900px)')
  return (
    <Box sx={{ height: '100vh', margin: '-8px' }}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        {matches && (
          <Grid item md={8}>
            <Box
              sx={{
                backgroundImage: 'url(../../_assets/images/covers/cover.jpeg)',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                height: '100vh',
              }}
            />
          </Grid>
        )}
        <Grid item xs={12} md={4}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}
