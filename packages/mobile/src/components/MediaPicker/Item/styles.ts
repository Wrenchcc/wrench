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
  border-color: ${COLORS.WHITE};
  z-index: 10;
  justify-content: center;
  align-items: center;
`

export const Overlay = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${props => (props.selected ? 'rgba(000, 000, 000, 0.25)' : 'transparent')};
`
