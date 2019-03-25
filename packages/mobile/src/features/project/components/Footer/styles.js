import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { isNotchIPhone } from 'utils/platform'

export const Base = styled.View`
  padding: 0 20px 20px 20px;
  padding-bottom: ${isNotchIPhone ? 40 : 0};
  height: ${isNotchIPhone ? 100 : 60};
  position: absolute;
  bottom: ${isNotchIPhone ? -20 : 0};
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
