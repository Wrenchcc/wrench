import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiCard from 'ui/Card'

export const { width } = Dimensions.get('window')

export const GUTTER = 20
export const BAR_SPACE = GUTTER / 2
export const SNAP_INTERVAL = width - (GUTTER + BAR_SPACE)

// TODO: Fix margins
// margin-left: ${({ first }) => (first ? GUTTER : 0)};
export const Card = styled(UiCard)`
  margin-right: ${({ last }) => (last ? GUTTER : BAR_SPACE)};
`

export const Header = styled.View`
  margin-bottom: 40;
  margin-top: 20;
`

export const Footer = styled.View`
  margin-bottom: 40;
  margin-top: 50;
`
