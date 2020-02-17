import styled from 'styled-components'
import UiFollowers from 'ui/Followers'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)}px;
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)}px;
  margin-bottom: 50px;
  margin-top: 40px;
`

export const Followers = styled(UiFollowers)`
  margin-top: 15px;
  margin-bottom: 35px;
  align-self: flex-start;
`

export const Actions = styled.View`
  align-self: flex-start;
  flex-direction: row;
`

export const OpenSimilar = styled(UiTouchable)`
  border-width: 1px;
  border-color: ${COLORS.DIVIDER};
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  align-self: flex-start;
`
