import styled from 'styled-components'
import { WebView } from 'react-native-webview'
import { hasNotch } from 'utils/platform'

export const Base = styled.View`
  flex: 1;
  padding-bottom: ${hasNotch ? 80 : 60}px;
`

export const BaseWebView = styled(WebView)`
  flex: 1;
  background-color: ${props => props.theme.colors.default};
`

export const Footer = styled.View`
  height: ${hasNotch ? 80 : 60}px;
  padding-left: 20px;
  padding-right: 20px;
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  align-items: center;
  flex-direction: row;
  background-color: ${props => props.theme.colors.default};
`

export const Inner = styled.View`
  flex: 1;
  flex-direction: row;
`
