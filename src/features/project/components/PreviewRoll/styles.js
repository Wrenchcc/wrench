import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiImage from 'ui/Image'
import { COLORS } from 'ui/constants'

export const Button = styled(UiTouchable)`
  border-width: 1.5;
  background: ${COLORS.WHITE};
  border-color: ${COLORS.WHITE};
`

export const Preview = styled(UiImage)`
  width: 40;
  height: 40;
`
