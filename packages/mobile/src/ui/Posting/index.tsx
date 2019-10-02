import React, { useRef, useEffect, useState } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { on } from 'jetemit'
import { usePostStore } from 'store'
import { UPLOAD_PROGRESS } from 'utils/storage/constants'
import Text from 'ui/Text'
import ProgressBar from 'ui/ProgressBar'
import { Base, Inner, Cover } from './styles'
import { COLORS } from 'ui/constants'

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Posting() {
  const ref = useRef()
  const [progress, setProgress] = useState(0)
  const { t } = useTranslation()

  const { image, isPosting } = usePostStore(store => ({
    image: store.files[0],
    isPosting: store.isPosting,
  }))

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [ref])

  useEffect(() => {
    const unsubscribe = on(UPLOAD_PROGRESS, p => {
      if (p === 100) {
        setProgress(0)
      } else {
        setProgress(p)
      }
    })
    return () => unsubscribe()
  }, [setProgress])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {isPosting && (
        <Base>
          <Inner>
            <Cover source={image} />

            <Text fontSize={15} color="grey">
              {t('Posting:description')}
            </Text>
          </Inner>

          <ProgressBar progress={progress} borderRadius={0} fillColor={COLORS.DARK} />
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Posting
