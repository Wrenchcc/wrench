import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  flex: 1;
  margin-left: auto;
  justify-content: flex-end;
`

export const Button = styled(UiTouchable)`
  align-self: flex-start;
`

export const Icon = styled.View`
  align-self: flex-start;
  width: 20px;
`
