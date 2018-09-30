import React from 'react'
import PropTypes from 'prop-types'
import { Image } from 'react-native'
import { zap, zapOff } from 'images'
import { Base, Button, Icon } from './styles'

const FlashMode = ({ flashMode, onPress }) => (
  <Base>
    <Button onPress={onPress} hapticFeedback="impactLight">
      <Icon>
        <Image source={flashMode ? zap : zapOff} />
      </Icon>
    </Button>
  </Base>
)

FlashMode.propTypes = {
  flashMode: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default FlashMode
