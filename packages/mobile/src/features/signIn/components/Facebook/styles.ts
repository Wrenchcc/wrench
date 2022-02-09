import styled from 'styled-components'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'

export const Button = styled(Touchable)`
  width: 100%;
  background: ${(props) => props.theme.colors.facebook};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 13px;
  margin-top: 15px;
`

export const Text = styled(UiText)`
  text-align: center;
  color: ${(props) => props.theme.colors.white};
`
