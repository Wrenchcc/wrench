import styled from 'styled-components'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'

export const Button = styled(Touchable)`
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 13px;
  border-color: ${(props) => props.theme.colors.subtle};
  border-width: ${(props) => (props.border ? 1 : 0)}px;
`

export const Text = styled(UiText)`
  text-align: center;
`
