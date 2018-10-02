import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { InteractionManager } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr } from 'ramda'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import { upload } from 'utils/storage/s3'
import { navigateToFeed } from 'navigation'
import { track, events } from 'utils/analytics'
import Camera from 'features/project/components/Camera'
import CameraRoll from 'features/project/components/CameraRoll'
import { Base, Placeholder } from './styles'

const VIEW_MODES = {
  CAMERA: 'camera',
  CAMERA_ROLL: 'camera_roll',
}

const defaultState = {
  capturedPicture: null,
  caption: null,
  edit: false,
  expanded: false,
  files: [],
  mode: VIEW_MODES.CAMERA,
}

class AddPost extends PureComponent {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    updatePostProgress: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      project: pathOr(null, ['projects', 0, 'node'], props),
      ...defaultState,
    }

    track(events.POST_CREATED_INITED)
  }

  setSelectedProject = project => {
    this.setState({ project }, this.closeDropdown)
  }

  addFileToPost = file => {
    this.closeDropdown()
    this.setState(prevState => ({ files: [...prevState.files, file] }))
  }

  removeFileFromPost = originalFilename => {
    this.setState(prevState => ({
      files: prevState.files.filter(a => a.originalFilename !== originalFilename),
    }))
  }

  onTakePicture = file => {
    this.setState({ capturedPicture: file, files: [file] })
  }

  onChangeText = text => this.setState({ caption: text })

  onSave = () => {
    const { caption, project, files } = this.state

    this.props.updatePostProgress({
      image: pathOr(null, [0, 'uri'], files),
      title: project.title,
      __typename: 'PostProgress',
    })

    navigateToFeed()

    InteractionManager.runAfterInteractions(async () => {
      try {
        const uploadedFiles = await upload(files)

        await this.props.addPost({
          caption,
          projectId: project.id,
          files: uploadedFiles,
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

        <CameraRoll
          addFileToPost={this.addFileToPost}
          closeDropdown={this.closeDropdown}
          dropDownActive={this.state.expanded}
          removeFileFromPost={this.removeFileFromPost}
          resetSelection={!!this.state.capturedPicture}
        />
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
