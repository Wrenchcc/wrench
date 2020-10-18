import styled from 'styled-components'
import { Touchable } from 'ui'
import { NAVIGATION } from 'navigation/constants'

export const BackButton = styled(Touchable)`
  z-index: 1000;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  position: absolute;
  top: ${NAVIGATION.STATUS_BAR_HEIGHT + 20}px;
  left: 10px;
  background: ${props => props.theme.colors.default};
  justify-content: center;
  align-items: center;
`

export const Item = styled(Touchable)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-bottom: 5px;
  margin-left: 0;
  margin-right: 5px;
`
