import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  flex: 1;
  background-color: ${props =>
    props.theme.mode === 'light' ? props.theme.colors.subtle : '#131313'};
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
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
  background-color: ${COLORS.WHITE};
  align-items: center;
  justify-content: center;
`
