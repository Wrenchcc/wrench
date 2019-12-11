import styled from 'styled-components'
import UiText from 'ui/Text'
import UiTitle from 'ui/Title'
import UiImage from 'ui/Image'
import { DEVICE } from 'ui/constants'

export const Base = styled.div``

export const Title = styled(UiTitle)`
  margin-bottom: 10px;
`

export const Image = styled(UiImage)`
  width: 87px;
  height: 87px;
`

export const Inner = styled.div`
  width: 33.33%;
  padding-bottom: 20px;
  box-sizing: border-box;

  @media ${DEVICE.TABLET} {
    width: 50%;
  }

  @media ${DEVICE.MOBILE_LARGE} {
    width: 100%;
  }
`

export const Box = styled.div`
  width: 87px;
  height: 87px;
`

export const List = styled.div`
  margin-top: 40px;
`

export const Row = styled.div`
  margin-bottom: 10px;
  display: flex;
`

export const Content = styled.div`
  margin-left: 15px;
`

export const Text = styled(UiText)``
