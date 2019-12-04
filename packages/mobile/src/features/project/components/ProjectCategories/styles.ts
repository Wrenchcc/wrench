import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Image = styled(FastImage)`
  height: ${props => props.height - props.gutter / 2}px;
  width: ${props => props.width - props.gutter / 2}px;
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
  margin: ${props => props.gutter / 2}px;
`

export const Picture = styled.View`
  height: ${props => props.height}px;
  width: ${props => props.width}px;
`
export const Overlay = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  background-color: rgba(000, 000, 000, 0.4);
`

export const Cell = styled.View`
  width: 50%;
`
