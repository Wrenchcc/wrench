import React, { useRef } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useStoreState } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base } from './styles'

const transition = <Transition.Change interpolation="easeInOut" type="fade" durationMs={500} />

function ToastNotification() {
  const { t } = useTranslation()
  const ref = useRef()

  const { message, type, show } = useStoreState(state => state.notification)

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [show])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {show && (
        <Base type={type}>
          <Text color="white" medium center fontSize={15}>
            {type === 'network' ? t('ToastNotification:networkError') : message}
          </Text>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default ToastNotification
