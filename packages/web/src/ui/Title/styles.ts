import styled from 'styled-components'
import { toUpper } from 'ramda'
import { FONTS, COLORS } from '../constants'

export const Base = styled.p`
  font-weight: ${FONTS.MEDIUM};
  color: ${props => (props.color ? COLORS[toUpper(props.color)] : COLORS.DARK)};
  font-size: ${props => (props.medium && 34) || (props.large && 68) || 21}px;
  line-height: ${props => `${props.lineHeight}px` || 'auto'};
`
