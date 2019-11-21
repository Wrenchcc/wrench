import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.input`
  width: 100%;
  background: none;
  border: none;
  height: 60px;
  border-bottom: 1px solid rgb(230, 231, 233);
  font-size: 17px;
  outline: none;
  color: ${COLORS.DARK};

  &::placeholder {
    color: ${COLORS.LIGHT_GREY};
  }
`
