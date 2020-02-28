import styled from 'styled-components'

export const Field = styled.TextInput`
  font-size: ${props => (props.large ? 27 : 17)}px;
  height: ${({ multiline, height }) => (multiline ? 'auto' : `${height || 60}px`)};
  padding-bottom: ${({ multiline }) => (multiline ? 20 : 0)}px;
  border-bottom-width: ${({ noBorder }) => (noBorder ? 0 : 1)}px;
  border-bottom-color: ${props =>
    props.error
      ? props.theme.colors.error
      : props.theme.colors[props.color] || props.theme.colors.divider};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.inverse};
`
