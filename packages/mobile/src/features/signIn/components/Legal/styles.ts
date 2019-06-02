import styled from 'styled-components'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  margin-top: 15;
`

export const Text = styled(UiText)`
  color: ${COLORS.WHITE};
  opacity: 0.8;
  font-size: 12;
`

export const Link = styled(UiTouchable)`
  margin-top: -2px;
`
