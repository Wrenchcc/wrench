import React from 'react'
import UiWebView from 'ui/WebView'

type Props = {
  url: string
}

const WebView = ({ url }: Props) => <UiWebView url={url} />

export default WebView
