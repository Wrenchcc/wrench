import styled from 'styled-components'
import UiInput from 'ui/Input'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Input = styled(UiInput)`
  flex: 1;
  border-bottom-width: 0;
  padding-right: 10;
  padding-left: 10;
  font-size: 15;
`

export const Button = styled(UiTouchable)`
  align-self: center;
`
