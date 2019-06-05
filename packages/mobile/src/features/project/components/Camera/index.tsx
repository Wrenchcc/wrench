import React, { Fragment, useEffect, useState } from 'react'
import { TouchableWithoutFeedback, Platform } from 'react-native'
import { check, IOS_PERMISSIONS, ANDROID_PERMISSIONS, RESULTS } from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from '../AskForPermission'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
import AutoFocus from '../AutoFocus'
import { TakePicture } from './styles'

const { Constants } = RNCamera

const PERMISSION = Platform.OS === 'ios' ? IOS_PERMISSIONS.CAMERA : ANDROID_PERMISSIONS.CAMERA

function Camera({ onTakePicture }) {
  const [isLoading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)
  const [cameraType, setCameraType] = useState(Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Constants.FlashMode.off)
  const [autofocus, setAutofocus] = useState()
  const autoFocusPointOfInterest = null

  useEffect(() => {
    check(PERMISSION).then(response => {
      setLoading(false)
      setPermission(response)
    })
  }, [])

  const takePicture = async camera => {
    const data = await camera.takePictureAsync()

    onTakePicture(data)
  }

  const changeFlashMode = () => {
    const mode = flashMode === Constants.FlashMode.on ? Constants.FlashMode.off : Constants.FlashMode.on

    setFlashMode(mode)
  }

  const changeCameraType = () => {
    const type = cameraType === Constants.Type.back ? Constants.Type.front : Constants.Type.back

    setCameraType(type)
  }

  const setFocus = ({ nativeEvent }) => {
    setAutofocus({ x: nativeEvent.locationX, y: nativeEvent.locationY })
  }

  if (isLoading) return null

  if (permission !== RESULTS.GRANTED) {
    return (
      <AskForPermission
        permission={PERMISSION}
        onSuccess={() => setPermission(RESULTS.GRANTED)}
        type="camera"
      />
    )
  }

  return (
    <TouchableWithoutFeedback onPressIn={setFocus}>
      <RNCamera
        type={cameraType}
        flashMode={flashMode}
        style={{ flex: 1 }}
        autoFocusPointOfInterest={autoFocusPointOfInterest}
        orientation="portrait"
        ratio="1:1"
      >
        {({ camera }) => (
          <Fragment>
            {autofocus && <AutoFocus coordinates={autofocus} />}
            <CameraType onPress={changeCameraType} />
            <TakePicture onPress={() => takePicture(camera)} hapticFeedback="impactLight" />
            <FlashMode onPress={changeFlashMode} flashMode={flashMode} />
          </Fragment>
        )}
      </RNCamera>
    </TouchableWithoutFeedback>
  )
}

export default Camera
