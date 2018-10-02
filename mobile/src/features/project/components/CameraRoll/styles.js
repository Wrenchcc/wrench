import { Dimensions } from 'react-native'
import styled from 'styled-components'

const { width } = Dimensions.get('window')

export const GUTTER = 3
export const COLUMNS = 4

const ITEM_SIZE = width / COLUMNS - 4

export const Item = styled.View`
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
