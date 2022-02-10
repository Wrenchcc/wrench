import styled from 'styled-components/native'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'
import { ThemeInterface } from 'ui/types'

type BaseProps = {
  theme: ThemeInterface
}
export const Base = styled.View<BaseProps>`
  flex: 1;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const Title = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Description = styled(UiText)`
  margin-bottom: 30px;
`

export const Button = styled(UiTouchable)`
  height: 40px;
  background-color: ${(props) => props.theme.colors.white};
  align-items: center;
  justify-content: center;
`
