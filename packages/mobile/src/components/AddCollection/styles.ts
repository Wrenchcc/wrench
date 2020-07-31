import styled from 'styled-components'
import UiText from 'ui/Text'
import UiInput from 'ui/Input'

export const Base = styled.View`
  width: 60px;
  height: 60px;
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.divider};
  border-radius: 60px;
`

export const Input = styled(UiInput)`
  flex: 1;
`

export const Inner = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Center = styled.View`
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
`

export const Text = styled(UiText)`
  margin-top: 8px;
`

export const Content = styled.View`
  margin-top: 20px;
`
