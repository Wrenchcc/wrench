import styled from 'styled-components'
import { hasNotch } from 'utils/platform'
import UiTouchable from 'ui/Touchable'

export const SPACER = hasNotch ? 100 : 80
export const BUTTON_HEIGHT = 70
export const ITEM_HEIGHT = 65

export const Base = styled.View`
  background-color: ${props => props.theme.colors.default};
  padding-top: ${SPACER}px;
`

export const Scroll = styled.ScrollView`
  padding-left: 20px;
  padding-right: 20px;
  max-height: ${ITEM_HEIGHT * 4}px;
`

export const NewProject = styled(UiTouchable)`
  height: ${BUTTON_HEIGHT}px;
  padding-top: 12px;
  padding-left: 20px;
  padding-right: 20px;
`
