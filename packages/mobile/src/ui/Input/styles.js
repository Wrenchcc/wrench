import styled from 'styled-components'
import { COLORS } from 'ui/constants'
import { toUpper } from 'ramda'

export const Field = styled.TextInput`
  font-size: ${props => (props.large ? 27 : 17)};
  height: ${({ multiline }) => (multiline ? 'auto' : 60)};
  border-bottom-width: ${({ noBorder }) => (noBorder ? 0 : 1)};
  border-bottom-color: ${({ borderColor }) => borderColor ? COLORS[toUpper(borderColor)] : COLORS.DIVIDER};
  color: ${({ color }) => (color ? COLORS[toUpper(color)] : COLORS.WHITE)};
`
