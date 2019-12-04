import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  background-color: ${({ black }) => (black ? COLORS.DARK : COLORS.WHITE)};
  border-width: ${({ small }) => (small ? 0 : 1)}px;
  border-color: ${({ black }) => (black ? COLORS.DARK : COLORS.DIVIDER)};
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 25px;
  padding-right: 25px;
  align-self: flex-start;
  margin-right: 10px;
`

export const Text = styled(UiText)``
