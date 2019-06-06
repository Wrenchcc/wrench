import React, { useRef } from 'react'
import { Transitioning, Transition } from 'react-native-reanimated'
import { useTranslation } from 'react-i18next'
import { Subscribe } from 'unstated'
import { AddContainer } from 'store'
import Text from 'ui/Text'
import { Base, Inner, Cover, Content, Loader } from './styles'

const transition = <Transition.Change interpolation="easeInOut" type="fade" durationMs={500} />

function PostProgress() {
  const ref = useRef()
  const { t } = useTranslation()

  // TODO: Don't run animateNextTransition in render
  return (
    <Subscribe to={[AddContainer]}>
      {({ state: { postProgress } }) => {
        if (postProgress) {
          ref.current.animateNextTransition()
        }

        return (
          <Transitioning.View ref={ref} transition={transition}>
            <Base top={postProgress ? 0 : -120}>
              <Inner>
                <Content>
                  <Loader size="small" color="white" />
                  {postProgress && <Cover source={{ uri: postProgress.image }} />}
                </Content>
                <Content>
                  {postProgress && <Text numberOfLines={1}>{postProgress.title}</Text>}
                  <Text fontSize={15} color="grey">
                    {t('PostProgress:description')}
                  </Text>
                </Content>
              </Inner>
            </Base>
          </Transitioning.View>
        )
      }}
    </Subscribe>
  )
}

export default PostProgress
