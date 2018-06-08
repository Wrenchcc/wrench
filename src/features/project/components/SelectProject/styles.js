import styled from 'styled-components'
import isIphoneX from 'utils/isIphoneX'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const SPACER = isIphoneX ? 100 : 60
export const BUTTON_HEIGHT = 60

export const Base = styled.View`
  background-color: ${COLORS.WHITE};
  padding-top: ${SPACER};
  padding-left: 20;
  padding-right: 20;
`

export const NewProject = styled(UiTouchable)`
  height: ${BUTTON_HEIGHT};
  padding-top: 10;
`
