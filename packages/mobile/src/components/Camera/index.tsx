import React, { useEffect, useState, useCallback, useRef, memo } from 'react'
import { TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import { isIphone } from 'utils/platform'
import AskForPermission from 'components/AskForPermission'
import FlashMode from 'components/FlashMode'
import CameraType from 'components/CameraType'
import AutoFocus from 'components/AutoFocus'
import { TakePicture, Wrapper } from './styles'

const { Constants } = RNCamera

const PERMISSION = isIphone ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA

function Camera({ onTakePicture, initialCameraType = Constants.Type.back }) {
  const camera = useRef()
  const [isLoading, setLoading] = useState(true)
  const [permission, setPermission] = useState(false)
  const [cameraType, setCameraType] = useState(initialCameraType)
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
      width: 1500,
      writeExif: false,
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
          pendingAuthorizationView={
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: -60 }}
            >
              <ActivityIndicator size="small" color="white" />
            </View>
          }
        />

        {autofocus && <AutoFocus coordinates={autofocus} />}
        <CameraType onPress={changeCameraType} />
        <Wrapper>
          <TakePicture onPress={takePicture} nativeHandler />
        </Wrapper>
        <FlashMode onPress={changeFlashMode} flashMode={flashMode} />
      </>
    </TouchableWithoutFeedback>
  )
}

export default memo(Camera)
