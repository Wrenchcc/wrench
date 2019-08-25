import styled from 'styled-components'
import UiFollowers from 'ui/Followers'
import UiTouchable from 'ui/Touchable'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
  margin-bottom: 50;
`

export const Followers = styled(UiFollowers)`
  margin-top: 15;
  margin-bottom: 35;
  align-self: flex-start;
`

export const Actions = styled.View`
  align-self: flex-start;
  flex-direction: row;
`

export const OpenSimilar = styled(UiTouchable)`
  border-width: 1;
  border-color: ${COLORS.DIVIDER};
  height: 40;
  justify-content: center;
  align-items: center;
  padding-left: 15;
  padding-right: 15;
  align-self: flex-start;
`
