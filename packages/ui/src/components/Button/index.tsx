// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
// import { variant } from 'styled-system'

const Base = styled.Button`
  background-color: ${props => props.theme.colors.default};
  color: ${props => props.theme.colors.inverse};
`

function ButtonPrimary() {
  return <Base>Hej</Base>
}

export default ButtonPrimary
