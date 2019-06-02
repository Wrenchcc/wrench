import React, { Fragment, useEffect } from 'react'
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

function Camera() {
  useEffect(() => {
    check(PERMISSION).then(response => {
      this.setState({
        isLoading: false,
        cameraPermission: response,
      })
    })
  }, [])

  if (isLoading) return null

  if (cameraPermission !== RESULTS.GRANTED) {
    return (
      <AskForPermission permission={PERMISSION} onSuccess={permissionAuthorized} type="camera" />
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
          <Fragment>
            <PointOfInterest coordinates={autoFocusPointOfInterest} />
            <CameraType onPress={this.changeCameraType} />
            <TakePicture onPress={() => this.takePicture(camera)} hapticFeedback="impactLight" />
            <FlashMode onPress={this.changeFlashMode} flashMode={flashMode} />
          </Fragment>
        )}
      </RNCamera>
    </TouchableWithoutFeedback>
  )
}

export default Camera

// export default class Camera extends PureComponent {
//
//
//   state = {
//     cameraPermission: false,
//     flashMode: DEFAULT_CAMERA.FLASH_MODE,
//     isLoading: true,
//     type: DEFAULT_CAMERA.TYPE,
//   }
//
//
//
//
//   permissionAuthorized = () => {
//     this.setState({ cameraPermission: RESULTS.GRANTED })
//   }
//
//   changeFlashMode = () => {
//     this.setState(changeFlashMode)
//   }
//
//   changeCameraType = () => {
//     this.setState(changeCameraType)
//   }
//
//   takePicture = async camera => {
//     const data = await camera.takePictureAsync()
//
//     this.props.onTakePicture(data)
//   }
//
//   setFocus = ({ nativeEvent }) => {
//     this.setState({
//       autoFocusPointOfInterest: { x: nativeEvent.locationX, y: nativeEvent.locationY },
//     })
//   }
//
//   render() {
//     const { cameraPermission, isLoading, autoFocusPointOfInterest, flashMode, type } = this.state
//
//
//
//
//     return (
//
//     )
//   }
// }
