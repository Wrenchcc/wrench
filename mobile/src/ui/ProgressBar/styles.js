import styled from 'styled-components'
import { animated } from 'react-spring'

export const Base = styled.View`
  overflow: hidden;
  opacity: ${props => props.opacity};
  height: ${props => props.height}px;
  background-color: ${props => props.backgroundColor};
  border-radius: ${props => props.borderRadius};
`

export const Bar = animated(styled.View`
  background-color: ${props => props.fillColor};
  height: ${props => props.height};
`)
