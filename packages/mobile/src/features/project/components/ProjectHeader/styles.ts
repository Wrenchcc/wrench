import styled from 'styled-components'
import UiFollowers from 'ui/Followers'

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
`
