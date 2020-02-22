import styled from 'styled-components'

export const Base = styled.View`
  border-radius: ${({ borderRadius }) => borderRadius || 0}px;
  background-color: ${props =>
    props.placeholderColor || props.theme.mode === 'light'
      ? props.theme.colors.subtle
      : props.theme.colors.neutral};
  overflow: hidden;
`
