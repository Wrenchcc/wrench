import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { cameraMode } from 'images'
import { Base, Button, Icon } from './styles'

const CameraMode = ({ onPress }) => (
  <Base>
    <Button onPress={onPress} hapticFeedback="impactLight">
      <Icon>
        <Image source={cameraMode} />
      </Icon>
    </Button>
  </Base>
)

CameraMode.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default CameraMode
