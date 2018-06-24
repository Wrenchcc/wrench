import styled from 'styled-components'
import { toUpper } from 'ramda'
import { FONTS, COLORS } from 'ui/constants'

export const Base = styled.Text`
  font-family: ${FONTS.MEDIUM};
  color: ${({ color }) => (color ? COLORS[toUpper(color)] : COLORS.DARK)};
  font-size: ${({ medium, large }) => (medium && 34) || (large && 48) || 21};
`
