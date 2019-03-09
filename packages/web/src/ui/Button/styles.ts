import styled from 'styled-components'
import { COLORS, FONTS } from '../constants'

export const Base = styled.button`
  color: ${props => (props.black ? COLORS.WHITE : COLORS.DARK)};
  background: ${props => (props.black ? COLORS.DARK : COLORS.WHITE)};
  font-weight: ${FONTS.MEDIUM};
  cursor: pointer;
  font-size: 15px;
  outline: none;
  height: 40px;
  border: solid 1px ${props => (props.black ? COLORS.DARK : COLORS.ULTRA_LIGHT_GREY)};
`
