// @ts-nocheck
import styled from 'styled-components'
import UiTitle from '../Title'
import UiText from '../Text'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 65px;


  @media ${DEVICE.TABLET} {
    width: 100%;
    max-width: 100%;
  }
`
export const Top = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
`

export const Bottom = styled.div`
  margin-top: 20px;
`

export const Content = styled.div`
`

export const Title = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Name = styled(UiText)`
  margin-left: 10px;
  margin-right: 5px;
`
