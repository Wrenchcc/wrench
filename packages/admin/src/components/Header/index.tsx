import React from 'react'
import styled from 'styled-components'

export const Base = styled.header`
  position: fixed;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: black;
`

export const Title = styled.h2`
  color: white;
  font-size: 21px;
  font-weight: 500;
  margin-left: 20px;
`

function Header() {
  return (
    <Base>
      <img src={require('./logo.svg')} />
      <Title>Admin</Title>
    </Base>
  )
}

export default Header
