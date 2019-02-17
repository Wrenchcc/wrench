import React, { memo } from 'react'
import { Spring } from 'react-spring/renderprops'
import withTranslation from 'i18n/withTranslation'
import { Subscribe } from 'unstated'
import { AddContainer } from 'store'
import Text from 'ui/Text'
import { Base, Inner, Cover, Content } from './styles'

const FROM_HEIGHT = 0
const TO_HEIGHT = 60

const PostProgress = memo(function PostProgress({ t }) {
  return (
    <Subscribe to={[AddContainer]}>
      {({ state: { postProgress } }) => (
        <Spring
          native
          from={{ height: FROM_HEIGHT }}
          to={{ height: postProgress ? TO_HEIGHT : FROM_HEIGHT }}
        >
          {({ height }) => (
            <Base height={height}>
              <Inner>
                {postProgress && <Cover source={{ uri: postProgress.image }} />}

                <Content>
                  {postProgress && <Text numberOfLines={1}>{postProgress.title}</Text>}
                  <Text fontSize={15} color="grey">
                    {t('PostProgress:description')}
                  </Text>
                </Content>
              </Inner>
            </Base>
          )}
        </Spring>
      )}
    </Subscribe>
  )
})

export default withTranslation('PostProgress')(PostProgress)
