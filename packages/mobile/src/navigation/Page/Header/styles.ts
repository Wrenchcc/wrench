import styled from 'styled-components'
import Animated from 'react-native-reanimated'
import { NAVIGATION } from '../../constants'

export const Base = styled(Animated.View)`
  background-color: ${(props) => props.theme.colors.default};
  left: 0;
  position: ${(props) => (props.inline ? 'relative' : 'absolute')};
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10000;
`

export const Inner = styled(Animated.View)`
  align-items: center;
  flex-direction: row;
  height: ${NAVIGATION.TOP_BAR_HEIGHT}px;
  margin-top: ${NAVIGATION.STATUS_BAR_HEIGHT}px;
  justify-content: space-between;
  padding-horizontal: 20px;
`
