import styled from 'styled-components'
import UiButton from 'ui/Button'
import UiFollowers from 'ui/Followers'
import { DEVICE } from 'ui/constants'

export const Left = styled.div`
  margin-right: 60px;
  max-width: 360px;
  position: fixed;

  @media ${DEVICE.TABLET} {
    margin-right: 0;
    max-width: 100%;
    position: static;
  }
`

export const Right = styled.div`
  margin-left: 420px;
  width: 100%;

  @media ${DEVICE.TABLET} {
    margin-left: 0;
  }
`

export const ShareButton = styled(UiButton)`
  width: 220px;
  margin-bottom: 10px;
`

export const Similar = styled(UiButton)`
  width: 220px;
`

export const Followers = styled(UiFollowers)`
  margin-bottom: 50px;
`
