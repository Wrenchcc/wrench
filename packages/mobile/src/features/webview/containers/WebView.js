import React from 'react'
import PropTypes from 'prop-types'
import UiWebView from 'ui/WebView'

const WebView = ({ navigation }) => <UiWebView url={navigation.state.params.url} />

WebView.propTypes = {
  navigation: PropTypes.object.isRequired,
}

export default WebView
