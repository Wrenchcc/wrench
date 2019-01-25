import styled from 'styled-components'
import UiText from 'ui/Text'

export const Base = styled.View`
  flex-direction: row;
  padding-top: 10;
  padding-bottom: 10;
  margin-left: ${({ isReply }) => (isReply ? 20 : 0)}px;
  padding-left: 20;
  padding-right: 20;
`

export const Content = styled.View`
  margin-left: 10;
  flex: 1;
`

export const Row = styled.View`
  margin-bottom: 5;
  flex-direction: row;
`

export const Reply = styled(UiText)`
  margin-left: 5;
`
