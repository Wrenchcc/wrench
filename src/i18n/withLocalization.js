import React, { Component } from 'react'
import I18n from 'react-native-i18n'

I18n.fallbacks = true
I18n.translations = require('translations/index.json')

export const t = key => I18n.t(key)

export default function withLocalization(WrappedComponent, contextPath) {
  class WithLocalization extends Component {
    translate = (key, params) => I18n.t(contextPath + key, params)

    render = () => <WrappedComponent key={this.context.locale} {...this.props} t={this.translate} />
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  WithLocalization.displayName = `WithLocalization(${getDisplayName(WrappedComponent)})`

  return WithLocalization
}
