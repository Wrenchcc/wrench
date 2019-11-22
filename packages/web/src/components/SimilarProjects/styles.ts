import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Inner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  @media ${DEVICE.TABLET} {
    height: 100%;
    width: 100%;
  }
`

export const Scroll = styled.div`
  overflow-y: scroll;
  margin-top: 40px;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const Types = styled.div`
  column-count: 3;
  column-gap: 10px;

  @media ${DEVICE.TABLET} {
    column-count: 2;
  }
`
