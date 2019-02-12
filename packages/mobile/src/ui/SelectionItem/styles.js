import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled(UiTouchable)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  border-bottom-width: ${({ last }) => (last ? 0 : 1)};
  border-bottom-color: ${COLORS.ULTRA_LIGHT_GREY};
`

export const Text = styled(UiText)``

export const Icon = styled.Image`
  width: 6;
  height: 11;
`
