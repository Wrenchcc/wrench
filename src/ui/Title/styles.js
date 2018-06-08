import styled from 'styled-components'
import { toUpper } from 'ramda'
import { FONTS, COLORS } from 'ui/constants'

export const Base = styled.Text`
  font-family: ${FONTS.MEDIUM};
  color: ${props => (props.color ? COLORS[toUpper(props.color)] : COLORS.DARK)};
  font-size: ${props => (props.medium && 34) || (props.large && 48) || 21};
`
