import styled from 'styled-components'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'
import { isIphoneX } from 'utils/platform'

export const Base = styled.View`
  height: ${HEADER_HEIGHT};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  padding-top: ${(isIphoneX && 40) || 20}
  background-color: ${({ transparent }) => (transparent ? 'transparent' : COLORS.WHITE)};
`

export const Left = styled.View`
  flex: 1;
  align-items: flex-start;
`

export const Center = styled.View`
  flex: 2;
`

export const Right = styled.View`
  flex: 1;
  align-items: flex-end;
`
