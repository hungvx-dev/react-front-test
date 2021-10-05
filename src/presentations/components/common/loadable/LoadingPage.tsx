import React from 'react'
import { CircularProgress } from '@mui/material'
import styled from 'styled-components'

const LoadingPage = () => (
  <Wrapper className="hung">
    <CircularProgress />
  </Wrapper>
)

const Wrapper = styled('div')`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: all 1s ease-in-out;
`

export default LoadingPage
