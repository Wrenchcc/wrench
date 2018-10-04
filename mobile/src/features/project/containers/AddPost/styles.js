import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

const { width } = Dimensions.get('window')

export const Base = styled.View`
  flex: 1;
  background: ${COLORS.DARK};
  padding-top: ${HEADER_HEIGHT};
`

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  background: #222;
  margin-bottom: 5;
  overflow: hidden;
`
