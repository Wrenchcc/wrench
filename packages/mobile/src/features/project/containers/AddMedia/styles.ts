import { Dimensions } from 'react-native'
import styled from 'styled-components'

const { width } = Dimensions.get('window')

export const Base = styled.View`
  flex: 1;
  background-color: black;
`

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  margin-bottom: 5;
  overflow: hidden;
`
