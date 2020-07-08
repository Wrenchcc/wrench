import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import UiImage from 'ui/Image'

const { width } = Dimensions.get('window')

export const SIZE = width
export const GUTTER = 20

export const Picture = styled(UiImage)`
  height: ${SIZE}px;
  width: ${SIZE}px;
`
