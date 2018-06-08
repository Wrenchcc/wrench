import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import withLocalization from 'i18n/withLocalization'
import FlashMode from '../FlashMode'
import PreviewRoll from '../PreviewRoll'
import { Base, Content, Bottom, TakePicture } from './styles'

class Camera extends Component {
  static propTypes = {
    navigateToCameraRoll: PropTypes.func.isRequired,
    closeDropdown: PropTypes.func.isRequired,
    onTakePicture: PropTypes.func.isRequired,
  }

  state = {
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.off,
  }

  toggleFlashMode = () => {
    const flashMode =
      this.state.flashMode === RNCamera.Constants.FlashMode.on
        ? RNCamera.Constants.FlashMode.off
        : RNCamera.Constants.FlashMode.on
    this.setState({ flashMode })
    this.props.closeDropdown()
  }

  takePicture = async () => {
    const data = await this.camera.takePictureAsync()
    this.props.onTakePicture(data)
  }

  render = () => (
    <Base onPressIn={this.props.closeDropdown}>
      <RNCamera
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref
        }}
        type={this.state.type}
        flashMode={this.state.flashMode}
        permissionDialogTitle={this.props.t('.permissionDialogTitle')}
        permissionDialogMessage={this.props.t('.permissionDialogMessage')}
      >
        <Content>
          <Bottom>
            <PreviewRoll onPress={this.props.navigateToCameraRoll} />
            <TakePicture onPress={this.takePicture} hapticFeedback="impactLight" />
            <FlashMode onPress={this.toggleFlashMode} flashMode={this.state.flashMode} />
          </Bottom>
        </Content>
      </RNCamera>
    </Base>
  )
}

export default withLocalization(Camera, 'Camera')
