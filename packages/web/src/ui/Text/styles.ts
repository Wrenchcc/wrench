import styled from 'styled-components'
import { toUpper } from 'ramda'
import ParsedText from '../ParsedText'
import { FONTS, COLORS } from '../constants'

export const Base = styled(ParsedText)`
  font-weight: ${props => (props.bold && FONTS.BOLD) || (props.medium ? FONTS.MEDIUM : FONTS.REGULAR)};
  text-align: ${props => (props.center ? 'center' : 'left')};
  color: ${props => (props.color ? COLORS[toUpper(props.color)] : COLORS.DARK)};
  line-height: ${props => props.lineHeight || 25}px;
  font-size: ${props => props.fontSize || 16}px;
  text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  opacity: ${props => props.opacity || 1};
`
