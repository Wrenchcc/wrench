import styled from 'styled-components'
import { NAVIGATION } from 'navigation/constants'

export const Background = styled.View`
  z-index: 10;
  background-color: ${({ color, theme }) => (color ? color : theme.colors.default)};
`

export const Base = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  margin-top: ${NAVIGATION.STATUS_BAR_HEIGHT}px;
  height: ${NAVIGATION.TOP_BAR_HEIGHT}px;
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
