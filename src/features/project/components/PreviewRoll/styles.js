import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Button = styled(UiTouchable)``

export const Preview = styled.Image`
  width: 40;
  height: 40;
  border-width: 1.5;
  border-color: ${COLORS.WHITE};
`
