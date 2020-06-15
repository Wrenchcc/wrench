import styled from 'styled-components'
import UiFollowers from 'ui/Followers'
import UiTouchable from 'ui/Touchable'

export const Base = styled.View`
  padding-left: ${(props) => (props.spacingHorizontal ? 20 : 0)}px;
  padding-right: ${(props) => (props.spacingHorizontal ? 20 : 0)}px;
  margin-bottom: 50px;
`

export const Followers = styled(UiFollowers)`
  margin-top: 7px;
  align-self: flex-start;
`

export const Actions = styled.View`
  align-self: flex-start;
  flex-direction: row;
`

export const Meta = styled.View`
  align-self: flex-start;
  flex-direction: row;
  margin-top: 15px;
  margin-bottom: 35px;
`

export const OpenSimilar = styled(UiTouchable)`
  border-width: 1px;
  border-color: ${(props) => props.theme.colors.divider};
  height: 40px;
  justify-content: center;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  align-self: flex-start;
`
