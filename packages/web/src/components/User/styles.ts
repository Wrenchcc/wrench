import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Top = styled.div`
  display: flex;
  margin-bottom: 65px;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;

  @media ${DEVICE.TABLET} {
    flex-direction: column-reverse;
  }
`

export const Name = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  justify-content: center;
`

export const Left = styled.div`
  width: 100%;
`

export const Right = styled.div`
  margin-top: -120px;
  width: 300px;

  @media ${DEVICE.TABLET} {
    margin-top: 0;
    width: auto;
  }
`

export const Info = styled.div`
  padding-top: 10px;
`
