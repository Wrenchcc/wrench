import React, { useEffect, useState, useCallback, useRef, memo } from 'react'
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
  const camera = useRef()
  const [isLoading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)
  const [cameraType, setCameraType] = useState(Constants.Type.back)
  const [flashMode, setFlashMode] = useState(Constants.FlashMode.off)
  const [autofocus, setAutofocus] = useState()

  useEffect(() => {
    check(PERMISSION).then(response => {
      setLoading(false)
      setPermission(response)
    })
  }, [])

  const takePicture = useCallback(async () => {
    const data = await camera.current.takePictureAsync({
      orientation: 'portrait',
    })

    onTakePicture({ ...data, camera: true })
  }, [camera])

  const changeFlashMode = useCallback(() => {
    const mode =
      flashMode === Constants.FlashMode.on ? Constants.FlashMode.off : Constants.FlashMode.on

    setFlashMode(mode)
  }, [flashMode])

  const changeCameraType = useCallback(() => {
    const type = cameraType === Constants.Type.back ? Constants.Type.front : Constants.Type.back

    setCameraType(type)
    setAutofocus(null)
  }, [cameraType])

  const setFocus = useCallback(({ nativeEvent }) => {
    setAutofocus({ x: nativeEvent.locationX, y: nativeEvent.locationY })
  }, [])

  const handlePermission = useCallback(() => setPermission(RESULTS.GRANTED), [])

  if (isLoading) {
    return null
  }

  if (permission !== RESULTS.GRANTED) {
    return <AskForPermission permission={PERMISSION} onSuccess={handlePermission} type="camera" />
  }

  return (
    <TouchableWithoutFeedback onPressIn={setFocus}>
      <>
        <RNCamera
          ref={camera}
          type={cameraType}
          flashMode={flashMode}
          style={{ flex: 1 }}
          autoFocusPointOfInterest={autofocus}
          ratio="1:1"
        />

        {autofocus && <AutoFocus coordinates={autofocus} />}
        <CameraType onPress={changeCameraType} />
        <TakePicture onPress={takePicture} />
        <FlashMode onPress={changeFlashMode} flashMode={flashMode} />
      </>
    </TouchableWithoutFeedback>
  )
}

export default memo(Camera)
