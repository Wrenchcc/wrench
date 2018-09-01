import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

const { width } = Dimensions.get('window')

export const GUTTER = 5
export const ITEM_SIZE = width / 2 - 15

export const Base = styled.TouchableOpacity`
  padding-top: ${props => (props.paddingTop ? HEADER_HEIGHT : 0)};
  flex: 1;
  background-color: ${COLORS.DARK};
`

export const Cell = styled.View`
  width: 50%;
`

export const Image = styled.Image`
  margin: ${GUTTER}px;
  height: ${ITEM_SIZE};
  width: ${ITEM_SIZE};
  border-color: ${props => (props.selected ? COLORS.WHITE : 'transparent')};
  border-width: 3px;
`

export const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => (props.selected ? 'rgba(000, 000, 000, 0.2)' : 'transparent')};
`
