import styled from 'styled-components'
import { NAVIGATION } from 'navigation/constants'

export const Base = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.default};
  padding-top: ${NAVIGATION.TOTAL_TOP_BAR_HEIGHT}px;
  z-index: 1000;
`

export const Header = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-between;
  flex-direction: row;
`
