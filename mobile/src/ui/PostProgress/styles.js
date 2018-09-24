import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  background-color: ${COLORS.DIVIDER};
  position: absolute;
  height: 60;
  width: 100%;
  left: 0;
  right: 0;
  flex-direction: row;
  align-items: center;
  padding-left: 20;
  padding-right: 20;
  padding-top: 10;
  padding-bottom: 10;
  z-index: 100;
`

export const Cover = styled.Image`
  width: 40;
  height: 40;
  margin-right: 10;
`

export const Content = styled.View``
