import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr, isEmpty } from 'ramda'
import Swiper from 'react-native-swiper'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
import { upload } from 'utils/storage/s3'
import { navigateBack, navigateToFeed } from 'navigation'
import { track, events } from 'utils/analytics'
import { Dropdown, Icon, Input, Text, Header } from 'ui'
import { close, arrowLeftWhite } from 'images'
import Camera from 'features/project/components/Camera/index.js'
import CameraRoll from 'features/project/components/CameraRoll'
import SelectProject from 'features/project/components/SelectProject'
import { Base, Top, Edit, Overlay, Background } from './styles'

const CAMERA_PAGE = 1
const CAMERA_ROLL_PAGE = 0

class AddPost extends Component {
  static propTypes = {
    addPost: PropTypes.func.isRequired,
    projects: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      page: CAMERA_PAGE,
      expanded: false,
      edit: false,
      project: pathOr(null, ['projects', 0, 'node'], props),
      caption: null,
      files: {},
      file: null,
    }

    track(events.POST_CREATED_INITED)
  }

  onTakePicture = file => {
    this.setState({ file, edit: true })
    this.closeDropdown()
  }

  setSelectedProject = project => {
    this.setState({ project }, this.closeDropdown)
  }

  addPictures = files => this.setState({ files })

  changePage = page => this.setState({ page })

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  closeDropdown = () => this.setState({ expanded: false })

  closeEdit = () => {
    // TODO: Remove single file
    this.setState({ edit: false })
  }

  openEdit = () => this.setState({ edit: true })

  onChangeText = text => this.setState({ caption: text })

  navigateToCameraRoll = () => {
    this.swiper.scrollBy(-1)
    this.closeDropdown()
  }

  onSave = async () => {
    const { caption, project, files, file } = this.state

    const data = file ? { [file.uri]: { filename: 'dummy' } } : files

    // TODO: Show progress
    navigateToFeed()

    try {
      const uploadedFiles = await upload(data)

      await this.props.addPost({
        caption,
        projectId: project.id,
        files: uploadedFiles,
      })
      track(events.POST_CREATED)
    } catch {
      track(events.POST_CREATED_FAILED)
    }
  }

  renderHeaderLeft() {
    if (this.state.edit) {
      return <Icon onPress={() => this.closeEdit()} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight() {
    const { page, edit, files } = this.state

    if (!edit && page === CAMERA_ROLL_PAGE && !isEmpty(files)) {
      return (
        <Text color="white" medium onPress={() => this.openEdit()}>
          {this.props.t('AddPost:next')}
        </Text>
      )
    }

    return (
      edit && (
        <Text color="white" medium onPress={this.onSave}>
          {this.props.t('AddPost:post')}
        </Text>
      )
    )
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
    const { caption, edit, file } = this.state

    if (!edit) return null

    return (
      <Background source={file}>
        <Overlay onPressIn={this.closeDropdown} activeOpacity={1}>
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
        </Overlay>
      </Background>
    )
  }

  render() {
    return (
      <Base>
        {this.renderEdit()}

        <SelectProject
          projects={this.props.projects}
          expanded={this.state.expanded}
          onPress={this.setSelectedProject}
          selected={this.state.project}
        />

        <Top>{this.renderHeader()}</Top>
        <Swiper
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          removeClippedSubviews
          ref={swiper => {
            this.swiper = swiper
          }}
          showsPagination={false}
          loop={false}
          index={CAMERA_PAGE}
          onIndexChanged={this.changePage}
        >
          <CameraRoll
            addPictures={this.addPictures}
            pictures={this.state.files}
            closeDropdown={this.closeDropdown}
            dropDownActive={this.state.expanded}
          />

          <Camera
            navigateToCameraRoll={this.navigateToCameraRoll}
            closeDropdown={this.closeDropdown}
            onTakePicture={this.onTakePicture}
          />
        </Swiper>
      </Base>
    )
  }
}

export default compose(
  getCurrentUserProjects,
  addPost,
  translate('AddPost')
)(AddPost)
