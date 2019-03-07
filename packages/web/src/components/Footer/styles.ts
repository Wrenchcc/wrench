import styled from 'styled-components'
import { COLORS } from '../../ui/constants'

export const Base = styled.footer`
  height: 450px;
  background: white;
`

export const Inner = styled.div`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  height: 100%;
`

export const Bottom = styled.div`
  width: 100%;
  align-self: flex-end;
  padding-bottom: 75px;
  padding-top: 35px;
  border-top: 1px solid ${COLORS.ULTRA_LIGHT_GREY};
`
