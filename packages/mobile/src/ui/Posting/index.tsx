import React, { useRef, useEffect } from 'react'
import { useReactiveVar } from '@apollo/client'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { store } from 'gql'
import Text from 'ui/Text'
import { Base, Inner, Cover } from './styles'

const transition = (
  <Transition.Sequence>
    <Transition.Change interpolation="easeInOut" />
    <Transition.In type="slide-top" durationMs={150} interpolation="easeOut" propagation="top" />
  </Transition.Sequence>
)

function Posting({ scrollToTop }) {
  const { t } = useTranslation('posting')
  const ref = useRef(null)

  const isPosting = useReactiveVar(store.post.isPostingVar)
  const image = useReactiveVar(store.files.selectedFilesVar)[0]

  useEffect(() => {
    ref.current.animateNextTransition()

    if (!isPosting) {
      setTimeout(() => {
        scrollToTop()
      }, 100)
    }
  }, [ref, isPosting])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {isPosting && (
        <Base>
          <Inner>
            <Cover source={image} />
            <Text fontSize={15}>{t('description')}</Text>
          </Inner>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Posting
