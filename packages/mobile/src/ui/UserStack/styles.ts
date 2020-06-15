// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from '../constants'
import UiText from 'ui/Text'

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

export const User = styled.View`
  margin-left: ${(props) => (props.first ? 0 : -12)}px;
  border: 1px solid ${({ theme }) => theme.colors.default};
  border-radius: ${(props) => props.size}px;
`

export const Count = styled(UiText)`
  align-self: flex-end;
`
