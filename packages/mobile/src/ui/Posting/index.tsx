import React, { useRef, useEffect } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import Text from 'ui/Text'
import { Base, Inner, Cover, Content, Loader } from './styles'

const transition = <Transition.Change interpolation="easeInOut" type="fade" durationMs={500} />

function Posting() {
  const ref = useRef()
  const { t } = useTranslation()

  const image = ''
  const title = 'wef'
  const isPosting = false

  useEffect(() => {
    ref.current.animateNextTransition()
  }, [ref, isPosting])

  return (
    <Transitioning.View ref={ref} transition={transition}>
      {isPosting && (
        <Base>
          <Inner>
            <Content>
              <Loader size="small" color="white" />
              <Cover source={{ uri: image }} />
            </Content>
            <Content>
              <Text numberOfLines={1}>{title}</Text>
              <Text fontSize={15} color="grey">
                {t('Posting:description')}
              </Text>
            </Content>
          </Inner>
        </Base>
      )}
    </Transitioning.View>
  )
}

export default Posting
