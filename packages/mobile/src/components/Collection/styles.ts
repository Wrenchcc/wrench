import styled from 'styled-components/native'
import UiText from 'ui/Text'
import Touchable from 'ui/Touchable'

export const Base = styled(Touchable)`
  width: 60px;
`

export const Text = styled(UiText)`
  margin-top: 8px;
`

export const Placeholder = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  background-color: ${(props) => props.placeholderColor || props.theme.colors.placeholder};
`
