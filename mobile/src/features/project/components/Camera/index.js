import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Permissions from 'react-native-permissions'
import { RNCamera } from 'react-native-camera'
import AskForPermission from 'features/project/components/AskForPermission'
import FlashMode from '../FlashMode'
import CameraType from '../CameraType'
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

  render() {
    const { cameraPermission, isLoading } = this.state

    if (isLoading) return null

    if (cameraPermission !== AUTHORIZED) {
      return (
        <AskForPermission permission={CAMERA_PERMISSION} onSuccess={this.permissionAuthorized} />
      )
    }
    return (
      <RNCamera type={this.state.type} flashMode={this.state.flashMode} style={{ flex: 1 }}>
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
