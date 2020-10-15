import React, { useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { store } from 'gql'
import { TOAST_TYPES } from 'utils/enums'
import { Banner } from 'ui'
import Animation from './Animation'

function Toast() {
  const { t } = useTranslation()

  const { content, show, type, dismissAfter } = useReactiveVar(store.toast.toastVar)

  const renderContent = useCallback(() => {
    switch (type) {
      case TOAST_TYPES.NETWORK:
        return t('Toast:network')
      case TOAST_TYPES.SPAM:
        return t('Toast:spam')
      default:
        return content
    }
  }, [t, type, content])

  return (
    <Animation
      onAnimationCompleted={store.toast.reset}
      visible={!!show}
      dismissAfter={dismissAfter}
    >
      {show && <Banner type={type} content={renderContent()} />}
    </Animation>
  )
}

export default Toast
