import styled from 'styled-components'
import { COLORS } from '../constants'

export const Input = styled.input`
  width: 70%;
  border: 0;
  outline: none;
  font-size: 17px;
  color: ${COLORS.BLACK};
  padding: 10px 0 20px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid ${COLORS.ULTRA_LIGHT_GREY};

  &::-webkit-input-placeholder {
    color: ${COLORS.LIGHT_GREY};
  }
`
