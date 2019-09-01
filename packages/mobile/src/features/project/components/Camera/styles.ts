import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTouchable from 'ui/Touchable'

export const TakePicture = styled(UiTouchable)`
  width: 60;
  height: 60;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 60;
`

export const Wrapper = styled.View`
  bottom: 20;
  z-index: 110;
  position: absolute;
  align-self: center;
`
