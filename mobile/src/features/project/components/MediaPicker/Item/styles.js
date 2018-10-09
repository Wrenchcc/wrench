import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Marker = styled.View`
  width: 24;
  height: 24;
  position: absolute;
  right: 5;
  top: 5;
  border-radius: 24;
  background-color: ${props => (props.selected ? COLORS.WHITE : 'rgba(255, 255, 255, 0.25)')};
  border-style: solid;
  border-width: 1.5;
  border-color: #ffffff;
  z-index: 10;
  justify-content: center;
  align-items: center;
`
