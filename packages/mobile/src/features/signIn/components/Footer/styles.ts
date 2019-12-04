import styled from 'styled-components'
import { NAVIGATION } from 'navigation'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  height: ${NAVIGATION.TAB_HEIGHT};
  background-color: ${COLORS.DARK};
  justify-content: center;
  position: absolute;
  padding: 0 20px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  z-index: 10;
`
