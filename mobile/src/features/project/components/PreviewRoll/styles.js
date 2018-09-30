import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex: 1;
  margin-left: auto;
  justify-content: flex-end;
`

export const Button = styled(UiTouchable)`
  align-self: flex-start;
`

export const Preview = styled.Image`
  width: 40;
  height: 40;
  border-width: 1.5;
  border-color: ${COLORS.WHITE};
`

export const Icon = styled.Image``
