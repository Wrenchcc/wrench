import styled from 'styled-components'
import UiButton from '../../ui/Button'
import UiFollowers from '../../ui/Followers'

export const Left = styled.div`
  margin-right: 60px;
  max-width: 360px;
  position: fixed;
`

export const Right = styled.div`
  margin-left: 420px;
  width: 100%;
`

export const Share = styled(UiButton)`
  width: 220px;
`

export const Followers = styled(UiFollowers)`
  margin-bottom: 50px;
`
