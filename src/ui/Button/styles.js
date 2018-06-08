import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  background-color: ${COLORS.DARK};
  height: 60;
  justify-content: center;
  align-items: center;
`

export const Text = styled(UiText)``
