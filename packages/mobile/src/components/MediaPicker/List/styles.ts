import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiTouchable from 'ui/Touchable'
import { hasNotch } from 'utils/platform'

const { width } = Dimensions.get('window')

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  margin-bottom: 5;
  overflow: hidden;
`

export const DeselectAll = styled(UiTouchable)`
  height: 40;
  background: white;
  position: absolute;
  bottom: ${hasNotch ? 25 : 20};
  right: 20;
  border-radius: 40;
  z-index: 99;
  padding-left: 20;
  padding-right: 20;
  justify-content: center;
`
