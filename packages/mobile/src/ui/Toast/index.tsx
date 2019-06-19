import React, { useRef, useEffect } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useToastStore } from 'store'
import Text from 'ui/Text'
import { BANNER_TYPES } from 'utils/enums'
import { Base } from './styles'

const transition = <Transition.Change interpolation="easeInOut" type="fade" durationMs={500} />

function Toast() {
  const { t } = useTranslation()
  const ref = useRef()
  const { message, show, type } = useToastStore(store => store)

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [show])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {show && (
        <Base type={type}>
          <Text color="white" medium center fontSize={15}>
            {type === BANNER_TYPES.NETWORK ? t('Toast:networkError') : message}
          </Text>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Toast
