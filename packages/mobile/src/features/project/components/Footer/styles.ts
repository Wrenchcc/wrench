import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  padding-left: 20;
  padding-right: 20;
  height: 60;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${COLORS.WHITE};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`
