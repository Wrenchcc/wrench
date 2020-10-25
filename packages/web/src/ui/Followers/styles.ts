// @ts-nocheck
import styled from 'styled-components'
import UiAvatar from '../Avatar'
import UiText from '../Text'

export const Base = styled.div`
  flex-direction: row;
  display: flex;
  margin-top: 10px;
`

export const Users = styled.div`
  flex-direction: row;
  display: flex;
  margin-right: 10px;
`

export const User = styled.div`
  margin-left: ${props => (props.first ? 0 : -15)}px;
`

export const Avatar = styled(UiAvatar)`
  border: solid 1.5px ${props => props.theme.colors.default};
`

export const Count = styled(UiText)`
  align-self: flex-end;
`
