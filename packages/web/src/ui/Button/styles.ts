import styled from 'styled-components'
import { COLORS, FONTS } from '../constants'

export const Base = styled.button`
  font-weight: ${FONTS.MEDIUM};
  cursor: pointer;
  font-size: 15px;
  outline: none;
  height: 40px;
  border: solid 1px ${COLORS.ULTRA_LIGHT_GREY};
`
