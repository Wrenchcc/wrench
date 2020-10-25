// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from '../constants'
import UiText from '../Text'

export const Base = styled.div`
  display: flex;
  margin-bottom: 15px;
  padding-top: 15px;
  border-top: ${props => (props.first ? 0 : 1)}px solid ${props => props.theme.colors.divider};
`

export const Content = styled.div`
  margin-left: 10px;
`

export const Bottom = styled.div`
  display: flex;
`

export const Description = styled(UiText)`
  margin-right: 10px;
`
