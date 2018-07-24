import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Permissions from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import PreviewRoll from '../PreviewRoll'
import { Base, Content, Bottom, TakePicture } from './styles'

const PERMISSION = 'camera'
const AUTHORIZED = 'authorized'

export default class Camera extends Component {
  static propTypes = {
    navigateToCameraRoll: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    onTakePicture: PropTypes.func.isRequired,
  }

  state = {
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
    cameraPermission: false,
  }

  componentDidMount() {
    Permissions.check(PERMISSION).then(res => {
      if (res === AUTHORIZED) {
        this.enablePermission()
      }
    })
  }

  enablePermission = () => this.setState({ cameraPermission: true })

  toggleFlashMode = () => {
    const flashMode = this.state.flashMode === RNCamera.Constants.FlashMode.on
      ? RNCamera.Constants.FlashMode.off
      : RNCamera.Constants.FlashMode.on
    this.setState({ flashMode })
    this.props.closeDropdown()
  }

  takePicture = async () => {
    const data = await this.camera.takePictureAsync()
    this.props.onTakePicture(data)
  }

  renderContent = () => (
    <Content>
      <Bottom>
        <PreviewRoll onPress={this.props.navigateToCameraRoll} />
        <TakePicture onPress={this.takePicture} hapticFeedback="impactLight" />
        <FlashMode onPress={this.toggleFlashMode} flashMode={this.state.flashMode} />
      </Bottom>
    </Content>
  )

  renderCamera = () => (
    <RNCamera
      style={{ flex: 1 }}
      ref={ref => {
        this.camera = ref
      }}
      type={this.state.type}
      flashMode={this.state.flashMode}
    >
      {this.renderContent()}
    </RNCamera>
  )

  render = () => (
    <Base onPressIn={this.props.closeDropdown}>
      {this.state.cameraPermission ? (
        this.renderCamera()
      ) : (
        <AskForPermission permission={PERMISSION} onSuccess={this.enablePermission} />
      )}
    </Base>
  )
}
