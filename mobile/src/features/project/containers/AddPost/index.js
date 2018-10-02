import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView, InteractionManager } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr, isEmpty } from 'ramda'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { updatePostProgress } from 'graphql/mutations/post/postProgress'
import { upload } from 'utils/storage/s3'
import { navigateBack, navigateToFeed } from 'navigation'
import { track, events } from 'utils/analytics'
import { Dropdown, Icon, Input, Text, Header } from 'ui'
import { close, arrowLeftWhite } from 'images'
import Camera from 'features/project/components/Camera'

import CameraRoll from 'features/project/components/CameraRoll'
import SelectProject from 'features/project/components/SelectProject'
import { Base, Top, Edit, Inner, Overlay } from './styles'

const MODES = {
  CAMERA: 'camera',
  CAMERA_ROLL: 'camera_roll',
}

const defaultState = {
  capturedPicture: null,
  caption: null,
  edit: false,
  expanded: false,
  files: [],
  mode: MODES.CAMERA,
}

class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
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

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  closeDropdown = () => this.setState({ expanded: false })

  closeEdit = () => {
    this.setState(defaultState)
  }

  openEdit = () => this.setState({ edit: true })

  onChangeText = text => this.setState({ caption: text })

  navigateToCameraRoll = () => {
    this.swiper.scrollBy(-1)
    this.closeDropdown()
  }

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

  renderHeaderLeft() {
    if (this.state.edit) {
      return <Icon onPress={() => this.closeEdit()} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    const { edit, files } = this.state

    if (!edit && !isEmpty(files)) {
      return (
        <Text color="white" medium onPress={() => this.openEdit()}>
          {this.props.t('AddPost:next')}
        </Text>
      )
    }

    if (edit && !isEmpty(files)) {
      return (
        <Text color="white" medium onPress={this.onSave}>
          {this.props.t('AddPost:post')}
        </Text>
      )
    }

    return null
  }

  renderHeader() {
    return (
      <Header
        headerLeft={this.renderHeaderLeft()}
        headerRight={this.renderHeaderRight()}
        headerCenter={
          <Dropdown
            title={this.state.project.title}
            onPress={this.toggleDropdown}
            active={this.state.expanded}
          />
        }
      />
    )
  }

  renderEdit() {
    const { t } = this.props
    const { caption, edit } = this.state

    if (!edit) return null

    return (
      <Overlay>
        <Inner onPressIn={this.closeDropdown} activeOpacity={1}>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
                value={caption}
                onChangeText={this.onChangeText}
                placeholder={t('AddPost:placeholder')}
              />
            </Edit>
          </KeyboardAvoidingView>
        </Inner>
      </Overlay>
    )
  }

  render() {
    return (
      <Base>
        {this.renderEdit()}

        <SelectProject
          expanded={this.state.expanded}
          onPress={this.setSelectedProject}
          projects={this.props.projects}
          selected={this.state.project}
        />

        <Top>{this.renderHeader()}</Top>

        <Camera
          active={this.state.mode === MODES.CAMERA}
          onTakePicture={this.onTakePicture}
          closeDropdown={this.closeDropdown}
          navigateToCameraRoll={this.navigateToCameraRoll}
          openEdit={this.openEdit}
          capturedPicture={this.state.capturedPicture}
        />

        <CameraRoll
          active={this.state.mode === MODES.CAMERA_ROLL}
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
