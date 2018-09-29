import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Permissions from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import PreviewRoll from '../PreviewRoll'
import { Base, Content, Bottom, TakePicture } from './styles'

const PERMISSION = 'camera'
const AUTHORIZED = 'authorized'

// https://github.com/react-native-community/react-native-camera/pull/1636
// https://github.com/react-native-community/react-native-camera/issues/648
export default class Camera extends PureComponent {
  static propTypes = {
    navigateToCameraRoll: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    addFiles: PropTypes.func.isRequired,
    openEdit: PropTypes.func.isRequired,
  }

  state = {
    isLoading: true,
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
    cameraPermission: false,
  }

  componentDidMount() {
    Permissions.check(PERMISSION).then(res => {
      this.setState({ isLoading: false })
      if (res === AUTHORIZED) {
        this.enablePermission()
      }
    })
  }

  enablePermission = () => this.setState({ cameraPermission: true })

  toggleFlashMode = () => {
    this.setState(prevState => ({
      flashMode:
        prevState.flashMode === RNCamera.Constants.FlashMode.on
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.on,
    }))

    this.props.closeDropdown()
  }

  takePicture = async () => {
    this.props.openEdit()

    const data = await this.camera.takePictureAsync()
    // Crop and add
    const file = null
    this.props.addFiles(file)
  }

  setRef = el => {
    this.camera = el
  }

  renderContent() {
    return (
      <Content>
        <Bottom>
          <PreviewRoll onPress={this.props.navigateToCameraRoll} />
          <TakePicture onPress={this.takePicture} hapticFeedback="impactLight" />
          <FlashMode onPress={this.toggleFlashMode} flashMode={this.state.flashMode} />
        </Bottom>
      </Content>
    )
  }

  renderCamera() {
    return (
      <RNCamera
        style={{ flex: 1 }}
        ref={this.setRef}
        type={this.state.type}
        flashMode={this.state.flashMode}
      >
        {this.renderContent()}
      </RNCamera>
    )
  }

  render() {
    const { cameraPermission, isLoading } = this.state
    if (isLoading) return null
    let component

    if (cameraPermission) {
      component = this.renderCamera()
    } else {
      component = <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
    }

    return <Base onPressIn={this.props.closeDropdown}>{component}</Base>
  }
}
