import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { isNotchIPhone } from 'utils/platform'

export const Base = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  height: 50;
  margin-top: ${(isNotchIPhone && 60) || 20}
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
