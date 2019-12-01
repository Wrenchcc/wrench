import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

const GUTTER = 20
const BAR_SPACE = GUTTER / 2

export const Wrapper = styled(UiTouchable)`
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)};
  margin-left: ${({ first }) => (first ? GUTTER : 0)};
  height: 40;
  border-width: 1;
  border-color: ${COLORS.DIVIDER};
  justify-content: center;
  padding-left: 15;
  padding-right: 15;
`
