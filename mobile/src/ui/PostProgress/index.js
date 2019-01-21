import React, { PureComponent } from 'react'
import { compose } from 'react-apollo'
import { Spring } from 'react-spring'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { onUploadProgress } from 'utils/storage/s3/uploadProgress'
import { AddContainer } from 'store'
import Text from 'ui/Text'
import ProgressBar from 'ui/ProgressBar'
import { Base, Inner, Cover, Content } from './styles'

const FROM_HEIGHT = 0
const TO_HEIGHT = 60
const PROGRESS_DEFAULT = 0
const PROGRESS_COMPLETE = 100

class PostProgress extends PureComponent {
  state = {
    progress: PROGRESS_DEFAULT,
  }

  constructor(props) {
    super(props)
    onUploadProgress(this.updateProgress)
  }

  updateProgress = progress => {
    this.setState({ progress })

    if (progress === PROGRESS_COMPLETE) {
      this.setState({ progress: PROGRESS_DEFAULT })
    }
  }

  render() {
    const { t } = this.props
    const { progress } = this.state

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

                <ProgressBar progress={progress} fillColor="black" backgroundColor="transparent" />
              </Base>
            )}
          </Spring>
        )}
      </Subscribe>
    )
  }
}

export default compose(withNamespaces('PostProgress'))(PostProgress)
