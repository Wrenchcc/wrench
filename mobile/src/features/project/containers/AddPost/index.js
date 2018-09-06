import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { translate } from 'react-i18next'
import { pathOr, isEmpty } from 'ramda'
import Swiper from 'react-native-swiper'
import { compose } from 'react-apollo'
import { getCurrentUserProjects } from 'graphql/queries/user/getCurrentUserProjects'
import { navigateBack, navigateToFeed } from 'navigation'
import { Dropdown, Icon, Input, Text, Header } from 'ui'
import { close, arrowLeftWhite } from 'images'
import Camera from 'features/project/components/Camera/index.js'
import CameraRoll from 'features/project/components/CameraRoll'
import SelectProject from 'features/project/components/SelectProject'
import { Base, Top, Edit, Overlay, Background } from './styles'

const CAMERA_PAGE = 1
const CAMERA_ROLL_PAGE = 0

class AddPost extends Component {
  constructor(props) {
    super(props)

    this.state = {
      page: CAMERA_PAGE,
      expanded: false,
      edit: false,
      picture: null,
      pictures: {},
      selectedProject: pathOr(null, ['projects', 0, 'node'], props),
    }
  }

  onTakePicture = picture => {
    this.setState({ picture, edit: true })
    this.closeDropdown()
  }

  setSelectedProject = project => {
    this.setState({ selectedProject: project }, this.closeDropdown)
  }

  addPictures = pictures => this.setState({ pictures })

  changePage = page => this.setState({ page })

  toggleDropdown = () => this.setState(prevState => ({ expanded: !prevState.expanded }))

  closeDropdown = () => this.setState({ expanded: false })

  closeEdit = () => {
    this.setState({
      edit: false,
      picture: null,
    })
  }

  openEdit = () => this.setState({ edit: true })

  navigateToCameraRoll = () => {
    this.swiper.scrollBy(-1)
    this.closeDropdown()
  }

  renderHeaderLeft = () => {
    if (this.state.edit) {
      return <Icon onPress={() => this.closeEdit()} source={arrowLeftWhite} />
    }
    return <Icon onPress={() => navigateBack()} source={close} />
  }

  renderHeaderRight = () => {
    const { page, edit, pictures } = this.state

    if (!this.state.edit && page === CAMERA_ROLL_PAGE && !isEmpty(pictures)) {
      return (
        <Text color="white" medium onPress={() => this.openEdit()}>
          {this.props.t('AddPost:next')}
        </Text>
      )
    }

    // TODO: Implement save
    return (
      edit && (
        <Text color="white" medium onPress={() => navigateToFeed()}>
          {this.props.t('AddPost:post')}
        </Text>
      )
    )
  }

  renderHeader = () => (
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

  renderEdit = () => {
    if (!this.state.edit) return null

    return (
      <Background source={this.state.picture}>
        <Overlay onPressIn={this.closeDropdown} activeOpacity={1}>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
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
  translate('AddPost')
)(AddPost)
