import styled from 'styled-components'
import UiTitle from 'ui/Title'
import UiAvatar from 'ui/Avatar'

export const Base = styled.View``

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Content = styled.View`
  padding-top: 18;
  position: relative;
  z-index: 100;
`

export const Title = styled(UiTitle)`
  margin-right: 40;
`

export const Avatar = styled(UiAvatar)`
  position: absolute;
  right: 0;
`
