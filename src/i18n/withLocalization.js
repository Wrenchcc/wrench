import React, { PureComponent } from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import i18next from 'i18next'
import { reactI18nextModule } from 'react-i18next'

const resources = require('translations/index.json')

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    callback('en')
  },
  init: () => {},
  cacheUserLanguage: () => {},
}

i18next
  .use(languageDetector)
  .use(reactI18nextModule)
  .init({
    fallbackLng: 'en',
    resources,
    debug: __DEV__,
    cache: {
      enabled: !__DEV__,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export const t = key => i18next.t(key)

export default function withLocalization(WrappedComponent, contextPath) {
  class WithLocalization extends PureComponent {
    translate = (key, params) => i18next.t(`${contextPath}:${key}`, params)

    render = () => <WrappedComponent key={this.context.locale} {...this.props} t={this.translate} />
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
  }

  WithLocalization.displayName = `WithLocalization(${getDisplayName(WrappedComponent)})`

  hoistNonReactStatics(WithLocalization, WrappedComponent)

  return WithLocalization
}
