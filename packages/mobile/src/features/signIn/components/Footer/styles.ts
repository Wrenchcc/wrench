import styled from 'styled-components'
import { NAVIGATION } from 'navigation'

export const Base = styled.View`
  height: ${NAVIGATION.TAB_HEIGHT};
  background-color: ${props => props.theme.colors.default};
  justify-content: center;
  position: absolute;
  padding: 0 20px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 10;
`
