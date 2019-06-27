import React, { useRef, useEffect, useState } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { usePostStore } from 'store'
import Text from 'ui/Text'
import { Base, Inner, Cover } from './styles'

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

function Posting() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  const { t } = useTranslation()

  // TODO: Selected project title
  const { image, title, isPosting } = usePostStore(store => ({
    image: store.files[0],
    isPosting: store.isPosting,
    title: 'Project title',
  }))

  useEffect(() => {
    ref.current.animateNextTransition()
    setVisible(isPosting)
  }, [ref, isPosting])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {visible && (
        <Base>
          <Inner>
            <Cover source={image} />

            <Text numberOfLines={1}>{title}</Text>
            <Text fontSize={15} color="grey">
              {t('Posting:description')}
            </Text>
          </Inner>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Posting
