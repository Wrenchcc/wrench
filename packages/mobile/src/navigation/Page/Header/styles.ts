import styled from 'styled-components'
import Animated from 'react-native-reanimated'
import { NAVIGATION } from '../../constants'

export const Base = styled(Animated.View)`
  background-color: white;
  left: 0;
  position: ${props => (props.inline ? 'relative' : 'absolute')};
  right: 0;
  top: 0;
  width: 100%;
  z-index: 10000;
`

export const Inner = styled(Animated.View)`
  align-items: center;
  flex-direction: row;
  height: ${NAVIGATION.TOP_BAR_HEIGHT}px;
  justify-content: space-between;
  padding-horizontal: 20px;
`

export const Left = styled.View`
  align-items: flex-start;
  flex: 2;
`

export const Right = styled.View`
  align-items: flex-end;
  flex: 2;
`
