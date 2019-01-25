import styled from 'styled-components'

export const Image = styled.ImageBackground`
  margin: ${props => `${props.gutter / 2}px`}
  height: ${props => props.size}
  width: ${props => props.size}
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
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
