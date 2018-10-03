import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { RNCamera } from 'react-native-camera'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
import { TakePicture } from './styles'
import { changeFlashMode, changeCameraType, DEFAULT_CAMERA } from './utils'

export default class Camera extends PureComponent {
  static propTypes = {
    onTakePicture: PropTypes.func.isRequired,
  }

  state = {
    flashMode: DEFAULT_CAMERA.FLASH_MODE,
    type: DEFAULT_CAMERA.TYPE,
  }

  changeFlashMode = () => {
    this.setState(changeFlashMode)
  }

  changeCameraType = () => {
    this.setState(changeCameraType)
  }

  takePicture = async camera => {
    const data = await camera.takePictureAsync()
    this.props.onTakePicture(data)
  }

  render() {
    const { size } = this.props

    return (
      <RNCamera
        type={this.state.type}
        flashMode={this.state.flashMode}
        style={{ flex: 1, ...size }}
      >
        {({ camera }) => (
          <Fragment>
            <CameraType onPress={this.changeCameraType} />
            <TakePicture onPress={() => this.takePicture(camera)} hapticFeedback="impactLight" />
            <FlashMode onPress={this.changeFlashMode} flashMode={this.state.flashMode} />
          </Fragment>
        )}
      </RNCamera>
    )
  }
}
