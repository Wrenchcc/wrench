import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { cameraType } from 'images'
import { Base, Button, Icon } from './styles'

const CameraType = ({ onPress }) => (
  <Base>
    <Button onPress={onPress} hapticFeedback="impactLight">
      <Icon>
        <Image source={cameraType} />
      </Icon>
    </Button>
  </Base>
)

CameraType.propTypes = {
  onPress: PropTypes.func.isRequired,
}

export default CameraType
