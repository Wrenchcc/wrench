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

export const Center = styled.div`
  max-width: 780px;
  width: 100%;
  margin: 0 auto;
  margin-top: 90px;
`

export const Team = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -60px;
  margin-top: 50px;

  @media ${DEVICE.TABLET} {
    margin-left: -20px;
  }
`

export const PersonPicture = styled.div`
  width: 100%;
  display: block;

  img {
    width: 100%;
  }
`

export const Person = styled.div`
  width: 50%;
  margin-left: 60px;
  margin-bottom: 20px;

  @media ${DEVICE.TABLET} {
    margin-left: 20px;
  }
`
