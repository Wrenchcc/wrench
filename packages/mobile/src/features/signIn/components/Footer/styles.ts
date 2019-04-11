import styled from 'styled-components'
import { NAVIGATION } from 'navigation'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  height: ${NAVIGATION.TOP_BAR_HEIGHT};
  background-color: ${COLORS.DARK};
  justify-content: center;
  position: absolute;
  padding: 0 20px;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
`
