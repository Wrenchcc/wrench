import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiCollection from 'components/Collection'

export const { width } = Dimensions.get('window')

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2

export const Collection = styled(UiCollection)`
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)}px;
`
