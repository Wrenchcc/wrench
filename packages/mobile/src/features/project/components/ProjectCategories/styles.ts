import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Image = styled(FastImage)`
  height: ${props => props.height - props.gutter / 2};
  width: ${props => props.width - props.gutter / 2};
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
  margin: ${props => `${props.gutter / 2}px`};
`

export const Picture = styled.View`
  height: ${props => props.height};
  width: ${props => props.width};
`
export const Overlay = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(000, 000, 000, 0.4);
`

export const Cell = styled.View`
  width: 50%;
`
