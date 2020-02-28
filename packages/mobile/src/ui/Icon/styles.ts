import styled from 'styled-components'

export const Base = styled.Image`
  opacity: ${props => props.opacity};
  tint-color: ${props => props.theme.colors[props.color] || props.theme.colors.inverse};
  ${props => props.width && { width: props.width }}
  ${props => props.height && { height: props.height }}
`
