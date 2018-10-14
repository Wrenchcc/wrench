import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback } from 'react-native'
import Permissions from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
import PointOfInterest from '../PointOfInterest'
import { TakePicture } from './styles'
import { changeFlashMode, changeCameraType, DEFAULT_CAMERA } from './utils'

const CAMERA_PERMISSION = 'camera'
const AUTHORIZED = 'authorized'

export default class Camera extends PureComponent {
  static propTypes = {
    onTakePicture: PropTypes.func.isRequired,
  }

  state = {
    cameraPermission: false,
    flashMode: DEFAULT_CAMERA.FLASH_MODE,
    isLoading: true,
    type: DEFAULT_CAMERA.TYPE,
  }

  constructor(props) {
    super(props)
    this.checkCameraPermission()
  }

  checkCameraPermission = () => {
    Permissions.check(CAMERA_PERMISSION).then(response => {
      this.setState({
        isLoading: false,
        cameraPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ cameraPermission: AUTHORIZED })
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

  setFocus = ({ nativeEvent }) => {
    this.setState({
      autoFocusPointOfInterest: { x: nativeEvent.locationX, y: nativeEvent.locationY },
    })
  }

  render() {
    const { cameraPermission, isLoading, autoFocusPointOfInterest } = this.state

    if (isLoading) return null

    if (cameraPermission !== AUTHORIZED) {
      return (
        <AskForPermission permission={CAMERA_PERMISSION} onSuccess={this.permissionAuthorized} />
      )
    }

    return (
      <TouchableWithoutFeedback onPressIn={this.setFocus}>
        <RNCamera
          type={this.state.type}
          flashMode={this.state.flashMode}
          style={{ flex: 1 }}
          autoFocusPointOfInterest={autoFocusPointOfInterest}
          forceUpOrientation
        >
          {({ camera }) => (
            <Fragment>
              <PointOfInterest coordinates={autoFocusPointOfInterest} />
              <CameraType onPress={this.changeCameraType} />
              <TakePicture onPress={() => this.takePicture(camera)} hapticFeedback="impactLight" />
              <FlashMode onPress={this.changeFlashMode} flashMode={this.state.flashMode} />
            </Fragment>
          )}
        </RNCamera>
      </TouchableWithoutFeedback>
    )
  }
}
