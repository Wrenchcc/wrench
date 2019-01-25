import styled from 'styled-components'
import ParsedText from 'react-native-parsed-text'
import { FONTS, COLORS } from 'ui/constants'
import { toUpper } from 'ramda'

export const Base = styled(ParsedText)`
  font-family: ${({ bold, medium }) => (bold && FONTS.BOLD) || (medium ? FONTS.MEDIUM : FONTS.REGULAR)};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${({ color }) => (color ? COLORS[toUpper(color)] : COLORS.DARK)};
  font-size: ${({ fontSize }) => fontSize || 17};
  text-decoration-line: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ opacity }) => opacity || 1};
`
