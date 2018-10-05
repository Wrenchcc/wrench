import { RNCamera } from 'react-native-camera'

export const changeCameraType = prevState => ({
  type:
    prevState.type === RNCamera.Constants.Type.back
      ? RNCamera.Constants.Type.front
      : RNCamera.Constants.Type.back,
})

export const changeFlashMode = prevState => ({
  flashMode:
    prevState.flashMode === RNCamera.Constants.FlashMode.on
      ? RNCamera.Constants.FlashMode.off
      : RNCamera.Constants.FlashMode.on,
})

export const DEFAULT_CAMERA = {
  FLASH_MODE: RNCamera.Constants.FlashMode.off,
  TYPE: RNCamera.Constants.Type.back,
}
