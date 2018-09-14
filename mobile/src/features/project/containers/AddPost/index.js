import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { KeyboardAvoidingView } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr, isEmpty } from 'ramda'
import Swiper from 'react-native-swiper'
import { compose } from 'react-apollo'
import { ReactNativeFile } from 'apollo-upload-client'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { addPost } from 'graphql/mutations/post/addPost'
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
      selectedProject: pathOr(null, ['projects', 0, 'node'], props),
      caption: null,
      pictures: {},
    }

    track(events.POST_CREATED_INITED)
  }

  onTakePicture = picture => {
    this.setState({ pictures: { [picture.uri]: picture }, edit: true })
    this.closeDropdown()
  }

  setSelectedProject = project => {
    this.setState({ selectedProject: project }, this.closeDropdown)
  }

  addPictures = pictures => this.setState({ pictures })

  changePage = page => this.setState({ page })

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  closeDropdown = () => this.setState({ expanded: false })

  closeEdit = () => this.setState({ edit: false })

  openEdit = () => this.setState({ edit: true })

  handleCaption = caption => this.setState({ caption })

  navigateToCameraRoll = () => {
    this.swiper.scrollBy(-1)
    this.closeDropdown()
  }

  onSave = async () => {
    const { caption, selectedProject, pictures } = this.state

    const files = Object.keys(pictures).map(uri => ({
      uri,
      name: uri,
      type: 'image/jpeg',
    }))

    const post = {
      projectId: selectedProject.id,
      caption,
      files: ReactNativeFile.list(files),
    }

    navigateToFeed(post)

    try {
      await this.props.addPost(post)
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
    const { page, edit, pictures } = this.state

    if (!edit && page === CAMERA_ROLL_PAGE && !isEmpty(pictures)) {
      return (
        <Text color="white" medium onPress={() => this.openEdit()}>
          {this.props.t('AddPost:next')}
        </Text>
      )
    }

    // And pass data to feed
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
            title={this.state.selectedProject.title}
            onPress={this.toggleDropdown}
            active={this.state.expanded}
          />
        }
      />
    )
  }

  renderEdit() {
    const { caption, edit } = this.state
    if (!edit) return null

    return (
      <Background source={this.state.pictures[0]}>
        <Overlay onPressIn={this.closeDropdown} activeOpacity={1}>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
                value={caption}
                onChange={this.handleCaption}
                placeholder={this.props.t('AddPost:placeholder')}
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
          selected={this.state.selectedProject}
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
            pictures={this.state.pictures}
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
