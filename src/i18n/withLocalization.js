import React, { PureComponent } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import i18next from 'i18next'

export const t = (key, params) => i18next.t(key.replace('.', ':'), params)

export default function withLocalization(WrappedComponent, contextPath) {
  class WithLocalization extends PureComponent {
    translate = (key, params) => i18next.t(contextPath + key.replace('.', ':'), params)

    render = () => <WrappedComponent key={this.context.locale} {...this.props} t={this.translate} />
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  WithLocalization.displayName = `WithLocalization(${getDisplayName(WrappedComponent)})`

  hoistNonReactStatics(WithLocalization, WrappedComponent)

  return WithLocalization
}
