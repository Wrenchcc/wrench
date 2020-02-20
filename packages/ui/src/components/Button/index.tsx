import React from 'react'
import styled from 'styled-components'
// import { variant } from 'styled-system'

const Base = styled.button`
  background-color: ${props => console.log(props.theme.color.default) || props.theme.color.default};
  color: ${props => props.theme.color.inverse};
`

function ButtonPrimary() {
  return <Base>Hej</Base>
}

export default ButtonPrimary
