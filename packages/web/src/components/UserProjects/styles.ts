import styled from 'styled-components'
import UiText from 'ui/Text'
import UiImage from 'ui/Image'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  @media ${DEVICE.TABLET} {
    margin-bottom: 50px;
  }
`

export const Image = styled(UiImage)`
  width: 87px;
  height: 87px;
`

export const Box = styled.div`
  width: 87px;
  height: 87px;
`

export const List = styled.div`
  margin-top: 30px;

  @media ${DEVICE.TABLET} {
    display: flex;
    width: 100%;
    overflow: auto;
  }
`

export const Row = styled.div`
  margin-bottom: 10px;
  display: flex;

  @media ${DEVICE.TABLET} {
    flex-direction: column;
    width: 87px;
    margin-right: 10px;
  }
`

export const Content = styled.div`
  margin-left: 15px;

  @media ${DEVICE.TABLET} {
    margin-left: 0;
  }
`

export const Text = styled(UiText)`
  @media ${DEVICE.TABLET} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`
