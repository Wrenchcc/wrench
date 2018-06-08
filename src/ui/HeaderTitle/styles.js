import styled from 'styled-components'
import { Animated } from 'react-native'
import UiTouchable from 'ui/Touchable'

import { FONTS, COLORS } from 'ui/constants'

export const Base = styled(Animated.Text)`
  font-family: ${FONTS.MEDIUM};
  color: ${COLORS.DARK};
  font-size: 17;
`

export const Touchable = styled(UiTouchable)`
  flex: 1;
  justify-content: center;
  align-items: center;
`
