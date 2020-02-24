import styled from 'styled-components'
import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window')

const PADDING_TOP = 20

export const Base = styled.View`
  height: ${props => props.height + PADDING_TOP * 2}px;
  min-height: ${height};
  background-color: ${props => props.theme.colors.default};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: ${PADDING_TOP}px;
`

export const Bar = styled.View`
  width: 60px;
  height: 5px;
  background-color: ${props => props.theme.colors.subtle};
  border-radius: 5px;
  align-self: center;
  margin-bottom: ${PADDING_TOP}px;
`
