import styled from 'styled-components'
import ParsedText from 'react-native-parsed-text'
import { FONTS, COLORS } from 'ui/constants'
import { toUpper } from 'ramda'

export const Base = styled(ParsedText)`
  font-family: ${props =>
    (props.bold && FONTS.BOLD) || (props.medium ? FONTS.MEDIUM : FONTS.REGULAR)};
  text-align: ${props => (props.center ? 'center' : 'left')};
  color: ${props => (props.color ? COLORS[toUpper(props.color)] : COLORS.DARK)};
  font-size: ${props => props.fontSize || 17};
  ${props => props.lineHeight && `line-height: ${props.lineHeight}`};
  text-decoration-line: ${props => (props.underline ? 'underline' : 'none')};
  opacity: ${props => props.opacity || 1};
`
