import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import UiTitle from 'ui/Title'
import UiText from 'ui/Text'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  flex: 1;
  background-color: ${COLORS.ULTRA_LIGHT_GREY};
  justify-content: center;
  padding-left: 20;
  padding-right: 20;
  padding-top: 20;
  padding-bottom: 20;
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
