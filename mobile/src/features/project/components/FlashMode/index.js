import React from 'react'
import PropTypes from 'prop-types'
import { zap, zapOff } from 'images'
import { Button, Icon } from './styles'

const FlashMode = ({ flashMode, onPress }) => (
  <Button onPress={onPress} hapticFeedback="impactLight">
    <Icon source={flashMode ? zap : zapOff} />
  </Button>
)

FlashMode.propTypes = {
  flashMode: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default FlashMode
