// @ts-nocheck
import styled from 'styled-components'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  padding-top: 80px;
  max-width: 1060px;
  margin: 0 auto;

  @media ${DEVICE.TABLET} {
    padding-top: 40px;
  }
`

export const Top = styled.div`
  @media ${DEVICE.TABLET} {
    margin: 0 20px;
  }
`

export const Inner = styled.div`
  display: flex;
  flex-direction: ${props => (props.column ? 'column' : 'row')};

  @media ${DEVICE.TABLET} {
    flex-direction: column;
    margin: 0 20px;
  }
`
