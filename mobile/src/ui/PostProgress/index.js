import React, { PureComponent } from 'react'
import { Animated } from 'react-native'
import { Subscribe } from 'unstated'
import { AddPostContainer } from 'store'
import { compose } from 'react-apollo'
import { withNamespaces } from 'react-i18next'
import { onUploadProgress } from 'utils/storage/s3/uploadProgress'
import { Text, ProgressBar } from 'ui'
import { Base, Inner, Cover, Content } from './styles'

const HEIGHT = 60
const PROGRESS_DEFAULT = 0
const PROGRESS_COMPLETE = 100

class PostProgress extends PureComponent {
  state = {
    progress: PROGRESS_DEFAULT,
  }

  animatedHeight = new Animated.Value(HEIGHT)

  constructor(props) {
    super(props)
    onUploadProgress(this.updateProgress)
  }

  updateProgress = progress => {
    this.setState({ progress })

    if (progress === PROGRESS_COMPLETE) {
      this.setState({ progress: PROGRESS_DEFAULT })
      this.hidePostProgress(true)
    }
  }

  hidePostProgress() {
    Animated.spring(this.animatedHeight, {
      toValue: 0,
      bounciness: 0,
    }).start()
  }

  render() {
    const { t } = this.props
    const { progress } = this.state

    return (
      <Subscribe to={[AddPostContainer]}>
        {({ state: { postProgress } }) => {
          if (!postProgress) {
            this.animatedHeight.setValue(HEIGHT)
            return null
          }

          return (
            <Base style={{ height: this.animatedHeight }}>
              <Inner>
                <Cover source={{ uri: postProgress.image }} />

                <Content>
                  <Text numberOfLines={1}>{postProgress.title}</Text>
                  <Text fontSize={15} color="grey">
                    {t('PostProgress:description')}
                  </Text>
                </Content>
              </Inner>

              <ProgressBar progress={progress} fillColor="black" backgroundColor="transparent" />
            </Base>
          )
        }}
      </Subscribe>
    )
  }
}

export default compose(withNamespaces('PostProgress'))(PostProgress)
