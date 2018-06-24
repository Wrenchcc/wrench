import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiImage from 'ui/Image'

export const { width } = Dimensions.get('window')

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

export const Wrapper = styled.ScrollView`
  overflow: visible;
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)};
  margin-left: ${({ first }) => (first ? GUTTER : 0)};
`

export const Picture = styled(UiImage)`
  height: 275;
  width: ${width - GUTTER * 2};
`
