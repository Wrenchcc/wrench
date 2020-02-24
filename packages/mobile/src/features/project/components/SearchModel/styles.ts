import styled from 'styled-components'
import { NAVIGATION } from 'navigation/constants'

export const Base = styled.View`
  background-color: ${props => props.theme.colors.default};
  left: 0;
  position: absolute;
  right: 0;
  z-index: 1000;
  top: ${NAVIGATION.STATUS_BAR_HEIGHT};
  width: 100%;
  bottom: ${props => props.bottom}px;
`
