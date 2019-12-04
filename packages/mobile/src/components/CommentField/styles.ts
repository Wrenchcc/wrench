import styled from 'styled-components'
import UiInput from 'ui/Input'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View``

export const Inner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Input = styled(UiInput)`
  flex: 1;
  border-bottom-width: 0px;
  padding-right: 10px;
  padding-left: 10px;
  font-size: 15px;
`

export const Button = styled(UiTouchable)`
  align-self: center;
`
