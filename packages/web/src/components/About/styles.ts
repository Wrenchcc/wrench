// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Inner = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  margin-top: 80px;
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

export const Column = styled.div`
  width: 50%;
  margin-left: 70px;
`

export const Image = styled.picture`
  width: 500px;
  display: block;
  margin-top: 60px;

  img {
    width: 100%;
  }
`

export const Team = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -60px;
  margin-top: 50px;
`

export const PersonPicture = styled.picture`
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
`
