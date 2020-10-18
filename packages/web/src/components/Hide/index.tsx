// @ts-nocheck
import React from 'react'
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

const Base = styled.div`
  @media ${(props) => DEVICE[props.on.toUpperCase()]} {
    display: none;
  }
`

function Hide({ children, on }) {
  return <Base on={on}>{children}</Base>
}

export default Hide
