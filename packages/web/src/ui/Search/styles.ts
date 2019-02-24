import styled from 'styled-components'
import { COLORS } from '../constants'

export const Base = styled.div`
  position: relative;
`

export const Field = styled.input`
  background: ${COLORS.ULTRA_LIGHT_GREY};
  border: none;
  height: 40px;
  outline: none;
  padding: 0 20px 0 40px;
  color: ${COLORS.GREY};
  font-size: 17px;
  width: 290px;
`

export const Icon = styled.img`
  position: absolute;
  left: 15px;
  top: 13px;
`
