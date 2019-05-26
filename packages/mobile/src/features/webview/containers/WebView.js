import React from 'react'
import PropTypes from 'prop-types'
import UiWebView from 'ui/WebView'

const WebView = ({ url }) => <UiWebView url={url} />

WebView.propTypes = {
  url: PropTypes.string.isRequired,
}

export default WebView
