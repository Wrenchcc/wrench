import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

const { width } = Dimensions.get('window')

export const SQUARE_SIZE = width
export const GUTTER = 3
export const ITEM_SIZE = width / 4 - 4

export const Base = styled.View`
  flex: 1;
  padding-top: 5;
  background-color: ${COLORS.DARK};
`

export const Placeholder = styled.View`
  width: ${width};
  height: ${width};
  padding-bottom: ${GUTTER * 2};
`

export const Cell = styled.View`
  width: 25%;
  padding-left: ${GUTTER / 2};
  padding-right: ${GUTTER / 2};
  padding-bottom: ${GUTTER};
`

export const Image = styled.Image`
  height: ${ITEM_SIZE};
  width: ${ITEM_SIZE};
`

export const Overlay = styled.View`
  position: absolute;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${props => (props.selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent')};
`
