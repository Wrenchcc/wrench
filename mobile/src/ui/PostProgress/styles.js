import { Animated } from 'react-native'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled(Animated.View)`
  background-color: ${COLORS.DIVIDER};
  width: 100%;
`

export const Cover = styled.Image`
  width: 40;
  height: 40;
  margin-right: 10;
`

export const Content = styled.View``

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: 20;
  padding-right: 20;
`
