import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { NAVIGATION } from 'navigation/constants'

export const Base = styled.View`
  flex: 1;
`

export const Center = styled.View`
  flex: 1;
`

export const Header = styled.View`
  z-index: 10;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 20px;
  margin-top: ${NAVIGATION.STATUS_BAR_HEIGHT}px;
  height: ${NAVIGATION.TOP_BAR_HEIGHT}px;
  background-color: ${props => props.theme.colors.default};
`
