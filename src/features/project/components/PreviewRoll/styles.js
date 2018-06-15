import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import FastImage from 'react-native-fast-image'
import { COLORS } from 'ui/constants'

export const Button = styled(UiTouchable)`
  border-width: 1.5;
  background: ${COLORS.WHITE};
  border-color: ${COLORS.WHITE};
`

export const Preview = styled(FastImage)`
  width: 40;
  height: 40;
`
