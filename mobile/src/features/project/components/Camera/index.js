import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
import { Base, Content, Bottom, TakePicture } from './styles'

export default class Camera extends PureComponent {
  state = {
    flashMode: RNCamera.Constants.FlashMode.off,
    type: RNCamera.Constants.Type.back,
  }

  changeFlashMode = () => {
    this.setState(prevState => ({
      flashMode:
        prevState.flashMode === RNCamera.Constants.FlashMode.on
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.on,
    }))
  }

  changeCameraType = () => {
    this.setState(prevState => ({
      type:
        prevState.type === RNCamera.Constants.Type.back
          ? RNCamera.Constants.Type.front
          : RNCamera.Constants.Type.back,
    }))
  }

  takePicture = async () => {}

  setRef = el => {
    this.camera = el
  }

  render() {
    return (
      <Base>
        <RNCamera ref={this.setRef} type={this.state.type} flashMode={this.state.flashMode} />
        <Content>
          <Bottom>
            <CameraType onPress={this.changeCameraType} />
            <TakePicture onPress={this.takePicture} hapticFeedback="impactLight" />
            <FlashMode onPress={this.changeFlashMode} flashMode={this.state.flashMode} />
          </Bottom>
        </Content>
      </Base>
    )
  }
}
