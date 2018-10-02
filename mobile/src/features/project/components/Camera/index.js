import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { pathOr } from 'ramda'
import Permissions from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import CameraMode from '../CameraMode'
import { Base, Inner, Picture, Content, Bottom, TakePicture } from './styles'

const PERMISSION = 'camera'
const AUTHORIZED = 'authorized'

// TODO: Use built in cropping in camera
export default class Camera extends PureComponent {
  static propTypes = {
    capturedPicture: PropTypes.object,
    closeDropdown: PropTypes.func.isRequired,
    navigateToCameraRoll: PropTypes.func.isRequired,
    onTakePicture: PropTypes.func.isRequired,
    openEdit: PropTypes.func.isRequired,
  }

  state = {
    cameraPermission: false,
    flashMode: RNCamera.Constants.FlashMode.off,
    isLoading: true,
    type: RNCamera.Constants.Type.back,
  }

  componentDidMount() {
    Permissions.check(PERMISSION).then(res => {
      this.setState({ isLoading: false })
      if (res === AUTHORIZED) {
        this.enablePermission()
      }
    })
  }

  enablePermission = () => {
    this.setState({ cameraPermission: true })
  }

  changeFlashMode = () => {
    this.setState(prevState => ({
      flashMode:
        prevState.flashMode === RNCamera.Constants.FlashMode.on
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.on,
    }))

    this.props.closeDropdown()
  }

  changeCameraType = () => {
    this.setState(prevState => ({
      type:
        prevState.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    }))
  }

  takePicture = async () => {
    // this.props.openEdit()
    //
    // const file = await this.camera.takePictureAsync()
    // const result = await cropImage(file.uri)
    // this.props.onTakePicture(result)
  }

  setRef = el => {
    this.camera = el
  }

  renderCamera() {
    return (
      <Inner>
        <RNCamera
          ref={this.setRef}
          type={this.state.type}
          flashMode={this.state.flashMode}
          style={{ flex: 1 }}
        >
          <Picture source={{ uri: pathOr(undefined, ['uri'], this.props.capturedPicture) }} />
        </RNCamera>
        <Content>
          <Bottom>
            <CameraMode onPress={this.changeCameraType} />
            <TakePicture onPress={this.takePicture} hapticFeedback="impactLight" />
            <FlashMode onPress={this.changeFlashMode} flashMode={this.state.flashMode} />
          </Bottom>
        </Content>
      </Inner>
    )
  }

  render() {
    const { cameraPermission, isLoading, type } = this.state
    if (isLoading) return null

    let component

    if (!this.props.active) return null

    if (cameraPermission) {
      component = this.renderCamera()
    } else {
      component = <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
    }

    return <Base onPressIn={this.props.closeDropdown}>{component}</Base>
  }
}
