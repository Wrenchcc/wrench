import styled from 'styled-components'

export const Base = styled.Image`
  opacity: ${props => props.opacity};
  tint-color: ${props => props.theme.colors[props.color] || props.theme.colors.inverse};
  ${props => props.theme.width && { width: props.theme.width }}
  ${props => props.theme.height && { height: props.theme.height }}
`
