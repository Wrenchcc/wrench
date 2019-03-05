import styled, { keyframes } from 'styled-components'
import { COLORS } from '../constants'

const bounce = keyframes`
  0% { opacity: 1; }
	33% { opacity: 0.25; }
	66% { opacity: 0.25; }
	100% { opacity: 1; }
`

export const Base = styled.div`
  text-align: center;
  max-width: 650px;
  margin-bottom: 50px;

  > div {
    width: 8px;
    height: 8px;
    background-color: ${COLORS.DARK_GREY};
    margin: 0 4px;
    border-radius: 100%;
    display: inline-block;
    animation-name: ${bounce};
    animation-duration: 0.9s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-fill-mode: both;
  }
`
export const Bounce1 = styled.div`
  animation-delay: -0.32s;
`

export const Bounce2 = styled.div`
  animation-delay: -0.16s;
`

export const Bounce3 = styled.div`
  animation-delay: -0.16s;
`
