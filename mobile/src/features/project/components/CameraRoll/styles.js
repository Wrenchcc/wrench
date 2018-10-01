import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS, HEADER_HEIGHT } from 'ui/constants'

const { width } = Dimensions.get('window')

export const GUTTER = 5
export const ITEM_SIZE = width / 4 - 15

export const Base = styled.View`
  padding-top: ${HEADER_HEIGHT};
  background-color: ${COLORS.DARK};
`

export const Placeholder = styled.Image`
  width: ${width};
  height: ${width};
`

export const Cell = styled.View`
  width: 25%;
`

export const Image = styled.Image`
  margin-left: ${GUTTER / 2};
  margin-right: ${GUTTER / 2};
  margin-bottom: ${GUTTER * 2};
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
