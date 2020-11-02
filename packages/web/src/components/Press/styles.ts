// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Inner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 80px;

  @media ${DEVICE.TABLET} {
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const Row = styled.div`
  display: flex;
  margin-left: -40px;
  margin-top: 40px;
`

export const Column = styled.div`
  width: 208px;
  margin-left: 40px;
`
