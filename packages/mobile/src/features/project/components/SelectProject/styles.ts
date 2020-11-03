import styled from 'styled-components/native'
import { NAVIGATION } from 'navigation/constants'

export const Base = styled.View`
  align-self: center;
  align-items: center;
  justify-content: center;
  top: ${NAVIGATION.STATUS_BAR_HEIGHT + 10}px;
  z-index: 100;
  width: 45%;
  position: absolute;
`
