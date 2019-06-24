import styled from 'styled-components'
import { hasNotch } from 'utils/platform'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const SPACER = hasNotch ? 100 : 80
export const BUTTON_HEIGHT = 70
export const ITEM_HEIGHT = 65

export const Base = styled.View`
  background-color: ${COLORS.WHITE};
  padding-top: ${SPACER};
`

export const Scroll = styled.ScrollView`
  padding-left: 20;
  padding-right: 20;
  max-height: ${ITEM_HEIGHT * 4};
`

export const NewProject = styled(UiTouchable)`
  height: ${BUTTON_HEIGHT};
  padding-top: 20;
  padding-left: 20;
  padding-right: 20;
`
