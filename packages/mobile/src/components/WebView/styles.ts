import styled from 'styled-components'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  flex: 1;
  padding-bottom: ${hasNotch ? 80 : 60}px;
`

export const Footer = styled.View`
  height: ${hasNotch ? 80 : 60}px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  align-items: center;
  flex-direction: row;
  background-color: white;
`

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
`
