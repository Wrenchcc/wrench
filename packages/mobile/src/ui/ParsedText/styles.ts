import styled from 'styled-components'
import { FONTS } from 'ui/constants'
import ParsedText from './ParsedText'

export const Base = styled(ParsedText)`
  font-family: ${({ bold, medium }) =>
    (bold && FONTS.BOLD) || (medium ? FONTS.MEDIUM : FONTS.REGULAR)};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  color: ${(props) => props.theme.colors[props.color] || props.theme.colors.inverse};
  font-size: ${({ fontSize }) => fontSize || 17}px;
  text-decoration-line: ${({ underline }) => (underline ? 'underline' : 'none')};
  opacity: ${({ opacity }) => opacity || 1};
`
