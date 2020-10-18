import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Hero = styled.section`
  width: 100%;
  height: calc(100vh);
  background: black;
  overflow: hidden;
  position: relative;

  @media ${DEVICE.TABLET} {
    height: auto;
  }

  &:before {
    position: absolute;
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    background: black;
  }
`
