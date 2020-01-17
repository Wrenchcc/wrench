import styled from 'styled-components'
import { NAVIGATION } from 'navigation/constants'

export const Base = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  padding-top: ${NAVIGATION.TOTAL_TOP_BAR_HEIGHT}px;
  z-index: 1000;
`
