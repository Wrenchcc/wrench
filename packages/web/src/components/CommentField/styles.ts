// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.div`
  margin-top: 20px;
`

export const Button = styled.button`
  align-self: center;
`

export const Inner = styled.div`
  flex-direction: row;
  align-items: center;
  display: flex;
  width: 100%;
`

export const Input = styled.input`
  border: 0;
  width: 100%;
  outline: none;
  font-size: 16px;
  color: ${COLORS.DARK};
  margin-bottom: 10px;
  margin-left: 10px;
  display: flex;
  padding-top: 6px;

  &::-webkit-input-placeholder {
    color: ${COLORS.LIGHT_GREY};
  }
`
