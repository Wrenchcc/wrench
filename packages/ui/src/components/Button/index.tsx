// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
// import { variant } from 'styled-system'

const Base = styled.button`
  background-color: ${(props) => props.theme.colors.default};
  color: ${(props) => props.theme.colors.inverse};
`

function Button() {
  return <Base>Hej</Base>
}

export default Button
