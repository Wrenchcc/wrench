import styled from 'styled-components'
import { FONTS, COLORS } from 'ui/constants'
import { toUpper } from 'ramda'
import ParsedText from './ParsedText'

export const Base = styled(ParsedText)`
  font-family: ${({ bold, medium }) =>
    (bold && FONTS.BOLD) || (medium ? FONTS.MEDIUM : FONTS.REGULAR)};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ color }) => (color ? COLORS[toUpper(color)] : COLORS.DARK)};
  font-size: ${({ fontSize }) => fontSize || 17}px;
  text-decoration-line: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ opacity }) => opacity || 1};
`
