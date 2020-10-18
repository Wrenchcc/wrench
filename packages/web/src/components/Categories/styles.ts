// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'
import UiTitle from 'ui/Title'
import UiCard from 'ui/Card'

export const Title = styled(UiTitle)`
  margin-bottom: 50px;
`

export const Card = styled(UiCard)`
  @media ${DEVICE.TABLET} {
    width: 50%;
  }
`

export const List = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-left: -40px;
  margin-top: 50px;

  @media ${DEVICE.TABLET} {
    margin-left: 0px;
  }
`
