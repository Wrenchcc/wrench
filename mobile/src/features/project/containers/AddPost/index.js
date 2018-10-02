import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import uploadToS3 from 'utils/storage/s3'
import { navigateToFeed } from 'navigation'
import { track, events } from 'utils/analytics'
import Camera from 'features/project/components/Camera'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder } from './styles'

class AddPost extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    updatePostProgress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      caption: null,
      files: [],
      project: pathOr(null, ['projects', 0, 'node'], props),
    }

    track(events.POST_CREATED_INITED)
  }

  onTakePicture = file => {}

  onSave = () => {
    const { caption, project, files } = this.state

    this.props.updatePostProgress({
      __typename: 'PostProgress',
      image: pathOr(null, [0, 'uri'], files),
      title: project.title,
    })

    navigateToFeed()

    InteractionManager.runAfterInteractions(async () => {
      try {
        const uploadedFiles = await uploadToS3(files)

        await this.props.addPost({
          caption,
          files: uploadedFiles,
          projectId: project.id,
        })
        track(events.POST_CREATED)
      } catch {
        track(events.POST_CREATED_FAILED)
      }
    })
  }

  render() {
    return (
      <Base>
        <Placeholder>
          <Camera onTakePicture={this.onTakePicture} />
        </Placeholder>
        <CameraRoll />
      </Base>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  addPost,
  updatePostProgress,
  translate('AddPost')
)(AddPost)
