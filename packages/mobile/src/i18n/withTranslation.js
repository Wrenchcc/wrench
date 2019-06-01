import React from 'react'
import { useTranslation } from 'react-i18next'

export default function withTranslation(ns) {
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
