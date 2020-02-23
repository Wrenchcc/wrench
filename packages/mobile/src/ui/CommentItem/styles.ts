import styled from 'styled-components'
import UiText from 'ui/Text'

export const Base = styled.View`
  flex-direction: row;
  padding-top: ${props => (props.first ? 0 : 10)}px;
  padding-bottom: ${props => (props.first ? 10 : 0)}px;
  margin-bottom: ${props => (props.first ? 20 : 10)}px;
  margin-left: ${props => (props.isReply ? 40 : 0)}px;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom-width: ${props => (props.first ? 1 : 0)}px;
  border-bottom-color: ${props => props.theme.colors.divider};
`

export const Content = styled.View`
  margin-left: 10px;
  margin-right: 10px;
  flex: 1;
`

export const Border = styled.View`
  width: 20px;
  height: 1px;
  background-color: ${props => props.theme.colors.divider};
  margin-right: 10px;
`

export const Row = styled.View`
  margin-bottom: 5px;
  flex-direction: row;
`

export const Reply = styled(UiText)`
  opacity: ${props => (props.disabled ? 0.7 : 1)};
  margin-left: 5px;
`

export const LoadReplies = styled.View`
  flex-direction: row;
  align-items: center;
  margin-left: 60px;
  margin-bottom: 10px;
`

export const Action = styled.View`
  margin-right: 10px;
`
