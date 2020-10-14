import React, { useRef, useEffect, useCallback } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { toastVar } from 'gql'
import { TOAST_TYPES } from 'utils/enums'
import { Banner } from 'ui'

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Toast() {
  const ref = useRef()
  const { t } = useTranslation()

  const { content, show, type } = useReactiveVar(toastVar)

  useEffect(() => {
    if (show) {
      ref.current.animateNextTransition()
    }
  }, [ref, show])

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
    <Transitioning.View ref={ref} transition={transition}>
      {show && <Banner type={type} content={renderContent()} />}
    </Transitioning.View>
  )
}

export default Toast
