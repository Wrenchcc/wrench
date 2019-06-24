import { Dimensions } from 'react-native'
import styled from 'styled-components'

const { width } = Dimensions.get('window')

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  margin-bottom: 5;
  overflow: hidden;
`
