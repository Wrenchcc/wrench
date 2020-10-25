// @ts-nocheck
import styled from 'styled-components'

export const Base = styled.div`
  opacity: ${props => props.opacity};
  transition: fill 0.25s;

  svg {
    ${props => props.width && { width: props.width }}
    ${props => props.height && { height: props.height }}
  }

  rect {
    stroke: ${props => props.theme.colors[props.stroke] || props.theme.colors.inverse};
  }

  path {
    stroke: ${props => props.theme.colors[props.stroke] || props.theme.colors.inverse};
    fill: ${props =>
      props.noFill ? 'transparent' : props.theme.colors[props.color] || props.theme.colors.inverse};
  }
`
