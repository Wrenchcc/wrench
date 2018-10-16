import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

const { width } = Dimensions.get('window')

export const Base = styled.View`
  flex: 1;
  background: ${COLORS.DARK};
`

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  margin-bottom: 5;
  overflow: hidden;
`
