import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { isIphoneX } from 'utils/platform'

// NOTE: -bottom hack to hide backgorund when spring animation (extra padding)
export const Base = styled.View`
  padding: 20px 20px ${isIphoneX ? 70 : 40}px;
  position: absolute;
  bottom: -20;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
