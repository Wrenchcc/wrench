import styled from 'styled-components'
import Animated from 'react-native-reanimated'
import { NAVIGATION } from '../../constants'

export const Base = styled(Animated.View)`
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10000;
  transform: ${(props) => props.transform};
  position: absolute;
`

export const Background = styled.View`
  z-index: 10;
  background-color: ${(props) => props.theme.colors.default};
  z-index: 1000;
`
export const Content = styled(Animated.View)`
  background-color: ${(props) => props.theme.colors.default};
  margin-top: ${NAVIGATION.STATUS_BAR_HEIGHT}px;
`

export const Inner = styled.View`
  align-items: center;
  flex-direction: row;
  height: ${NAVIGATION.TOP_BAR_HEIGHT}px;
  justify-content: space-between;
  padding-horizontal: 20px;
`
