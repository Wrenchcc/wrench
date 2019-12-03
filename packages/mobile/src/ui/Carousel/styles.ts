import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiImage from 'ui/Image'

const { width } = Dimensions.get('window')

export const SIZE = width
export const GUTTER = 20

export const Wrapper = styled.View``

export const Picture = styled(UiImage)`
  height: ${SIZE};
  width: ${SIZE};
`
