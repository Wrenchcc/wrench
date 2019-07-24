import styled from 'styled-components'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex-direction: row;
  padding-top: 10;
  padding-bottom: ${props => (props.first ? 20 : 10)};
  margin-left: ${props => (props.isReply ? 40 : 0)}px;
  padding-left: 20;
  padding-right: 20;
  border-bottom-width: ${props => (props.first ? 1 : 0)};
  border-bottom-color: ${COLORS.DIVIDER};
`

export const Content = styled.View`
  margin-left: 10;
  margin-right: 10;
  flex: 1;
`

export const Border = styled.View`
  width: 20;
  height: 1;
  background-color: ${COLORS.DIVIDER};
  margin-right: 10;
`

export const Row = styled.View`
  margin-bottom: 5;
  flex-direction: row;
`

export const Reply = styled(UiText)`
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  margin-left: 5;
`

export const LoadReplies = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 60;
  margin-bottom: 10;
`

export const Action = styled.View`
  margin-right: 10;
`
