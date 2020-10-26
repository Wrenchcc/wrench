// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Inner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;

  @media ${DEVICE.TABLET} {
    padding: 0 20px;
    box-sizing: border-box;
  }
`

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -70px;
`

export const Image = styled.picture`
  display: block;
  margin-top: 40px;
  margin-bottom: 60px;

  @media ${DEVICE.TABLET} {
    margin-bottom: 20px;
  }

  img {
    width: 100%;
  }
`
