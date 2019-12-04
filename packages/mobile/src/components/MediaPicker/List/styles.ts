import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiTouchable from 'ui/Touchable'
import { hasNotch } from 'utils/platform'

const { width } = Dimensions.get('window')

export const Placeholder = styled.View`
  width: ${width}px;
  height: ${width}px;
  margin-bottom: 5px;
  overflow: hidden;
`

export const DeselectAll = styled(UiTouchable)`
  height: 40px;
  background: white;
  position: absolute;
  bottom: ${hasNotch ? 25 : 20}px;
  right: 20px;
  border-radius: 40px;
  z-index: 99;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`
