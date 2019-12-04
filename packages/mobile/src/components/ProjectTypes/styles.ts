import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

const GUTTER = 20
const BAR_SPACE = GUTTER / 2

export const Wrapper = styled(UiTouchable)`
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)}px;
  margin-left: ${({ first }) => (first ? GUTTER : 0)}px;
  height: 40px;
  border-width: 1px;
  border-color: ${COLORS.DIVIDER};
  justify-content: center;
  padding-left: 15px;
  padding-right: 15px;
`
