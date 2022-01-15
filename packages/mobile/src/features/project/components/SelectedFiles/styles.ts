import styled from 'styled-components'
import { Dimensions } from 'react-native'
import RNVideo from 'react-native-video'

const { width } = Dimensions.get('window')

const SIZE = 180
export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2
export const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

export const Image = styled.Image`
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)}px;
`

export const Video = styled(RNVideo)`
  width: ${SIZE}px;
  height: ${SIZE}px;
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)}px;
`
