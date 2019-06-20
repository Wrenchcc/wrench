import styled from 'styled-components'
import UiFollowers from 'ui/Followers'

export const Base = styled.View`
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)};
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)};
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50;
`

export const Followers = styled(UiFollowers)`
  margin-top: 15;
`

export const Inner = styled.View`
  flex-direction: column;
`
