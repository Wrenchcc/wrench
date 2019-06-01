import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  height: 50;
  margin-top: ${(hasNotch && 60) || 20}
  background-color: ${({ transparent }) => (transparent ? 'transparent' : COLORS.WHITE)};
`

export const Left = styled.View`
  flex: 1;
  align-items: flex-start;
`

export const Center = styled.View`
  flex: 2;
  align-items: center;
`

export const Right = styled.View`
  flex: 1;
  align-items: flex-end;
`
