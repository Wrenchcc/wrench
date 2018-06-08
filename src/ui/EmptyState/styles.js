import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'

// TODO: Use flex on contentContainerStyle when 0.56 is released
// https://github.com/Brewskey/Brewskey.App/issues/166
const { height } = Dimensions.get('window')

export const Base = styled.View`
  height: ${height - 280};
  background-color: ${COLORS.DIVIDER};
  justify-content: center;
  padding-left: 20;
  padding-right: 20;
`

export const Title = styled(UiTitle)`
  margin-bottom: 10;
`

export const Description = styled(UiText)`
  margin-bottom: 30;
`

export const Button = styled(UiTouchable)`
  height: 40;
  background-color: ${COLORS.WHITE};
  align-items: center;
  justify-content: center;
`
