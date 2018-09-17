import styled from 'styled-components'
import { Animated } from 'react-native'
import { COLORS } from 'ui/constants'

export const Base = styled(Animated.View)`
  background-color: ${COLORS.DIVIDER};
  height: 60;

  flex-direction: row;
  align-items: center;
  padding-left: 20;
  padding-right: 20;
  padding-top: 10;
  padding-bottom: 10;
`

export const Cover = styled.Image`
  width: 40;
  height: 40;
  margin-right: 10;
`

export const Content = styled.View``
