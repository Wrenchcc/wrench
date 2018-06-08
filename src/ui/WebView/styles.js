import styled from 'styled-components'
import isIphoneX from 'utils/isIphoneX'

export const Base = styled.View`
  flex: 1;
`

export const Footer = styled.View`
  height: ${isIphoneX() ? 80 : 60};
  padding-left: 20;
  padding-right: 20;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  align-items: center;
  flex-direction: row;
  background-color: white;
`

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
`
