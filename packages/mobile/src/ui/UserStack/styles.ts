import styled from 'styled-components/native'

import { ThemeInterface } from 'ui/types'

export const Base = styled.View`
  flex-direction: row;
  display: flex;
`

export const Users = styled.View`
  flex-direction: row;
  display: flex;
  margin-right: 5px;
  margin-left: 5px;
`

type UserProps = { first: boolean; size: number; theme: ThemeInterface }

export const User = styled.View<UserProps>`
  margin-left: ${(props) => (props.first ? 0 : -props.size / 2)}px;
  border: 1px solid ${({ theme }) => theme.colors.default};
  border-radius: ${(props) => props.size}px;
`
