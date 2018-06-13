import React, { Component } from 'react'
import { KeyboardAvoidingView } from 'react-native'
// import Permissions from 'react-native-permissions'
import Swiper from 'react-native-swiper'
import withLocalization from 'i18n/withLocalization'
import { navigateBack } from 'navigation'
import data from 'fixtures/myprojects'
import { Dropdown, Icon, Input, Text, Header } from 'ui'
import { close, arrowLeftWhite } from 'images'
import SelectProject from '../SelectProject'
import Camera from '../Camera'
import CameraRoll from '../CameraRoll'
import { Base, Top, Edit, Overlay, Background } from './styles'

const CAMERA_PAGE = 1
const CAMERA_ROLL_PAGE = 0

class AddPost extends Component {
  state = {
    page: CAMERA_PAGE,
    expanded: false,
    project: data[0],
    edit: false,
    picture: null,
    pictures: [],
  }

  // TODO: Ask for permissions
  componentDidMount() {
    // Permissions.checkMultiple(['camera', 'photo']).then(response => {
    //   console.log('efer')
    //
    //   if (response.photo !== 'authorized') {
    //     this.askForPhotosPermission()
    //   }
    //
    //   console.log(response.camera)
    //   console.log(response.photo)
    // })
  }

  onTakePicture = picture => {
    this.setState({ picture, edit: true })
    this.closeDropdown()
  }

  setSelectedProject = project => {
    this.setState({ project }, this.closeDropdown)
  }

  // requestPermission = () => {
  //   Permissions.request('photo').then(response => {
  //     this.setState({ photoPermission: response })
  //   })
  // }

  // askForPhotosPermission() {
  //   Alert.alert('Can we access your photos?', 'We need access so you can set your profile pic', [
  //     {
  //       text: 'No way',
  //       onPress: () => console.log('Permission denied'),
  //       style: 'cancel',
  //     },
  //     this.state.photoPermission === 'undetermined'
  //       ? { text: 'OK', onPress: this.requestPermission }
  //       : { text: 'Open Settings', onPress: Permissions.openSettings },
  //   ])
  // }

  addPictures = pictures => this.setState({ pictures })
  changePage = page => this.setState({ page })

  toggleDropdown = () => this.setState({ expanded: !this.state.expanded })
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

    if (!this.state.edit && page === CAMERA_ROLL_PAGE && pictures.length > 0) {
      return (
        <Text color="white" medium onPress={() => this.openEdit()}>
          {this.props.t('.next')}
        </Text>
      )
    }

    // TODO: Implement save
    return (
      edit && (
        <Text color="white" medium onPress={() => alert('Posted! Navigate to project.')}>
          {this.props.t('.post')}
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
          selected={this.state.project.name}
          onPress={this.toggleDropdown}
          active={this.state.expanded}
        />
      }
    />
  )

  renderEdit = () =>
    this.state.edit && (
      <Background source={this.state.picture}>
        <Overlay onPressIn={this.closeDropdown} activeOpacity={1}>
          <KeyboardAvoidingView behavior="position">
            <Edit>
              <Input
                autoFocus
                multiline
                selectionColor="white"
                placeholder={this.props.t('.placeholder')}
              />
            </Edit>
          </KeyboardAvoidingView>
        </Overlay>
      </Background>
    )

  render = () => (
    <Base>
      {this.renderEdit()}

      <SelectProject
        projects={data}
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

export default withLocalization(AddPost, 'AddPost')
