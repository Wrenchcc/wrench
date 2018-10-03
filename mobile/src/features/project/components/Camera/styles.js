import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const TakePicture = styled(UiTouchable)`
  justify-content: center;
  align-self: center;
  width: 60;
  height: 60;
  border-width: 3;
  border-color: ${COLORS.WHITE};
  border-radius: 60;
`
