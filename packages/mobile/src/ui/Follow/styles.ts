import styled from 'styled-components'
import { toUpper } from 'ramda'
import UiTouchable from 'ui/Touchable'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  background-color: ${({ black }) => (black ? COLORS.DARK : COLORS.WHITE)};
  border-width: ${({ small }) => (small ? 0 : 1)};
  border-color: ${({ black }) => (black ? COLORS.DARK : COLORS.DIVIDER)};
  height: 40;
  justify-content: center;
  align-items: center;
  padding-left: 25;
  padding-right: 25;
  align-self: flex-start;
  margin-right: 10;
`

export const Text = styled(UiText)``
