import styled from 'styled-components'

export const Image = styled.ImageBackground`
  margin: ${props => `${props.gutter / 2}px`}
  height: ${props => props.size}
  width: ${props => props.size}
  flex: 1;
  justify-content: flex-end;
  padding: 10px;
`

export const Cell = styled.View`
  width: 50%;
`
