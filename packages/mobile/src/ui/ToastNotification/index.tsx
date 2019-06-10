import React, { useRef } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Subscribe } from 'unstated'
import { ToastNotificationContainer } from 'store'
import Text from 'ui/Text'
import { Base } from './styles'

const transition = <Transition.Change interpolation="easeInOut" type="fade" durationMs={500} />

function ToastNotification() {
  const { t } = useTranslation()
  const ref = useRef()

  // TODO: Don't run animateNextTransition in render
  return (
    <Subscribe to={[ToastNotificationContainer]}>
      {({ state: { message, type, show } }) => {
        if (show && ref) {
          ref.current.animateNextTransition()
        }

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
      }}
    </Subscribe>
  )
}

export default ToastNotification
