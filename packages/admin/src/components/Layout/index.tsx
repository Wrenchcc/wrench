// @ts-nocheck
import React from 'react'
import styled from 'styled-components'

export const Base = styled.section`
  width: 1060px;
  margin: 0 auto;
  position: absolute;
  left: 330px;
  top: 120px;
`

export const Title = styled.h2`
  color: black;
  font-size: 27px;
  font-weight: 500;
  margin-bottom: 40px;
`

function Layout({ children, title }) {
  return (
    <Base>
      <Title>{title}</Title>
      {children}
    </Base>
  )
}

export default Layout
