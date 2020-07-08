import styled from 'styled-components'
import FastImage from 'react-native-fast-image'

export const Image = styled(FastImage)`
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
  margin: ${(props) => props.gutter / 2}px;
  background: transparent;
  border-width: 3px;
  border-color: ${(props) => (props.selected ? props.theme.colors.inverse : 'transparent')};
  height: ${(props) => props.height - props.gutter / 2}px;
  width: ${(props) => props.width - props.gutter / 2}px;
`

export const Picture = styled.View`
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
`

export const Cell = styled.View`
  width: 50%;
`
