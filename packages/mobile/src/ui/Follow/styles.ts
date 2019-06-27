import styled from 'styled-components'
import { toUpper } from 'ramda'
import UiTouchable from 'ui/Touchable'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  background-color: ${({ black }) => (black ? COLORS.WHITE : COLORS.DARK)};
  border-width: 1;
  border-color: ${({ black }) => (black ? COLORS.DIVIDER : COLORS.DARK)};
  height: 40;
  justify-content: center;
  align-items: center;
  padding-left: 25;
  padding-right: 25;
  align-self: flex-start;
`

export const Text = styled(UiText)``
