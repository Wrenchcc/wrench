import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  background-color: ${COLORS.ULTRA_LIGHT_GREY};
  opacity: 0.96;
  width: 100%;
  height: 60px;
`

export const Cover = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`
