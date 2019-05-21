import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { TouchableWithoutFeedback, Platform } from 'react-native'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
import PointOfInterest from '../PointOfInterest'
import { TakePicture } from './styles'
import { changeFlashMode, changeCameraType, DEFAULT_CAMERA } from './utils'

const PERMISSION = Platform.OS === 'ios' ? IOS_PERMISSIONS.CAMERA : ANDROID_PERMISSIONS.CAMERA

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
    check(PERMISSION).then(response => {
      this.setState({
        isLoading: false,
        cameraPermission: response,
      })
    })
  }

  permissionAuthorized = () => {
    this.setState({ cameraPermission: RESULTS.GRANTED })
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
    const { cameraPermission, isLoading, autoFocusPointOfInterest, flashMode, type } = this.state

    if (isLoading) return null

    if (cameraPermission !== RESULTS.GRANTED) {
      return (
        <AskForPermission
          permission={PERMISSION}
          onSuccess={this.permissionAuthorized}
          type="camera"
        />
      )
    }

    return (
      <TouchableWithoutFeedback onPressIn={this.setFocus}>
        <RNCamera
          type={type}
          flashMode={flashMode}
          style={{ flex: 1 }}
          autoFocusPointOfInterest={autoFocusPointOfInterest}
          orientation="portrait"
          ratio="1:1"
        >
          {({ camera }) => (
            <>
              <PointOfInterest coordinates={autoFocusPointOfInterest} />
              <CameraType onPress={this.changeCameraType} />
              <TakePicture onPress={() => this.takePicture(camera)} hapticFeedback="impactLight" />
              <FlashMode onPress={this.changeFlashMode} flashMode={flashMode} />
            </>
          )}
        </RNCamera>
      </TouchableWithoutFeedback>
    )
  }
}
