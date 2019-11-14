import styled from 'styled-components'

export const Hero = styled.section`
  width: 100%;
  height: calc(100vh);
  background: black;
  overflow: hidden;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    background: black;
  }
`
