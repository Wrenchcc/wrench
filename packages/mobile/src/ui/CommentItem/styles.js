import { StyleSheet } from 'react-native'
import styled from 'styled-components'
import UiText from 'ui/Text'
import { COLORS } from 'ui/constants'

export const Base = styled.View`
  flex-direction: row;
  padding-top: 10;
  padding-bottom: ${props => (props.first ? 20 : 10)};
  margin-bottom: ${props => (props.first ? 15 : 0)};
  margin-left: ${props => (props.isReply ? 40 : 0)}px;
  padding-left: 20;
  padding-right: 20;
  border-bottom-width: ${props => (props.first ? StyleSheet.hairlineWidth : 0)};
  border-bottom-color: ${COLORS.LIGHT_GREY};
`

export const Content = styled.View`
  margin-left: 10;
  flex: 1;
`

export const Spinner = styled.ActivityIndicator`
  margin-left: 10;
`

export const Border = styled.View`
  width: 20;
  height: ${StyleSheet.hairlineWidth};
  background-color: ${COLORS.LIGHT_GREY};
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
