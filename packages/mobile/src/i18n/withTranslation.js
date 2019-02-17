import React from 'react'
import { useTranslation } from 'react-i18next'

// NOTE: Need to copy static for react-naivation
// When translate headerTitles
export function withTranslation(ns) {
  return function Extend(WrappedComponent) {
    function I18nextWithTranslation(props) {
      const [t, i18n, ready] = useTranslation(ns, props)

      return React.createElement(WrappedComponent, {
        ...props,
        t,
        i18n,
        tReady: ready,
      })
    }

    I18nextWithTranslation.navigationOptions = WrappedComponent.navigationOptions

    return I18nextWithTranslation
  }
}
