import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTouchable from 'ui/Touchable'

export const TakePicture = styled(UiTouchable)`
  width: 60px;
  height: 60px;
  border-width: 3px;
  border-color: ${COLORS.WHITE};
  border-radius: 60px;
`

export const Wrapper = styled.View`
  bottom: 20px;
  z-index: 110;
  position: absolute;
  align-self: center;
`
