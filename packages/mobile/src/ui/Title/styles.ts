import styled from 'styled-components'
import { FONTS } from 'ui/constants'

export const Base = styled.Text`
  font-family: ${FONTS.MEDIUM};
  color: ${props => props.theme.colors[props.color] || props.theme.colors.inverse};
  font-size: ${({ medium, large }) => (medium && 36) || (large && 48) || 21}px;
`
