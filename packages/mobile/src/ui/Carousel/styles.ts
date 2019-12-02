import styled from 'styled-components'
import { Dimensions } from 'react-native'
import UiImage from 'ui/Image'

const { width } = Dimensions.get('window')

export const GUTTER = 20
export const SIZE = width

export const Wrapper = styled.View``

export const DotBase = styled.View`
  position: absolute;
  z-index: 100;
  bottom: 20;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

export const Dot = styled.View`
  width: 10;
  height: 10;
  border-radius: 10;
  border-width: 1.5;
  border-color: white;
  margin-left: 3.5;
  margin-right: 3.5;
  background: ${props => (props.active ? 'white' : 'transparent')};
`

export const Picture = styled(UiImage)`
  height: ${SIZE};
  width: ${SIZE};
`
