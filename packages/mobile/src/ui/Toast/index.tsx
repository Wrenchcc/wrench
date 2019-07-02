import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useToastStore } from 'store'
import Text from 'ui/Text'
import { TOAST_TYPES } from 'utils/enums'
import { Base } from './styles'

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Toast() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  const { t } = useTranslation()
  const { content, show, type } = useToastStore(store => store)

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

  useEffect(() => {
    ref.current.animateNextTransition()
    setVisible(show)
  }, [ref, show])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {visible && (
        <Base type={type}>
          <Text color="white" medium center fontSize={15}>
            {renderContent()}
          </Text>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Toast
