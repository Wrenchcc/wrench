import React, { useRef, useEffect } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import Text from 'ui/Text'
import { Base, Inner, Cover } from './styles'

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Posting() {
  const ref = useRef()
  const { t } = useTranslation()

  const { image, isPosting } = usePostStore(store => ({
    image: store.files[0],
    isPosting: store.isPosting,
  }))

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [ref, isPosting])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {isPosting && (
        <Base>
          <Inner>
            <Cover source={image} />

            <Text fontSize={15} color="neutral">
              {t('Posting:description')}
            </Text>
          </Inner>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Posting
