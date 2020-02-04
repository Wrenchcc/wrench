import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { toUpper } from 'rambda'

export const Field = styled.TextInput`
  font-size: ${props => (props.large ? 27 : 17)}px;
  height: ${({ multiline, height }) => (multiline ? 'auto' : `${height || 60}px`)};
  padding-bottom: ${({ multiline }) => (multiline ? 20 : 0)}px;
  border-bottom-width: ${({ noBorder }) => (noBorder ? 0 : 1)}px;
  border-bottom-color: ${({ borderColor }) =>
    borderColor ? COLORS[toUpper(borderColor)] : COLORS.ULTRA_LIGHT_GREY};
  color: ${({ color }) => (color ? COLORS[toUpper(color)] : COLORS.WHITE)};
`
