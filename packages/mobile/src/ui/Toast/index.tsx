import React, { useRef, useEffect, useState } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { useToastStore } from 'store'
import Text from 'ui/Text'
import { TOAST_TYPES } from 'utils/enums'
import { Base } from './styles'

const transition = (
  <Transition.Sequence>
    {/*<Transition.Out
      type="slide-bottom"
      durationMs={550}
      interpolation="easeOut"
      propagation="bottom"
    />*/}
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Toast() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  const { t } = useTranslation()
  const { content, show, type } = useToastStore(store => store)

  useEffect(() => {
    ref.current.animateNextTransition()
    setVisible(show)
  }, [ref, show])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {visible && (
        <Base type={type}>
          <Text color="white" medium center fontSize={15}>
            {type === TOAST_TYPES.NETWORK ? t('Toast:networkError') : content}
          </Text>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Toast
